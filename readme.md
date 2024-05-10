
## API SoltarinE

SoltarinE adalah sebuah proyek akhir semester TEK 59 yang merupakan Bank Daya berbasis IoT. API ini dibangun menggunakan Express.js dan Firebase Realtime Database sebagai penyimpanan data.

## Maintaner
Naufal Rizqullah Firdaus

## Deskripsi
API SoltarinE bertujuan untuk menyediakan akses data yang diperoleh dari sistem IoT SoltarinE. Data-data tersebut meliputi informasi tentang baterai, arus listrik, produksi energi, suhu, dan efisiensi sistem.

## Instalasi
Untuk menjalankan API ini, ikuti langkah-langkah berikut:

1. Pastikan Anda telah menginstal Node.js di sistem Anda.

2. Clone repository ini dengan perintah:
```git clone https://github.com/naufalrf4/api-soltarine.git```

3. Masuk ke direktori proyek dengan perintah:
```cd api-soltarine```

4. Install semua dependensi dengan perintah:
```npm install```

5. Buat file `.env` berdasarkan `.env.example` dan sesuaikan dengan konfigurasi yang tepat.

6. Jalankan server dengan perintah:
```npm start```

7. Server akan berjalan di `http://localhost:3000` atau port yang telah ditentukan.

## Struktur Direktori
- `src`: Direktori utama yang berisi kode sumber aplikasi.
- `controllers`: Kontroler Express.js untuk mengelola requests HTTP.
- `middlewares`: Middleware Express.js untuk pemrosesan requests.
- `services`: Modul yang menyediakan layanan seperti koneksi ke Firebase Realtime Database.
- `utils`: Utilitas yang digunakan dalam aplikasi.
- `logs`: Direktori untuk menyimpan file log.
- `database.json`: Contoh isi Firebase Realtime Database.
- `.env.example`: Contoh konfigurasi environment aplikasi.
- `app.js`: main aplikasi.

## Contoh Penggunaan Firebase Realtime Database
File `database.json` adalah isi dari Firebase Realtime Database. Anda dapat menggunakan struktur dan data dalam file ini sebagai panduan saat bekerja dengan database Firebase.

## Konfigurasi Environment
File `.env.example` adalah contoh konfigurasi environment yang dibutuhkan oleh aplikasi. Anda perlu membuat file `.env` berdasarkan contoh ini dan mengisi nilai environment variabel sesuai dengan konfigurasi yang tepat.