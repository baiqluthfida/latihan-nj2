import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment-timezone";
import { Toaster, toast } from "sonner";

export default function G_absen8() {
  const [guru, setGuru] = useState(null);
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tanggal, setTanggal] = useState("");
  const [deskripsiUmum, setDeskripsiUmum] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const tanggalUTC = "2025-05-24T07:00:00.000Z";
  const waktuWITA = moment
    .utc(tanggalUTC)
    .tz("Asia/Makassar")
    .format("DD MMMM YYYY HH:mm:ss");

  console.log(waktuWITA); // 24 Mei 2025 15:00:00

  const [absensiData, setAbsensiData] = useState([]);

  const checkAbsensiLama = async (selectedDate) => {
    if (!guru || !selectedDate) return;

    try {
      const res = await fetch(
        `/api/absensi?siswa_kelas=8&tanggal=${selectedDate}&pengampu=${guru.pengampu}&id_guru=${guru.id}`
      );
      const result = await res.json();

      if (Array.isArray(result) && result.length > 0) {
        toast.info(
          "Absensi sebelumnya ditemukan. Form dimuat ulang untuk edit."
        );
        const updatedAbsensi = siswa.map((s) => {
          const data = result.find((d) => d.id_siswa === s.id);
          return {
            status: data?.status || "",
            deskripsi: data?.deskripsi || "",
          };
        });
        setAbsensiData(updatedAbsensi);
        setDeskripsiUmum(result[0]?.keterangan || "");
      } else {
        // Kalau tidak ada data, reset ke kosong
        setAbsensiData(siswa.map(() => ({ status: "", deskripsi: "" })));
        setDeskripsiUmum("");
      }
    } catch (err) {
      console.error("Gagal memeriksa absensi sebelumnya:", err);
      toast.error("Gagal mengambil absensi lama.");
    }
  };

  const handleStatusChange = (index, status) => {
    const newData = [...absensiData];
    newData[index] = { ...newData[index], status };
    setAbsensiData(newData);
  };

  const handleDeskripsiChange = (index, deskripsi) => {
    const newData = [...absensiData];
    newData[index] = { ...newData[index], deskripsi };
    setAbsensiData(newData);
  };

  const handleSimpan = async () => {
    if (!tanggal) {
      toast.error("Tanggal harus diisi.");
      return;
    }

    const dataToSend = siswa.map((item, index) => {
      const absensi = absensiData[index] || {};
      return {
        id_siswa: item.id,
        id_guru: guru.id,
        tanggal,
        status: absensi.status || "",
        keterangan: deskripsiUmum,
        deskripsi: absensi.deskripsi || "",
      };
    });

    try {
      const res = await fetch("/api/absensi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ absensi: dataToSend }), // ✅ Bungkus dengan key "absensi"
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      toast.success("Absensi berhasil disimpan.");

      setAbsensiData(siswa.map(() => ({ status: "", deskripsi: "" })));
      setDeskripsiUmum("");
      setTanggal("");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      toast.error("Terjadi kesalahan saat menyimpan absensi.");
    }
  };

  useEffect(() => {
    if (guru && siswa.length > 0 && tanggal) {
      checkAbsensiLama(tanggal);
    }
  }, [guru, siswa, tanggal]);

  useEffect(() => {
    const storedGuru = localStorage.getItem("guru");
    if (storedGuru) {
      setGuru(JSON.parse(storedGuru));
    }
  }, []);

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const res = await fetch("/api/siswa?kelas=8");
        const data = await res.json();
        setSiswa(data);
        setAbsensiData(data.map(() => ({ status: "", deskripsi: "" }))); // Initialize
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiswa();
  }, []);

  if (!guru || loading) return <p>Memuat...</p>;

  return (
    <div>
      <Toaster
        position="center-center"
        richColors
        toastOptions={{
          className: "text-lg font-semibold", // teks besar
          style: { padding: "1.5rem", borderRadius: "1rem" }, // tampilan lebih besar
        }}
      />
      {/* Navbar */}
      <nav className="flex items-center bg-white pl-6 py-3">
        <img className="h-15 w-16" src="/logoYayasan.png" alt="" />
        <h1 className="text-2xl font-bold text-[#000000] pl-5">
          YAYASAN <br />
          RIADHUL ULUM
        </h1>
      </nav>

      {/* Layout: Sidebar + Konten */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#1F581A] p-8 flex flex-col">
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

        {/* Konten */}
        <div className="w-3/4 flex-1 bg-[#EEEFF3]">
          <div className="bg-[#D9D9D9] py-4 px-7">
            <h1 className="text-[#35732F] font-bold text-[50px]">
              {guru.pengampu} Kelas 8
            </h1>
          </div>

          {/* Form Data Guru */}
          <div className="flex pt-5">
            <div>
              <h1 className="text-[#35732f] text-[18px] px-20 py-3">
                Nama Guru
              </h1>
              <h1 className="text-[#35732f] text-[18px] px-20 py-3">
                Deskripsi
              </h1>
              <h1 className="text-[#35732f] text-[18px] px-20 py-3">Tanggal</h1>
            </div>

            <div className="pt-2">
              <h1 className="text-[#4c4d4c] w-[250px] text-[18px] px-5 py-1 bg-[#d9d9d9] rounded-xl">
                {guru.nama}
              </h1>

              <div className="pt-4">
                <input
                  type="text"
                  value={deskripsiUmum}
                  onChange={(e) => setDeskripsiUmum(e.target.value)}
                  className="text-[#4c4d4c] w-[500px] text-[18px] px-5 py-1 bg-[#d9d9d9] rounded-xl"
                />
              </div>

              <div className="pt-4">
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setTanggal(selected); // 🔁 cek apakah sudah ada data
                  }}
                  className="text-[#4c4d4c] w-[200px] text-[18px] px-5 py-1 bg-[#d9d9d9] rounded-xl"
                  placeholder={waktuWITA}
                />
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div className="pt-10 pl-20 flex">
            <button
              onClick={handleSimpan}
              className="bg-[#2db2f4] text-white py-2 px-4 rounded-xl mr-4 flex items-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              Simpan
            </button>

            <button
              className="bg-[#eac530] text-white py-2 px-4 rounded-xl mr-4 flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="fa-solid fa-file-export"></i>
              Unduh
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-[300px]">
                <h2 className="text-lg font-bold mb-4 text-[#35732f]">
                  Pilih Rentang Tanggal
                </h2>

                <label className="text-[#35732f] text-sm">Tanggal Mulai</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mb-3 w-full px-4 py-2 rounded-xl bg-[#d9d9d9] text-[#4c4d4c]"
                />

                <label className="text-[#35732f] text-sm">Tanggal Akhir</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mb-4 w-full px-4 py-2 rounded-xl bg-[#d9d9d9] text-[#4c4d4c]"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#35732f] px-4 py-2 rounded-lg border border-[#35732f]"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      if (!startDate || !endDate) {
                        alert("Tanggal belum lengkap!");
                        return;
                      }
                      setIsModalOpen(false);
                      window.location.href = `/G_rekap8/?tanggal_awal=${startDate}&tanggal_akhir=${endDate}&guru_id=${guru.id}&kelas=8`;
                    }}
                    className="bg-[#35732f] text-white px-4 py-2 rounded-lg"
                  >
                    Proses
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabel Absen */}
          <div className="overflow-x-auto p-4">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-[#1F581A] text-white">
                <tr>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Alpa</th>
                  <th className="px-4 py-2">Hadir</th>
                  <th className="px-4 py-2">Izin</th>
                  <th className="px-4 py-2">Sakit</th>
                  <th className="px-4 py-2">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {siswa.map((item, i) => (
                  <tr key={item.nis} className="text-center">
                    <td className="border border-gray-400 px-4 py-2 font-semibold text-gray-800">
                      {item.nama}
                    </td>
                    {["alpa", "hadir", "izin", "sakit"].map((val) => (
                      <td
                        className="border border-gray-400 px-4 py-2"
                        key={val}
                      >
                        <input
                          type="radio"
                          name={`absen${i}`}
                          value={val}
                          checked={absensiData[i]?.status === val}
                          onChange={() => handleStatusChange(i, val)}
                        />
                      </td>
                    ))}

                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Tulis deskripsi"
                        className="px-2 py-1 rounded-md border border-gray-300 w-full text-sm text-[#272727]"
                        value={absensiData[i]?.deskripsi || ""}
                        onChange={(e) =>
                          handleDeskripsiChange(i, e.target.value)
                        }
                      />
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
