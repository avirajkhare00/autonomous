module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 7000000,
      gasPrice: 0,
      network_id: "*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
