const { retrieveFromDatabase, getTables } = require("../services/csvService");

exports.display = async (req, res) => {
  const { limit, skip } = req.query;
  let data = null;

  console.log("limit", limit, "skip", skip);
  try {
    if (!limit && !skip) {
      data = await retrieveFromDatabase();
    //   console.log('undefined', data)
    } else {
      data = await retrieveFromDatabase(limit, skip);
    //   console.log('defined')
    }
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error during file retrieval:", error);
    res
      .status(500)
      .send({ message: "Error retrieving file", error: error.message });
  }
};

exports.noOfEntries = async (req, res) => {
  try {
      data = await retrieveFromDatabase();
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error during file retrieval:", error);
    res
      .status(500)
      .send({ message: "Error retrieving file", error: error.message });
  }
};

// exports.tables = async (req, res) => {
//   try {
//     data = await getTables();

//     res.status(200).send(data);
//   } catch (error) {
//     console.error("Error during table retrieval:", error);
//     res
//       .status(500)
//       .send({ message: "Error retrieving table", error: error.message });
//   }
// };