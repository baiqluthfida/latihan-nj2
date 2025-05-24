import { db } from "/public/lib/db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { nip } = req.query;
      if (nip) {
        const [rows] = await db.query("SELECT * FROM guru WHERE nip = ?", [
          nip,
        ]);
        return res.status(200).json(rows[0] || {});
      }
      // Jika tanpa query, return semua
      const [all] = await db.query("SELECT * FROM guru");
      return res.status(200).json(all);

    case "POST":
      try {
        const { nip, nama, alamat, pendidikan, pengampu, password } = req.body;

        const id = Math.floor(Math.random() * 1000);

        console.log("Received data:", req.body);

        const query = `
          INSERT INTO guru (id, nip, nama, alamat, pendidikan, pengampu, password)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [id, nip, nama, alamat, pendidikan, pengampu, password];

        const result = await db.query(query, values);

        console.log("Insert result:", result);

        return res.status(200).json({ message: "Berhasil menambahkan guru" });
      } catch (error) {
        console.error("Error saat insert guru:", error);
        return res
          .status(500)
          .json({ message: "Gagal menambahkan guru", error: error.message });
      }

    case "PUT":
      try {
        const { nip, nama, alamat, pendidikan, pengampu, password } = req.body;

        const [result] = await db.query(
          `UPDATE guru SET nama = ?, alamat = ?, pendidikan = ?, pengampu = ?, password = ? WHERE nip = ?`,
          [nama, alamat, pendidikan, pengampu, password, nip]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Data guru tidak ditemukan" });
        }

        return res.status(200).json({ message: "Berhasil update guru" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Gagal update guru", error: error.message });
      }

    case "DELETE":
      try {
        const { nip } = req.query;

        if (!nip) {
          return res.status(400).json({ message: "NIP guru harus diberikan" });
        }

        const [result] = await db.query("DELETE FROM guru WHERE nip = ?", [
          nip,
        ]);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Data guru tidak ditemukan" });
        }

        return res.status(200).json({ message: "Berhasil hapus guru" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Gagal hapus guru", error: error.message });
      }
    default:
      return res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
