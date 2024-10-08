const { parseCsv, saveToDatabase } = require("../services/csvService");

exports.upload = async (req, res) => {
  try {
    const fileData = await req.file();
    // console.log(fileData.file);

    // Parse CSV file
    const results = await parseCsv(fileData.file);
    // console.log("Success parsing CSV", results[0]);

    await saveToDatabase(results);
    // console.log("Success saving to DB");

    res.status(200).send({ message: "Upload successful" });
  } catch (error) {
    console.error("Error during file upload:", error);
    res
      .status(500)
      .send({ message: "Error uploading file", error: error.message });
  }
};
