const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "csvFile",
  tableName: "csv_data",
  columns: {
    postId: {
      type: "int",
      nullable: true,
    },
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    email: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    body: {
      type: "text",
      nullable: true,
    },
  },
});