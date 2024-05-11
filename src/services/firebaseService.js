const { getDatabase, ref, get } = require("firebase/database");
const { initializeApp } = require("firebase/app");

const initializeFirebaseApp = (config) => {
    return initializeApp(config);
};

const getDatabaseReference = (app) => {
    return getDatabase(app);
};

const getDataRef = (path) => {
    return ref(getDatabaseReference(), path);
};

const getDataSnapshot = async (databaseRef) => {
    try {
        const snapshot = await get(databaseRef);
        return snapshot;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    initializeFirebaseApp,
    getDatabaseReference,
    getDataRef,
    getDataSnapshot
};
