const { onValue, ref, update } = require("firebase/database");
const firebaseService = require('../services/firebaseService');
const logger = require('../utils/logger');

const getData = (req, res) => {
    onValue(firebaseService.getDataRef('/soltarine_data'), (snapshot) => {
        const data = snapshot.val();
        logger.info('Mendapatkan data:', data);
        res.json(data);
    }, {
        onlyOnce: true
    });
};

const updateData = async (req, res) => {
    const newData = req.body.soltarine_data;

    if (!newData) {
        logger.error('Bad Request: Data yang diberikan tidak valid.');
        return res.status(400).send('Bad Request: Data yang diberikan tidak valid.');
    }

    try {
        await update(firebaseService.getDataRef('/soltarine_data'), newData);
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp}: Data berhasil diperbarui di Firebase: ${JSON.stringify(newData)}\n`;
        logger.info(logMessage);
        res.send('Data berhasil diperbarui di Firebase.');
    } catch (error) {
        logger.error('Terjadi kesalahan saat memperbarui data di Firebase:', error);
        res.status(500).send('Terjadi kesalahan saat memperbarui data di Firebase.');
    }
};

module.exports = {
    getData,
    updateData
};
