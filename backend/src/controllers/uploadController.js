const {saveExtractedText} = require("../data/studyData");
const { extractTextFromPDF } = require("../services/pdfService");
const deleteFile = require("../utils/deleteFile");

const getHome = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend Server Running"
    })
}

const getStatus = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is working correctly"
    })
}

const uploadPDF = async (req, res) => {

    let filePath;

    try {

        filePath = req.file.path;

        const extractedText = await extractTextFromPDF(filePath);

        saveExtractedText(extractedText);

        res.status(200).json({
            success: true,
            message: "PDF uploaded successfully",
            file: req.file.filename
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to read PDF."
        });

    } finally {

        if (filePath) {
            await deleteFile(filePath);
        }

    }

};

module.exports = {getHome, getStatus, uploadPDF}