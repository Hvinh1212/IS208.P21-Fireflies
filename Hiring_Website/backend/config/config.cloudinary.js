const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: "dnmr2biur",
    api_key: "898759748949967",
    api_secret: "hcCTnuenjXeo614FPVQSBuZq9lI",
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
        folder: "Joby",
        public_id: (req, file) => file.originalname.split(".")[0],
    },
    filename: function (req, res, cb) {
        cb(null, res.originalname);
    },
});

module.exports = multer({ storage });
