require("dotenv").config();

module.exports = {
  type: "mysql",
  host: process.env.SQLHOST,
  port: Number(process.env.SQLPORT),
  username: process.env.SQLUSER,
  password: process.env.SQLPW,
  database: process.env.SQLDB,
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.js"],
};