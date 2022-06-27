module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    matic: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
   mocha: {
  //   reporter: "eth-gas-reporter",
  //   reporterOptions: {
  //     gasPrice: 1,
  //     token: "ETH",
  //     showTimeSpent: true,
  //     showTotalGasUsed: true,
  //     showIndividualGasUsed: true,
  //     optimizerRuns: 200,
  //   }, // See options below
   },

  plugins: [
    "solidity-coverage"
  ],

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",
    },
  },
};
