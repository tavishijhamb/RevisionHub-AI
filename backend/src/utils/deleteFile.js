const fs = require("fs").promises;

const deleteFile = async (filePath) => {

    try {

        await fs.unlink(filePath);

        console.log(`Deleted file: ${filePath}`);

    } catch (err) {

        if (err.code !== "ENOENT") {

            console.error("Error deleting file:", err);

        }

    }

};

module.exports = deleteFile;