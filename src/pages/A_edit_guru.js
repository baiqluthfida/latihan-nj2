// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// export default function EditSiswa() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [nip, setNip] = useState("");
//   const [nama, setNama] = useState("");
//   const [alamat, setAlamat] = useState("");
//   const [pendidikan, setPendidikan] = useState("");
//   const [pengampu, setPengampu] = useState("");
//   const [password, setPassword] = useState("");

//   // Ambil NIS dari query string (?nis=1234)
//   useEffect(() => {
//     const getData = async () => {
//       const nipParam = searchParams.get("nip");
//       if (!nipParam) return;

//       setNip(nipParam);

//       const res = await fetch("/api/guru");
//       const data = await res.json();
//       const guru = data.find((s) => String(s.nip) === String(nipParam));

//       if (guru) {
//         setNama(guru.nama);
//         setAlamat(guru.alamat);
//         setPendidikan(guru.pendidikan);
//         setPengampu(guru.pengampu);
//         setPassword(guru.password);
//       }
//     };

//     getData();
//   }, [searchParams]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/guru", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nip,
//         nama,
//         alamat,
//         pendidikan,
//         pengampu,
//         password,
//       }),
//     });

//     const result = await res.json();
//     console.log("Status:", res.status);
//     console.log("Result:", result);

//     if (res.ok) {
//       alert("Data berhasil diupdate!");
//       router.push("/A_guru");
//     } else {
//       alert("Gagal update: " + result.message);
//     }
//   };

//   return (
//     <div>
//       <nav className="flex items-center bg-white pl-6 py-3">
//         <img className="h-15 w-16 p" src="/logoYayasan.png" alt="" />
//         <h1 className="text-2xl font-bold text-[#000000] pl-5">
//           YAYASAN <br />
//           RIADHUL ULUM
//         </h1>
//       </nav>

//       <div className="flex h-screen">
//         <div className="w-1/4 h-full bg-[#1F581A] p-8">
//           <Link
//             href="A_beranda"
//             className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff]"
//           >
//             <span className="text-[25px] font-bold flex items-center">
//               <i class="fa-solid fa-chevron-right"></i>
//               <h1 className="pl-4">Beranda</h1>
//             </span>
//           </Link>

//           <Link
//             href="A_guru"
//             className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
//           >
//             <span className="text-[25px] font-bold flex items-center">
//               <i class="fa-solid fa-chevron-right"></i>
//               <h1 className="pl-4">Data Guru</h1>
//             </span>
//           </Link>

//           <Link
//             href="A_siswa"
//             className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
//           >
//             <span className="text-[25px] font-bold flex items-center">
//               <i class="fa-solid fa-chevron-right"></i>
//               <h1 className="pl-4">Data Siswa</h1>
//             </span>
//           </Link>

//           <Link
//             href="A_absen"
//             className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-7"
//           >
//             <span className="text-[25px] font-bold flex items-center">
//               <i class="fa-solid fa-chevron-right"></i>
//               <h1 className="pl-4">Absensi</h1>
//             </span>
//           </Link>
//           <Link
//             href="/"
//             className="text-[15px] font-bold flex items-center gap-1 text-[#ffffff] pt-90"
//           >
//             <span className="text-[25px] font-bold flex items-center">
//               <i class="fa-solid fa-chevron-right"></i>
//               <h1 className="pl-4">Log Out</h1>
//             </span>
//           </Link>
//         </div>

//         <div className="w-3/4 h-full bg-[#EEEFF3] p-8">
//           <h1 className=" text-[#35732F] font-bold text-[50px]"> Edit Guru</h1>

//           <div className="max-w-md mx-auto mt-7 p-4 border rounded">
//             <h1 className="text-xl font-bold mb-4">Edit Data Guru</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
//                 <label className="block text-[#35732F]font-bold">NUPTK</label>
//                 <input
//                   type="text"
//                   value={nip}
//                   disabled
//                   className="w-full border px-2 py-1 bg-[#ffffff] text-[#000000]"
//                 />
//               </div>
//               <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
//                 <label className="block text-[#35732F]font-bold">Nama</label>
//                 <input
//                   type="text"
//                   value={nama}
//                   onChange={(e) => setNama(e.target.value)}
//                   className="w-full border px-2 py-1 bg-[#ffffff] text-[#000000]"
//                 />
//               </div>
//               <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
//                 <label className="block text-[#35732F]font-bold">Alamat</label>
//                 <input
//                   type="text"
//                   value={alamat}
//                   onChange={(e) => setAlamat(e.target.value)}
//                   className="w-full border px-2 py-1 bg-[#ffffff]"
//                 />
//               </div>
//               <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
//                 <label className="block text-[#35732F]font-bold">
//                   Pendidikan
//                 </label>
//                 <input
//                   type="text"
//                   value={pendidikan}
//                   onChange={(e) => setPendidikan(e.target.value)}
//                   className="w-full border px-2 py-1 bg-[#ffffff]"
//                 />
//               </div>
//               <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
//                 <label className="block text-[#35732F]font-bold">
//                   pengampu
//                 </label>
//                 <input
//                   type="text"
//                   value={pengampu}
//                   onChange={(e) => setPengampu(e.target.value)}
//                   className="w-full border px-2 py-1 bg-[#ffffff]"
//                 />
//               </div>
//               <div className="mb-2 bg-[#D9D9D9] text-[#666363] text-center py-2 rounded px-6 pb-4">
//                 <label className="block text-[#35732F]font-bold">
//                   password
//                 </label>
//                 <input
//                   type="text"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full border px-2 py-1 bg-[#ffffff]"
//                 />
//               </div>
//               <div className="flex justify-center mt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded "
//                 >
//                   Simpan Perubahan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function EditGuru() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [pengampu, setPengampu] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getData = async () => {
      const nipParam = searchParams.get("nip");
      if (!nipParam) return;

      setNip(nipParam);

      const res = await fetch("/api/guru");
      const data = await res.json();
      const guru = data.find((s) => String(s.nip) === String(nipParam));

      if (guru) {
        setNama(guru.nama);
        setAlamat(guru.alamat);
        setPendidikan(guru.pendidikan);
        setPengampu(guru.pengampu);
        setPassword(guru.password);
      }
    };

    getData();
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/guru", {
      method: "PUT",
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

    const result = await res.json();
    if (res.ok) {
      alert("Data berhasil diupdate!");
      router.push("/A_guru");
    } else {
      alert("Gagal update: " + result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center bg-white px-6 py-4 shadow">
        <img className="h-14 w-14" src="/logoYayasan.png" alt="Logo Yayasan" />
        <h1 className="text-2xl font-bold text-black pl-5 leading-tight">
          YAYASAN <br /> RIADHUL ULUM
        </h1>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#1F581A] p-6 text-white space-y-6">
          {[
            { href: "A_beranda", label: "Beranda" },
            { href: "A_guru", label: "Data Guru" },
            { href: "A_siswa", label: "Data Siswa" },
            { href: "A_absen", label: "Absensi" },
            { href: "/", label: "Log Out" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 hover:text-yellow-300 transition"
            >
              <i className="fa-solid fa-chevron-right"></i>
              <span className="text-lg font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-10">
          <h1 className="text-4xl text-[#35732F] font-bold mb-6">Edit Guru</h1>

          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-white bg-[#1F581A] px-5 py-2 rounded-md w-fit mb-6">
              Form Edit Data Guru
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NIP */}
              <div>
                <label className="block text-[#1F581A] font-medium mb-1">
                  NIP
                </label>
                <input
                  type="text"
                  value={nip}
                  disabled
                  className="w-full bg-gray-200 border px-4 py-2 rounded-md  text-black"
                />
              </div>

              {/* Nama */}
              <div>
                <label className="block text-[#1F581A] font-medium mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#1F581A]   text-black"
                />
              </div>

              {/* Alamat */}
              <div>
                <label className="block text-[#1F581A] font-medium mb-1">
                  Alamat
                </label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#1F581A]  text-black"
                />
              </div>

              {/* Pendidikan */}
              <div>
                <label className="block text-[#1F581A] font-medium mb-1">
                  Pendidikan Terakhir
                </label>
                <input
                  type="text"
                  value={pendidikan}
                  onChange={(e) => setPendidikan(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#1F581A]  text-black"
                />
              </div>

              {/* Pengampu */}
              <div>
                <label className="block text-[#1F581A] font-medium mb-1">
                  Pengampu
                </label>
                <input
                  type="text"
                  value={pengampu}
                  onChange={(e) => setPengampu(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#1F581A]  text-black"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#1F581A] font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#1F581A]  text-black"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1F581A] hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-md transition duration-200 shadow"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
