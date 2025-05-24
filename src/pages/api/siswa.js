import { db } from "/public/lib/db"; // pastikan path benar

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { kelas } = req.query; // Ambil query param "kelas" dari URL
        let query = "SELECT * FROM siswa";
        let params = [];

        if (kelas) {
          query += " WHERE kelas = ?";
          params.push(kelas);
        }

        const [rows] = await db.query(query, params);
        return res.status(200).json(rows);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Gagal ambil data", error: error.message });
      }

    case "POST":
      try {
        const { nis, nama, kelas } = req.body;
        const query = `INSERT INTO siswa (nis, nama, kelas) VALUES (?, ?, ?)`;
        await db.query(query, [nis, nama, kelas]);
        return res.status(200).json({ message: "Berhasil menambahkan siswa" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Gagal menambahkan siswa", error: error.message });
      }

    case "PUT":
      try {
        const { nis, nama, kelas } = req.body;
        if (!nis || !nama || !kelas) {
          return res
            .status(400)
            .json({ message: "NIS, nama, dan kelas harus diisi" });
        }
        const [result] = await db.query(
          "UPDATE siswa SET nama = ?, kelas = ? WHERE nis = ?",
          [nama, kelas, nis]
        );
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Data siswa tidak ditemukan" });
        }
        return res.status(200).json({ message: "Berhasil update siswa" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Gagal update data", error: error.message });
      }

    case "DELETE":
      try {
        const { nis } = req.query;
        if (!nis)
          return res.status(400).json({ message: "NIS harus diberikan" });
        const [result] = await db.query("DELETE FROM siswa WHERE nis = ?", [
          nis,
        ]);
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Data siswa tidak ditemukan" });
        }
        return res.status(200).json({ message: "Berhasil hapus siswa" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Gagal hapus data", error: error.message });
      }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
