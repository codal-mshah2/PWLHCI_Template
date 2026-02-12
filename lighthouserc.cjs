module.exports = {
  ci: {
    collect: {
      url: ["https://7.qa.tacorosa.club/"],
      numberOfRuns: 1,
    },

    upload: {
      target: "lhci",
      serverBaseUrl: "http://localhost:9001",
      token: "59363e33-267d-49fd-a4b3-5ddddc5a440e",
    },
    server: {
      storage: {
        storageMethod: "sql",
        sqlDialect: "sqlite",
        sqlDatabasePath: "./db.sql",
      },
    },
  },
};
