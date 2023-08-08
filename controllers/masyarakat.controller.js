import Masyarakat from "../models/masyarakat.model.js";
import Pengaduan from "../models/pengaduan.model.js";

export const getAllMasyarakats = async (req, res) => {
  try {
    const response = await Masyarakat.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMasyarakatById = async (req, res) => {
  try {
    const response = await Masyarakat.findOne({
      where: {
        id: req.params.id,
      },
      // include: [{ model: Pengaduan }],
    });
    if (!response) return res.status(404).json({ message: "No data found!" });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMasyarakat = async (req, res) => {
  //   console.log(req);
  try {
    await Masyarakat.create({
      nik: req.body.nik,
      nama: req.body.nama,
      username: req.body.username,
      password: req.body.password,
      telp: req.body.telp,
    });
    res.status(201).json({ message: "Berhasil register!", data: req.body });
  } catch (error) {
    console.log(error.message);
  }
};

export const editMasyarakat = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMasyarakat = async (req, res) => {
  getMasyarakatById();
  try {
    await Masyarakat.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (error) {
    console.log(error.message);
  }
};

// export const getAllMasyarakats = async (req, res) => {
//     try {
//       res.json({ message: "test" });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   export const getMasyarakat = async (req, res) => {
//     try {
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   export const createMasyarakat = async (req, res) => {
//     try {
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   export const editMasyarakat = async (req, res) => {
//     try {
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   export const deleteMasyarakat = async (req, res) => {
//     try {
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
