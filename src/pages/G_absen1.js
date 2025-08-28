import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Toaster, toast } from "sonner";

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
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          className: "text-lg font-semibold",
          style: {
            padding: "1.5rem",
            borderRadius: "1rem",
            fontSize: "1.25rem", // sedikit lebih besar
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)", // bayangan halus
            backgroundColor: "#fff", // latar putih biar lebih bersih
            color: "#333", // teks lebih formal
          },
        }}
      />

      <nav className="flex items-center bg-white pl-6 py-3">
        <img className="h-15 w-16 p" src="/logoYayasan.png" alt="" />
        <h1 className="text-2xl font-bold text-[#000000] pl-5">
          YAYASAN <br />
          RIADHUL ULUM
        </h1>
      </nav>

      <div className="flex h-screen">
        <div className="w-1/4 h-full bg-[#1F581A] pt-10">
          <Link
            href="/G_bio"
            className="w-full  text-[15px] font-bold flex items-center gap-1 text-white py-2 px-4 pr-4"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-user text-[25px] pr-5" />
              Guru
            </span>
          </Link>

          {/* Link Absen */}
          <Link
            href="/G_absen1"
            className="text-[15px] bg-[#85a482] font-bold flex items-center gap-1 text-white py-2 mt-7 pl-4"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-calendar-days text-[25px] pr-5" />
              Absen
            </span>
          </Link>

          {/* Link Logout */}
          <button
            onClick={() => {
              toast.success("Anda keluar dari sistem absen");
              localStorage.removeItem("guru");

              // Delay 1.5 detik agar toast sempat tampil sebelum redirect
              setTimeout(() => {
                router.push("/");
              }, 1500);
            }}
            className="text-[15px] font-bold flex items-center gap-1 text-white py-2 mt-7 pl-4"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-right-from-bracket text-[25px] pr-5" />
              Log Out
            </span>
          </button>
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
