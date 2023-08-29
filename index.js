import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import db from "./config/db.js";
import MasyarakatRoutes from "./routes/masyarakat.routes.js";
import PengaduanRoutes from "./routes/pengaduan.routes.js";
import PetugasRoutes from "./routes/petugas.routes.js";
import TanggapanRoutes from "./routes/tanggapan.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import SequelizeStore from "connect-session-sequelize";
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

// class Index {
//   constructor() {
//     this.init();
//     this.routes();
//   }

//   init() {
//     app.use(express.static("public"));
//   }

//   routes() {
//     app.use(MasyarakatRoutes);
//     app.use(PengaduanRoutes);
//     app.use(PetugasRoutes);
//     app.use(TanggapanRoutes);
//   }
// }

// (() => new Index())();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use(AuthRoutes);
app.use(MasyarakatRoutes);
app.use(PengaduanRoutes);
app.use(PetugasRoutes);
app.use(TanggapanRoutes);

// store.sync();

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}...`);
});
