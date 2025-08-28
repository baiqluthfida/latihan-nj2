import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function RekapAbsensi() {
  const router = useRouter();
  const { tanggal_awal, tanggal_akhir, guru_id } = router.query;

  const [dataRekap, setDataRekap] = useState([]);
  const [namaGuru, setNamaGuru] = useState("-");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Ambil tanggal saat ini
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Ambil info mapel & guru dari item pertama
    const mapel = dataRekap[0]?.mapel || "-";
    const guru = dataRekap[0]?.guru || "-";

    // Judul dokumen
    doc.setFontSize(16);
    doc.text("Rekap Absensi Siswa", 14, 15);

    // Tanggal dibuat
    doc.setFontSize(10);
    doc.text(`Dibuat pada: ${formattedDate}`, 14, 22);

    // Info mapel dan pengampu
    doc.text(`Mata Pelajaran : ${mapel}`, 14, 30);
    doc.text(`Pengampu       : ROBY HIDAYAT S.Pd`, 14, 36);

    // Tabel isi data
    autoTable(doc, {
      startY: 44,
      head: [["Nama", "Kelas", "Mapel", "Hadir", "Alpa", "Sakit", "Izin"]],
      body: dataRekap.map((item) => [
        item.nama,
        item.kelas,
        item.mapel,
        item.hadir,
        item.alpa,
        item.sakit,
        item.izin,
      ]),
    });

    doc.save("rekap-absensi.pdf");
  };

  useEffect(() => {
    // Cek semua parameter sudah ada
    if (tanggal_awal && tanggal_akhir && guru_id) {
      setIsLoading(true);
      toast.success("Memuat data rekap...");
      setError(null);

      fetch(
        `/api/rekap?tanggal_awal=${tanggal_awal}&tanggal_akhir=${tanggal_akhir}&guru_id=${guru_id}&kelas=7`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Response API:", data); // Debug API response
          // Pastikan data ada dan berbentuk array
          if (data && Array.isArray(data.data)) {
            toast.success("Data rekap berhasil dimuat.");
            setDataRekap(data.data);
          } else if (Array.isArray(data)) {
            // Jika API langsung mengembalikan array tanpa object pembungkus 'data'
            setDataRekap(data);
          } else {
            setError("Format data tidak sesuai");
            toast.error("Format data tidak sesuai");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setError("Gagal memuat data rekap.");
          toast.error("Gagal memuat data rekap.");
          setIsLoading(false);
        });

      // Fetch nama guru
      fetch(`/api/guru?id=${guru_id}`)
        .then((res) => res.json())
        .then((data) => {
          setNamaGuru(data.nama || "-");
        })
        .catch((err) => {
          console.error("Fetch guru error:", err);
          setNamaGuru("-");
        });
    } else {
      // Jika parameter belum lengkap, reset state
      setDataRekap([]);
      setIsLoading(false);
      setError(null);
      console.log("Query params belum lengkap:", {
        tanggal_awal,
        tanggal_akhir,
        guru_id,
      });
    }
  }, [tanggal_awal, tanggal_akhir, guru_id]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-lg text-[#35732f]">
        Memuat data...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

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
      <nav className="flex items-center bg-white pl-6 py-3">
        <img className="h-15 w-16 p" src="/logoYayasan.png" alt="" />
        <h1 className="text-2xl font-bold text-[#000000] pl-5">
          YAYASAN <br />
          RIADHUL ULUM
        </h1>
      </nav>

      <div className="flex h-screen">
        <div className="w-1/4 h-full bg-[#1F581A] pt-10  overflow-y-auto">
          <Link
            href="/G_bio"
            className="w-full  text-[15px] font-bold flex items-center gap-1 text-white py-2 px-4 pr-4"
          >
            <span className="text-[25px] font-bold flex items-center">
              <i className="fa-solid fa-user text-[25px] pr-5" />
              Guru
            </span>
          </Link>

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
        <div className=" bg-[#EEEFF3] p-8 text-[#000000] w-full h-full">
          <h1 className="text-3xl font-bold mb-4 text-[#1F581A]">
            Rekap Absensi Siswa
          </h1>

          {dataRekap.length > 0 && (
            <button
              onClick={handleExportPDF}
              className="bg-[#35732F] text-white px-4 py-2 mb-4 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              <i className="fa-solid fa-file-pdf mr-2" />
              Ekspor ke PDF
            </button>
          )}

          {dataRekap.length === 0 ? (
            <p className="text-center text-gray-600 mt-6">
              Tidak ada data ditemukan.
            </p>
          ) : (
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-[#1F581A] text-white">
                <tr>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Kelas</th>
                  <th className="px-4 py-2">Mapel</th>
                  <th className="px-4 py-2">Hadir</th>
                  <th className="px-4 py-2">Alpa</th>
                  <th className="px-4 py-2">Sakit</th>
                  <th className="px-4 py-2">Izin</th>
                </tr>
              </thead>
              <tbody>
                {dataRekap.map((item, i) => (
                  <tr key={i} className="text-center border border-gray-300">
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">{item.kelas}</td>
                    <td className="px-4 py-2">{item.mapel}</td>
                    <td className="px-4 py-2">{item.hadir}</td>
                    <td className="px-4 py-2">{item.alpa}</td>
                    <td className="px-4 py-2">{item.sakit}</td>
                    <td className="px-4 py-2">{item.izin}</td>
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
