import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (nip === "admin" && password === "admin123") {
      // Redirect ke halaman A_beranda
      toast.success("Login berhasil!");
      setTimeout(() => {
        router.push("/A_beranda");
      }, 1000);
      return;
    }

    const res = await fetch("/api/absen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nip, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Simpan data guru ke localStorage
      toast.success("Login berhasil!");
      setTimeout(() => {
        localStorage.setItem("guru", JSON.stringify(data.data));
        router.push("/G_bio");
      }, 1000);
    } else {
      toast.error(data.message || "Login gagal!");
    }
  };

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
      <div className="min-h-screen flex">
        {/* Kiri: Gambar dan teks */}
        <div className="w-2/3 relative bg-black">
          <img
            src="/LandingPage.png"
            alt="Background Sekolah"
            className="absolute inset-0 object-cover w-full h-full opacity-70"
          />
          <div className="relative z-10 px-20 pt-50 text-white">
            <h1 className="text-[50px] font-bold">Sistem Informasi Absensi</h1>
            <h2 className="text-[40px] font-semibold mt-2">MTs Riadhul Ulum</h2>
          </div>
        </div>

        {/* Kanan: Form login */}
        <div className="w-1/3 bg-gray-100 flex items-start justify-center">
          <div className="w-full max-w-md px-8 pt-50">
            <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
              Masuk
            </h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="Masukkan Username"
                  className="w-full p-3 rounded bg-blue-100 placeholder:text-gray-600 text-[#000000]"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full p-3 rounded bg-blue-100 placeholder:text-gray-600 text-[#000000]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
