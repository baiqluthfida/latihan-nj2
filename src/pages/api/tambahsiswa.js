import { db } from "/src/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nis, nama, kelas } = req.body;

    console.log("Received data:", req.body);

    try {
      const query = `
        INSERT INTO siswa ( nis, nama, kelas)
        VALUES (?, ?, ?)
      `;
      const values = [nis, nama, kelas];

      const result = await db.query(query, values);

      console.log("Insert result:", result);

      res.status(200).json({ message: "Berhasil menambahkan siswa" });
    } catch (error) {
      console.error("Error saat insert siswa:", error);
      res
        .status(500)
        .json({ message: "Gagal menambahkan siswa", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
