import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const [guru, setGuru] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedGuru = localStorage.getItem("guru");
    if (storedGuru) {
      setGuru(JSON.parse(storedGuru));
    } else {
      router.push("/");
    }
  }, []);

  if (!guru) return null; // loading state

  const mataPelajaran = guru.pengampu;

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
            href="G_bio"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff]"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-user text-[25px] pr-5" />
              Guru
            </span>
          </Link>

          <Link
            href="G_absen1"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-calendar-days text-[25px] pr-5" />
              Absen
            </span>
          </Link>
          <Link
            href="/"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-right-from-bracket text-[25px] pr-5" />
              Log Out
            </span>
          </Link>
        </div>

        <div className="w-3/4 h-full bg-[#EEEFF3] ">
          <div className="bg-[#D9D9D9] items-center p-4">
            <h1 className=" text-[#35732F] font-bold text-[50px] ">
              Absensi Siswa
            </h1>
          </div>

          <div className="pt-10 px-10 space-y-4">
            <Link
              href="G_absen7"
              className="block text-lg font-bold text-white bg-[#1F581A] px-4 py-2 rounded"
            >
              {mataPelajaran} Kelas 7
            </Link>
            <Link
              href="G_absen8"
              className="block text-lg font-bold text-white bg-[#1F581A] px-4 py-2 rounded"
            >
              {mataPelajaran} Kelas 8
            </Link>
            <Link
              href="G_absen9"
              className="block text-lg font-bold text-white bg-[#1F581A] px-4 py-2 rounded"
            >
              {mataPelajaran} Kelas 9
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
