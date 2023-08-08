import express from "express";
import cors from "cors";
import MasyarakatRoutes from "./routes/masyarakat.routes.js";
import PengaduanRoutes from "./routes/pengaduan.routes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// routes
app.use(MasyarakatRoutes);
app.use(PengaduanRoutes);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}...`);
});
