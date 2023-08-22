import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import MasyarakatRoutes from "./routes/masyarakat.routes.js";
import PengaduanRoutes from "./routes/pengaduan.routes.js";
import PetugasRoutes from "./routes/petugas.routes.js";
import TanggapanRoutes from "./routes/tanggapan.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// routes
app.use(MasyarakatRoutes);
app.use(PengaduanRoutes);
app.use(PetugasRoutes);
app.use(TanggapanRoutes);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}...`);
});
