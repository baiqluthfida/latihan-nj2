"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function EditSiswa() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");

  // Ambil NIS dari query string (?nis=1234)
  useEffect(() => {
    const getData = async () => {
      const nisParam = searchParams.get("nis");
      if (!nisParam) return;

      setNis(nisParam);

      const res = await fetch("/api/siswa");
      const data = await res.json();
      const siswa = data.find((s) => String(s.nis) === String(nisParam));

      if (siswa) {
        setNama(siswa.nama);
        setKelas(siswa.kelas);
      }
    };

    getData();
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/siswa", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nis, nama, kelas }),
    });

    const result = await res.json();
    console.log("Status:", res.status);
    console.log("Result:", result);

    if (res.ok) {
      alert("Data berhasil diupdate!");
      router.push("/A_siswa");
    } else {
      alert("Gagal update: " + result.message);
    }
  };

  return (
    <div>
      <nav className="flex items-center bg-white pl-6 py-3">
        <img className="h-15 w-16 p" src="/logoYayasan.png" alt="" />
        <h1 className="text-2xl font-bold text-[#000000] pl-5">
          YAYASAN <br />
          RIADHUL ULUM
        </h1>
      </nav>

      <div className="flex h-screen">
        <div className="w-1/4 h-full bg-[#1F581A] p-8">
          <Link
            href="A_beranda"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff]"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i class="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Beranda</h1>
            </span>
          </Link>

          <Link
            href="A_guru"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i class="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Data Guru</h1>
            </span>
          </Link>

          <Link
            href="A_siswa"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i class="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Data Siswa</h1>
            </span>
          </Link>

          <Link
            href="A_absen"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i class="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Absensi</h1>
            </span>
          </Link>
          <Link
            href="/"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-90"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i class="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Log Out</h1>
            </span>
          </Link>
        </div>

        <div className="w-3/4 h-full bg-[#EEEFF3] p-8">
          <h1 className=" text-[#35732F] font-bold text-[50px]"> Edit siswa</h1>

          <div className="max-w-md mx-auto mt-7 p-4 border rounded">
            <h1 className="text-xl font-bold mb-4">Edit Data Siswa</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
                <label className="block text-[#35732F]font-bold">NIS</label>
                <input
                  type="text"
                  value={nis}
                  disabled
                  className="w-full border px-2 py-1 bg-[#ffffff]"
                />
              </div>
              <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
                <label className="block text-[#35732F]font-bold">Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full border px-2 py-1 bg-[#ffffff]"
                />
              </div>
              <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
                <label className="block text-[#35732F]font-bold">Kelas</label>
                <input
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full border px-2 py-1 bg-[#ffffff]"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded "
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
