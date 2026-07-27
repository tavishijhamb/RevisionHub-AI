let extractedText = "";

const saveExtractedText = (text) => {
    extractedText = text;
};

const getExtractedText = () => {
    return extractedText;
};

const clearExtractedText = () => {
    extractedText = "";
};

module.exports = {
    saveExtractedText,
    getExtractedText,
    clearExtractedText
};