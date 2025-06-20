import { db } from "/public/lib/db"; // pastikan path ke database sudah sesuai

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { absensi } = req.body;

    try {
      for (const data of absensi) {
        await db.query(
          `INSERT INTO absensi (id_siswa, tanggal, keterangan, status, deskripsi, id_guru)
          VALUES (?, ?, ?, ?, ?, ?)`,
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
      console.error("Gagal simpan absensi:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menyimpan absensi" });
    }
  }

  if (req.method === "GET") {
    const { id_guru, tanggal, siswa_kelas } = req.query;

    // Jika ingin filter berdasarkan guru, tanggal, dan kelas
    if (id_guru && tanggal && siswa_kelas) {
      try {
        const [rows] = await db.query(
          `
          SELECT 
            a.id, a.tanggal, a.status, a.keterangan, a.deskripsi,
            a.id_siswa, a.id_guru,
            s.nama AS nama_siswa, s.kelas
          FROM absensi a
          JOIN siswa s ON a.id_siswa = s.id
          WHERE a.id_guru = ? AND a.tanggal = ? AND s.kelas = ?
          ORDER BY s.nama ASC
        `,
          [id_guru, tanggal, siswa_kelas]
        );

        return res.status(200).json(rows);
      } catch (error) {
        console.error("Gagal ambil absensi filter:", error);
        return res
          .status(500)
          .json({ message: "Gagal mengambil absensi dengan filter" });
      }
    }

    // Default GET: semua absensi
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
      console.error("Gagal ambil semua absensi:", error);
      return res.status(500).json({ message: "Gagal mengambil data absensi" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
