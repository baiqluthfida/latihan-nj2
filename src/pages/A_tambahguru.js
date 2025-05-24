import Link from "next/link";
import React, { useState } from "react";

export default function TambahGuru() {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [pengampu, setPengampu] = useState("");
  const [password, setPassword] = useState("");

  const handleSimpan = async () => {
    const res = await fetch("/api/guru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nip,
        nama,
        alamat,
        pendidikan,
        pengampu,
        password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Data guru berhasil ditambahkan!");
    } else {
      alert("Gagal menambahkan guru: " + data.message);
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
          <h1 className=" text-[#35732F] font-bold text-[50px] pb-6">
            Tambahkan Guru
          </h1>

          <div className="bg-[#D9D9D9] items-center ">
            <div className="bg-[#1F581A] text-[#ffffff] text-[20px] items-center py-2 px-7 ">
              <h1>Input Data Guru</h1>
            </div>

            <div className="flex gap-50 pt-5 pl-10 pb-15">
              <div>
                <h1 className="text-[#1F581A] pl-7 pt-5">NIP</h1>
                <div className="pl-7 pt-2 ">
                  <input
                    type="text"
                    onChange={(e) => setNip(e.target.value)}
                    className="w-[300px] h-[30px] bg-[#ffffff] pl-3 text-[15px] text-[#4b4a4a] radius-[16px] rounded-md"
                  />
                </div>
                <h1 className="text-[#1F581A] pl-7 pt-5">Nama</h1>
                <div className=" pl-7 pt-2 ">
                  <input
                    type="text"
                    onChange={(e) => setNama(e.target.value)}
                    className="w-[300px] h-[30px] bg-[#ffffff] pl-3 text-[15px] text-[#4b4a4a] radius-[16px] rounded-md"
                  />
                </div>
                <h1 className="text-[#1F581A] pl-7 pt-5">Alamat</h1>
                <div className=" pl-7 pt-2 ">
                  <input
                    type="text"
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-[300px] h-[30px] bg-[#ffffff] pl-3 text-[15px] text-[#4b4a4a] radius-[16px] rounded-md"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-[#1F581A] pl-7 pt-5">
                  Pendidikan Terakhir
                </h1>
                <div className=" pl-7 pt-2 ">
                  <input
                    type="text"
                    onChange={(e) => setPendidikan(e.target.value)}
                    className="w-[300px] h-[30px] bg-[#ffffff] text-[15px] pl-3 text-[#4b4a4a] radius-[16px] rounded-md"
                  />
                </div>
                <h1 className="text-[#1F581A] pl-7 pt-5">Pengampu</h1>
                <div className=" pl-7 pt-2 ">
                  <input
                    type="text"
                    onChange={(e) => setPengampu(e.target.value)}
                    className="w-[300px] h-[30px] bg-[#ffffff] text-[15px] pl-3 text-[#4b4a4a] radius-[16px] rounded-md"
                  />
                </div>
                <h1 className="text-[#1F581A] pl-7 pt-5">Password</h1>
                <div className=" pl-7 pt-2 ">
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[300px] h-[30px] bg-[#ffffff] text-[15px] pl-3 text-[#4b4a4a] radius-[16px] rounded-md"
                  />
                </div>
                <div className="pt-8 pl-60">
                  <button
                    className=" bg-[#1F581A] py-2 px-4 rounded-md"
                    onClick={handleSimpan}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
