const { Server } = require("socket.io");
let io;

module.exports = {
  init: (server) => {
    io = new Server(server);
    return io;
  },
  getIo: () => {
    if (!io) {
      console.log("NO IO");
    }
    return io;
  },
};
