module.exports = {
  ci: {
    collect: {
      url: [
        "https://7.qa.tacorosa.club/",
        "https://7.qa.tacorosa.club/signup",
        "https://7.qa.tacorosa.club/top-models",
      ],
      numberOfRuns: 1,
      chromeFlags: "--user-data-dir=./pw-user-data",
      settings: {
        disableStorageReset: true,
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
        },
      },
    },

    upload: {
      target: "lhci",
      serverBaseUrl: "http://localhost:9001",
      token: "59363e33-267d-49fd-a4b3-5ddddc5a440e",
    },

    // Optional – you can add later
    // assert: {
    //   assertions: {
    //     'categories:performance': ['warn', { minScore: 0.6 }],
    //   },
    // },
  },
};
