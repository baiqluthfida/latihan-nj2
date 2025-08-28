import { db } from "/src/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { tanggal_awal, tanggal_akhir, guru_id, kelas } = req.query;

  // Validasi parameter wajib
  if (!tanggal_awal || !tanggal_akhir || !guru_id) {
    return res.status(400).json({ message: "Parameter tidak lengkap" });
  }

  // Buat query dan params secara dinamis
  let query = `
    SELECT 
      s.nama, 
      s.kelas, 
      g.pengampu AS mapel,
      SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) AS hadir,
      SUM(CASE WHEN a.status = 'alpa' THEN 1 ELSE 0 END) AS alpa,
      SUM(CASE WHEN a.status = 'sakit' THEN 1 ELSE 0 END) AS sakit,
      SUM(CASE WHEN a.status = 'izin' THEN 1 ELSE 0 END) AS izin
    FROM absensi a
    JOIN siswa s ON a.id_siswa = s.id
    JOIN guru g ON a.id_guru = g.id
    WHERE a.tanggal BETWEEN ? AND ?
      AND g.id = ?
  `;

  const params = [tanggal_awal, tanggal_akhir, guru_id];

  // Tambah filter kelas jika tersedia
  if (kelas) {
    query += ` AND s.kelas = ?`;
    params.push(kelas);
  }

  query += `
    GROUP BY s.id, s.nama, s.kelas, g.pengampu
    ORDER BY s.nama ASC
  `;

  try {
    const [rows] = await db.query(query, params);
    res.status(200).json({ data: rows }); // Bungkus sebagai { data: [...] }
  } catch (error) {
    console.error("Error rekap:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data" });
  }
}
