import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function G_bio() {
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

  if (!guru) return <p>Loading...</p>;

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

        <div className="w-3/4 h-full bg-[#EEEFF3] p-8">
          <h1 className=" text-[#35732F] font-bold text-[50px]">
            Biodata Guru
          </h1>
          <div className="flex pt-10 ">
            <div className="pr-20">
              <img className="w-[200px] h-[250px]" src="/robi.jpg" alt="" />
            </div>
            <div>
              <h1 className=" text-[#35732f] text-[20px] pb-2">Nama Lengkap</h1>
              <div className="w-[600px] bg-[#D9D9D9] text-[15px] text-[#4b4a4a] p-2">
                {guru.nama}
              </div>

              <h1 className=" text-[#35732f] text-[20px] pb-2 pt-5">NUPTK</h1>
              <div className="w-[600px] bg-[#D9D9D9] text-[15px] text-[#4b4a4a] p-2">
                {guru.nip}
              </div>

              <h1 className=" text-[#35732f] text-[20px] pb-2 pt-5">Alamat</h1>
              <div className="w-[600px] bg-[#D9D9D9] text-[15px] text-[#4b4a4a] p-2">
                {guru.alamat}
              </div>

              <h1 className=" text-[#35732f] text-[20px] pb-2 pt-5">
                Pendidikan Terakhir
              </h1>
              <div className="w-[600px] bg-[#D9D9D9] text-[15px] text-[#4b4a4a] p-2">
                {guru.pendidikan}
              </div>

              <h1 className=" text-[#35732f] text-[20px] pb-2 pt-5">
                Guru Pengampu
              </h1>
              <div className="w-[600px] bg-[#D9D9D9] text-[15px] text-[#4b4a4a] p-2">
                {guru.pengampu}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
