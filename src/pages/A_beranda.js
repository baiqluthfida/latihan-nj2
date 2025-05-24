import React from "react";
import Link from "next/link";

export default function Home() {
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
          <h1 className=" text-[#35732F] font-bold text-[50px]">Beranda</h1>

          <div className="flex justify-center gap-20">
            <Link
              href="A_guru"
              className="text-[15px] font-bold flex items-center gap-1 text-[#1F581A] pt-15 "
            >
              <div className="text-[25px] font-bold flex items-center bg-[#B8C8A0] w-[200px] h-[120px] rounded-lg justify-center">
                <i class="fa-solid fa-rectangle-list"></i>
                <h1 className="pl-4">Data Guru</h1>
              </div>
            </Link>

            <Link
              href="A_siswa"
              className="text-[15px] font-bold flex items-center gap-1 text-[#1F581A] pt-15 "
            >
              <div className="text-[25px] font-bold flex items-center bg-[#B8C8A0] w-[200px] h-[120px] rounded-lg justify-center">
                <i class="fa-solid fa-rectangle-list"></i>
                <h1 className="pl-4">Data Siswa</h1>
              </div>
            </Link>

            <Link
              href="A_absen"
              className="text-[15px] font-bold flex items-center gap-1 text-[#1F581A] pt-15 "
            >
              <div className="text-[25px] font-bold flex items-center bg-[#B8C8A0] w-[200px] h-[120px] rounded-lg justify-center">
                <i class="fa-solid fa-clipboard-list"></i>
                <h1 className="pl-4">Absensi</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
