const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = {folder}
        if (height) {
            options.hieght = height
        }
        if (quality) {
            options.quality = quality
        }
        options.resource_type = "auto"

        return await cloudinary.uploader.upload(file.tempFilePath, options)
    }
    catch (error) {
         res.status(500).json({
           success: false,
           message: "Error while uploading images to cloudinary ",
           error: error.message,
         });
    }
}