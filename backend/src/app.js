const fastifyMultipart = require("fastify-multipart");
const fastifyCors = require("fastify-cors");
const fastify = require("fastify")({ logger: true });
const routes = require("./routes/csvRoutes");
const ormconfig = require("./ormconfig");
const { createConnection } = require("typeorm");
require("reflect-metadata");

createConnection(ormconfig)
  .then(() => {
    console.log("Connected to the database");

    fastify.register(fastifyCors, {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    });
    fastify.register(fastifyMultipart);
    fastify.register(routes);

    fastify.listen({ port: process.env.PORT }, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`Server running at ${address}`);
    });
  })
  .catch((error) => {
    console.error("Error during TypeORM connection:", error);
  });