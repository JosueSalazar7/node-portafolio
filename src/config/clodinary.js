const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    //En el index para que el process funcione tiene que estar
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});
//Exportacion del por default del metodo uploadimage
module.exports.uploadImage = async(filePath) => {
    //Suir la imagen de la ruta (filepath)
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}
module.exports.deleteImage = async (publicId)=>{
    //Eliminar la imagen en base a la id
    return await cloudinary.uploader.destroy(publicId)
}   