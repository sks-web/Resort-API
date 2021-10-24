const io = require("../socket").getIo();
exports.chattingDemo = (req, res, next) => {
  console.log(io);
  console.log("hi");
};
