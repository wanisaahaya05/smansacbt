# Ruang Ujian

Aplikasi prototipe ujian sekolah lokal dengan React, Vite, Dexie/IndexedDB, dan Tailwind CSS.

## Menjalankan

1. Pastikan Node.js 18 atau lebih baru tersedia.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`, lalu buka alamat yang ditampilkan Vite.
4. Untuk produksi, jalankan `npm run build`.

## Akun demo

- Administrator: `admin` / `admin123`
- Guru: `guru` / `guru123`
- Siswa: `siswa` / `siswa123`

Database `SmaCbtDatabase` diinisialisasi dengan contoh kelas, siswa, soal, dan ujian saat pertama kali aplikasi dijalankan. Hapus data situs melalui pengaturan browser untuk menghapus IndexedDB.

## Fitur prototipe

Login lokal tiga peran, ringkasan statistik dari IndexedDB, CRUD dasar siswa, bank soal pilihan ganda, paket ujian, sesi siswa dengan penyimpanan jawaban dan tenggat waktu, penilaian otomatis, rekap hasil, serta ekspor data siswa ke Excel.

## Keterbatasan

Ini prototipe satu browser/perangkat. Autentikasi demo membandingkan kata sandi lokal dan tidak aman untuk penggunaan resmi. Peran guru dan administrator belum memiliki pembatasan layanan/data yang kuat. Pengelolaan guru, kelas/jurusan, mata pelajaran, impor, backup/restore, koreksi esai, publikasi hasil, laporan lengkap, dan rangkaian pengujian belum tersedia. Data tidak tersinkron antarpiranti dan dapat dihapus oleh browser. Gunakan backend terautentikasi untuk ujian resmi.


Instalasi dan build belum terverifikasi: akses npm registry gagal pada lingkungan kerja ini. Kredensial akun contoh disimpan lokal sebagai demo; jangan gunakan untuk data atau ujian produksi.
