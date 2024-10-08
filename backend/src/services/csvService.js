const csv = require("csv-parser");
const { getRepository } = require("typeorm");
const csvData = require("../entities/csvData");
const csvParser = csv({
  columns: true,
  skip_empty_lines: true,
  bom: true,
});

async function parseCsv(file) {
  const results = [];

  return new Promise((resolve, reject) => {
    file
      .pipe(csvParser)
      .on("data", (data) => {
        const cleanData = {};
        Object.entries(data).forEach(([key, value]) => {
          // console.log(
          //   `Key: ${key}, Character Codes: ${[...key].map((c) =>
          //     c.charCodeAt(0)
          //   )}`
          // );
        
          key = key.replace(/\u200B/g, "").trim(); // Remove Zero Width Space

          // Remove ' and "
          key = key.replace(/^['"]|['"]$/g, "").trim();

          cleanData[key] = value;
        });
        results.push(cleanData);
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

async function saveToDatabase(data) {
  const csvRepo = getRepository(csvData);

  try {
    await csvRepo.save(data);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Duplicate entry detected. Please use another file.');
    } else {
        throw new Error('Failed to save data to database.')
    }
  }
}

async function getTables() {
    const querryRunner = getRepository(csvData).manager.connection.createQueryRunner();

    try{
        const tables = await querryRunner.getTables();
        const tableNames = tables.map(table=>table.name);

        return tableNames;
    } catch (error) {
        throw new Error('Fail to get tables: ' + error.message);
    }
}

async function retrieveFromDatabase (limit, skip) {
    try{
    const dataRepo = getRepository(csvData);
    const data = await dataRepo.find({
        order: {
            id: 'ASC',
        },
        take: limit,
        skip: skip
    });
    return data;
} catch (error) {
    throw new Error('Fail to retrieve data: ' + error.message);
}
}

module.exports = { parseCsv, saveToDatabase, retrieveFromDatabase, getTables };
