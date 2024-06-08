const { ref, remove, query, endAt } = require("firebase/database");
const firebaseService = require("../services/firebaseService");
const logger = require("../utils/logger");

const deleteOldData = (req, res) => {
  const { token } = req.body;
  const authToken = "soltarine-tek59"; 
  
  if (token !== authToken) {
    return res.status(401).json({ message: "Token tidak diizinkan" });
  }

  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

  const dataRef = ref(firebaseService.getDataRef("/data"));

  const oldDataQuery = query(dataRef, endAt(sevenDaysAgo.toString()));

  remove(oldDataQuery)
    .then(() => {
      logger.info("Data yang lebih tua dari 7 hari berhasil dihapus");
      res.json({ message: "Data yang lebih tua dari 7 hari berhasil dihapus" });
    })
    .catch((error) => {
      logger.error("Gagal menghapus data lama:", error);
      res.status(500).json({ message: "Gagal menghapus data lama" });
    });
};

module.exports = {
  deleteOldData,
};
