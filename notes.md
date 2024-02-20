## Tujuan 
Tujuan dari proyek ini adalah untuk mengembangkan RESTful API untuk platform e-commerce. API harus memungkinkan pengguna untuk menjelajah, mencari, dan membeli produk. Selain itu, API harus mendukung autentikasi dan otorisasi pengguna, memungkinkan pengguna untuk membuat dan mengelola akun mereka sendiri.

## Prasyarat
- Pemahaman dasar tentang Node.js
- Pemahaman dasar tentang Express.js
- Pemahaman dasar tentang SQL
- Pemahaman dasar tentang MySQL dan Prisma ORM
- Pemahaman dengan prinsip desain REST API

## Hasil yang Diharapkan
- RESTful API yang berfungsi penuh untuk platform e-commerce
- Tes untuk endpoint API
- Dokumentasi untuk API

## Actors
- Pengguna yang menjual produk di platform e-commerce.
- Pengguna yang membeli produk di platform e-commerce.
Penjelasan Rinci

**API** harus memungkinkan Seller untuk membuat, membaca, memperbarui, dan menghapus produk.
Produk harus memiliki atribut seperti nama, deskripsi, harga, dan kategori.

**API**  harus memungkinkan pengguna untuk membuat dan mengelola akun mereka sendiri.
Pengguna harus memiliki atribut seperti nama, email, dan kata sandi. Pengguna harus diautentikasi dan diberi otorisasi untuk mengakses endpoint API tertentu.

**API**  harus memungkinkan Regular User untuk menambahkan dan menghapus item dari keranjang belanja mereka. Keranjang belanja harus persisten. Regular User harus bisa melalkukan checkout dan melakukan pemesanan.

**API**  harus terintegrasi dengan gateway pembayaran untuk memproses pembayaran.
Pengguna harus dapat memberikan informasi pembayaran dengan aman. Pesanan harus diperbarui dengan status pembayaran.

**API**  harus mendukung fungsi pencarian untuk memungkinkan pengguna menemukan produk.
Pencarian harus berdasarkan nama produk, deskripsi, dan kategori. Hasil pencarian harus diurutkan dan diberi halaman. 

**Dokumentasi** komprehensif harus disediakan untuk API. Dokumentasi harus mencakup deskripsi endpoint, format permintaan dan respons, dan kode kesalahan. Dokumentasi harus mudah dimengerti dan diikuti.

## Evaluasi

Proyek akan dievaluasi berdasarkan kriteria berikut:
- Proyek harus memenuhi semua hasil yang diharapkan yang ditentukan dalam uraian proyek.
- API harus berfungsi penuh dan memenuhi semua persyaratan yang ditentukan dalam uraian proyek.
- Kode harus ditulis dengan baik, didokumentasikan, dan mudah dimengerti.
- API harus memiliki tes unit yang komprehensif untuk memastikan kualitasnya.
- API harus memiliki dokumentasi komprehensif yang mudah dimengerti dan diikuti.


## Pedoman Tambahan
- Gunakan konvensi penamaan yang konsisten dan tepat untuk rute, parameter, dan struktur data.
- Implementasikan penanganan kesalahan yang tepat dan kembalikan kode kesalahan yang sesuai.
- Amankan endpoint API untuk mencegah akses yang tidak sah.
- Gunakan kode status HTTP yang tepat untuk setiap respons.