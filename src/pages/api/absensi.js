import { db } from "/public/lib/db"; // sesuaikan path koneksi db

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { absensi } = req.body;

    try {
      for (const data of absensi) {
        await db.query(
          `INSERT INTO absensi (id_siswa, tanggal, keterangan, status, deskripsi, id_guru) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            data.id_siswa,
            data.tanggal,
            data.keterangan,
            data.status,
            data.deskripsi,
            data.id_guru,
          ]
        );
      }
      return res.status(200).json({ message: "Absensi berhasil disimpan" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menyimpan" });
    }
  }

  if (req.method === "GET") {
    try {
      const [rows] = await db.query(`
        SELECT 
          a.id, a.tanggal, a.status, a.keterangan, a.deskripsi,
          s.nama AS nama_siswa, s.kelas
        FROM absensi a
        JOIN siswa s ON a.id_siswa = s.id
        ORDER BY a.tanggal DESC
      `);
      return res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetch absensi:", error);
      return res.status(500).json({ message: "Gagal mengambil data absensi" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
