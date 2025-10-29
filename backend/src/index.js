// 1. Semua import di bagian atas
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import vaRoutes from "./routes/va.routes.js"; // Pastikan file ini ada atau hapus jika tidak digunakan
import midtransRoutes from "./routes/midtrans.routes.js";
import countryRoutes from "./routes/country.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

// 2. Konfigurasi awal (dotenv) dan inisialisasi aplikasi Express
dotenv.config();
const app = express();

// 3. Gunakan middleware
app.use(cors());
app.use(express.json());

// 4. Daftarkan semua routes
app.use("/api", vaRoutes); // Jika vaRoutes tidak dipakai, hapus baris ini
app.use("/api", midtransRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/booking", bookingRoutes);

// 5. Jalankan server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));