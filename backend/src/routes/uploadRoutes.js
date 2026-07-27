const express = require("express")
const router = express.Router()
const upload = require("../middleware/uploadMiddleware")
const multer = require("multer")
const { getExtractedText } = require("../data/studyData");

const {getHome, getStatus, uploadPDF} = require("../controllers/uploadController")

router.get("/", getHome)
router.get("/status", getStatus)

router.get("/text", (req, res) => {

    res.json({
        success: true,
        text: getExtractedText()
    });

});

router.post("/upload", (req, res) => {

    upload.single("pdf")(req, res, function (err) {

        if (err instanceof multer.MulterError) {

            if (err.code === "LIMIT_FILE_SIZE") {

                return res.status(400).json({
                    success: false,
                    message: "Maximum file size is 20 MB."
                })

            }

            return res.status(400).json({
                success: false,
                message: err.message
            })

        }

        if (err) {

            return res.status(400).json({
                success: false,
                message: err.message
            })

        }

        uploadPDF(req, res)

    })

})

module.exports = router