"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function DataSiswa() {
  const [siswa, setSiswa] = useState([]);

  useEffect(() => {
    fetch("/api/siswa")
      .then((res) => res.json())
      .then((data) => setSiswa(data))
      .catch((err) => console.error("Gagal ambil data", err));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSiswa = siswa.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(siswa.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = async (nis) => {
    if (confirm("Yakin mau hapus data ini?")) {
      try {
        const res = await fetch(`/api/siswa?nis=${nis}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setSiswa((prev) => prev.filter((item) => item.nis !== nis));
          alert("Data siswa berhasil dihapus."); // alert berhasil
        } else {
          console.error("Gagal hapus data");
          alert("Gagal hapus data siswa."); // alert gagal
        }
      } catch (error) {
        console.error("Error hapus:", error);
      }
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
          <div className="flex justify-between">
            <h1 className=" text-[#35732F] font-bold text-[50px] pb-7">
              Data Siswa
            </h1>
            <Link
              href="/A_tambahsiswa"
              className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] bg-[#35732F] h-12 w-55 pl-4 "
            >
              <span className="text-[25px] font-bold flex items-center">
                <h1 className=""> + Tambah Siswa </h1>
              </span>
            </Link>
          </div>

          <div>
            <table className="min-w-full text-sm text-center border-t border-black ">
              <thead className="bg-[#35732F] text-white border-b border-r border-l border-t border-black ">
                <tr className="border-b border-r border-l border-t border-black ">
                  <th className="py-2 px-4 border-b border-r border-l ">NIS</th>
                  <th className="py-2 px-4 border-b border-r border-l">Nama</th>
                  <th className="py-2 px-4 border-b border-r border-l">
                    Kelas
                  </th>
                  <th className="py-2 px-4 border-b border-r border-l">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {currentSiswa.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-r ">{item.nis}</td>
                    <td className="py-2 px-4 border-b border-r">{item.nama}</td>
                    <td className="py-2 px-4 border-b border-r ">
                      {item.kelas}
                    </td>
                    <td className="py-2 px-4 border-b space-x-1">
                      <Link href={`/A_edit_siswa?nis=${item.nis}`}>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.nis)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={goToNextPage} // Ganti ini
                disabled={currentPage === totalPages}
                className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
