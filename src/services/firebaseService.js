const { getDatabase, ref } = require("firebase/database");
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

module.exports = {
    initializeFirebaseApp,
    getDatabaseReference,
    getDataRef
};
