const { onValue, ref, update } = require("firebase/database");
const firebaseService = require("../services/firebaseService");
const logger = require("../utils/logger");

const getData = (req, res) => {
  onValue(
    firebaseService.getDataRef("/"),
    (snapshot) => {
      const data = snapshot.val();
      logger.info("Mendapatkan data:", data);
      res.json(data);
    },
    {
      onlyOnce: true,
    }
  );
};

const updateData = (req, res) => {
  const newData = req.body;
  const allowedKeys = [
    "voltage",
    "power",
    "energy",
    "current",
    "ldr_light"
  ];

  const filteredData = Object.keys(newData)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = newData[key];
      return obj;
    }, {});

  const unauthorizedKeys = Object.keys(newData).filter(
    (key) => !allowedKeys.includes(key)
  );
  if (unauthorizedKeys.length > 0) {
    logger.warn("Key tidak diizinkan:", unauthorizedKeys);
    return res
      .status(400)
      .json({ message: "Data tidak diizinkan", unauthorizedKeys });
  }

  const timestamp = Date.now();
  const updatePath = `/data/${timestamp}`;
  
  update(firebaseService.getDataRef(updatePath), filteredData)
    .then(() => {
      logger.info("Data berhasil diupdate:", filteredData);
      res.json({ message: "Data berhasil diupdate" });
    })
    .catch((error) => {
      logger.error("Gagal mengupdate data:", error);
      res.status(500).json({ message: "Gagal mengupdate data" });
    });
};

module.exports = {
  getData,
  updateData,
};
