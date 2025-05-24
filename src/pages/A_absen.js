import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment-timezone";

export default function AbsensiPage() {
  const [dataAbsensi, setDataAbsensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tanggalUTC = "2025-05-24T07:00:00.000Z";
  const waktuWITA = moment
    .utc(tanggalUTC)
    .tz("Asia/Makassar")
    .format("DD MMMM YYYY HH:mm:ss");

  useEffect(() => {
    fetch("/api/absensi")
      .then((res) => res.json())
      .then((data) => {
        setDataAbsensi(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal memuat data absensi");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <nav className="flex items-center bg-white pl-6 py-3">
        <img className="h-15 w-16 p" src="/logoYayasan.png" alt="Logo" />
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
              <i className="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Beranda</h1>
            </span>
          </Link>
          <Link
            href="A_guru"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Data Guru</h1>
            </span>
          </Link>
          <Link
            href="A_siswa"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Data Siswa</h1>
            </span>
          </Link>
          <Link
            href="A_absen"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Absensi</h1>
            </span>
          </Link>
          <Link
            href="/"
            className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-90"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-chevron-right"></i>
              <h1 className="pl-4">Log Out</h1>
            </span>
          </Link>
        </div>

        <div className="w-3/4 h-full bg-[#EEEFF3] p-8 overflow-auto">
          <h1 className="text-[#35732F] font-bold text-[50px] mb-6">Absensi</h1>

          {loading ? (
            <p className="text-center text-[#35732F]">Memuat data...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-[#1F581A] text-white">
                <tr>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Nama Siswa</th>
                  <th className="px-4 py-2">Kelas</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Keterangan</th>
                  <th className="px-4 py-2">Deskripsi</th>
                </tr>
              </thead>
              <tbody className="text-[#000000]">
                {dataAbsensi.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border border-gray-300"
                  >
                    <td className="px-4 py-2">
                      {moment
                        .utc(item.tanggal)
                        .tz("Asia/Makassar")
                        .format("DD MMMM YYYY HH:mm:ss")}
                    </td>
                    <td className="px-4 py-2">{item.nama_siswa}</td>
                    <td className="px-4 py-2">{item.kelas}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">{item.keterangan}</td>
                    <td className="px-4 py-2">{item.deskripsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
