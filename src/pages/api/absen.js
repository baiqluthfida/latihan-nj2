import { db } from "/public/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nip, password } = req.body;

    try {
      const [rows] = await db.query("SELECT * FROM guru WHERE nip = ?", [nip]);

      if (rows.length === 0) {
        return res.status(401).json({ message: "NIP tidak ditemukan" });
      }

      const guru = rows[0];

      if (guru.password !== password) {
        return res.status(401).json({ message: "Password salah" });
      }

      // Login berhasil: simpan data guru ke response
      res.status(200).json({ message: "Login berhasil", data: guru });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
