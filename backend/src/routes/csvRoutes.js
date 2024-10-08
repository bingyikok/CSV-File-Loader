const upload = require('../controllers/upload');
const display = require('../controllers/display');

module.exports = async (fastify, options) => {
  fastify.post("/upload", upload.upload);

  fastify.post("/data", display.display);

  fastify.get("/getentries", display.noOfEntries);

//   fastify.get("/tables", display.tables);
};