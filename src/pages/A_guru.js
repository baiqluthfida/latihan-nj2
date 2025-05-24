"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AGuru() {
  const [guruList, setGuruList] = useState([]);
  const [editNip, setEditNip] = useState(null);
  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    alamat: "",
    pendidikan: "",
    pengampu: "",
    password: "",
  });

  const fetchGuru = async () => {
    const res = await fetch("/api/guru");
    const data = await res.json();
    setGuruList(data);
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  const handleEditClick = (guru) => {
    setEditNip(guru.nip);
    setFormData({
      nip: guru.nip,
      nama: guru.nama,
      alamat: guru.alamat,
      pendidikan: guru.pendidikan,
      pengampu: guru.pengampu,
      password: guru.password,
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/guru", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nip: editNip, ...formData }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Berhasil mengedit guru");
      setEditNip(null);
      fetchGuru();
    } else {
      alert("Gagal mengedit guru: " + result.message);
    }
  };

  const handleDelete = async (nip) => {
    if (!confirm("Yakin mau hapus guru dengan NIP " + nip + "?")) return;

    const res = await fetch(`/api/guru?nip=${nip}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (res.ok) {
      alert("Berhasil menghapus guru");
      fetchGuru();
    } else {
      alert("Gagal menghapus guru: " + result.message);
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
              Data Guru
            </h1>
            <Link
              href="/A_tambahguru"
              className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] bg-[#35732F] h-12 w-55 pl-4 "
            >
              <span className="text-[25px] font-bold flex items-center">
                <h1 className=""> + Tambah Guru </h1>
              </span>
            </Link>
          </div>

          <div>
            <table className="min-w-full text-sm text-center border-t border-black ">
              <thead className="bg-[#35732F] text-white border-b border-r border-l border-t border-black ">
                <tr className="border-b border-r border-l border-t border-black ">
                  <th className="py-2 px-4 border-b border-r border-l ">
                    NUPTK
                  </th>
                  <th className="py-2 px-4 border-b border-r border-l">Nama</th>
                  <th className="py-2 px-4 border-b border-r border-l">
                    Pengampu
                  </th>
                  <th className="py-2 px-4 border-b border-r border-l">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {guruList.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-r ">{item.nip}</td>
                    <td className="py-2 px-4 border-b border-r">{item.nama}</td>
                    <td className="py-2 px-4 border-b border-r ">
                      {item.pengampu}
                    </td>
                    <td className="py-2 px-4 border-b space-x-1">
                      <Link href={`/A_edit_guru?nip=${item.nip}`}>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.nip)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
