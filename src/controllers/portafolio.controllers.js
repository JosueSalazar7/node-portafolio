const fs = require('fs-extra')
const { uploadImage, deleteImage } = require('../config/clodinary')
const renderAllPortafolios = async (req, res) => {
    const portfolios = await Portfolio.find({ user: req.user._id }).lean()
    res.render("portafolio/allPortfolios", { portfolios })
}
const renderPortafolio = (req, res) => {
    res.send('Mostrar el detalle de un portafolio')
}
//Presentar el formulario
const renderPortafolioForm = (req, res) => {
    res.render('portafolio/newFormPortafolio')
}
//Capturar los daots y presentar en consola
const Portfolio = require('../models/Portfolio')//Importación del modelo
const createNewPortafolio = async (req, res) => {

    const { title, category, description } = req.body
    const newPortfolio = new Portfolio({ title, category, description })
    newPortfolio.user = req.user._id
    if (!(req.files?.image)) return res.send("Se requiere una imagen")
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id: imageUpload.public_id,
        secure_url: imageUpload.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
    await newPortfolio.save()
    res.redirect('/portafolios')
}
const renderEditPortafolioForm = async (req, res) => {
    //apartir del modelo llamar al metodo findgyid
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio', { portfolio })
}
const updatePortafolio = async (req, res) => {
    //Vereificar el id del portafoliosea el mismo
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Si es true continuar con la edicion y si es FALSE enviar a la ruta portafolios
    if (portfolio._id != req.params.id) return res.redirect('/portafolios')

    if (req.files?.image) {
        //Vamos a realizar la actualizacion de la imagen
        //Validar que venga una iagen en el formulario
        if (!(req.files?.image)) return res.send("Se requiere una imagen")
        //Eliminar la imagen en cloudinary
        await deleteImage(portfolio.image.public_id)
        //Cambiar la imagen
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        //Construir la data para actualizar en BDD
        const data = {
            title: req.body.title || portfolio.name,//Se mantenga lo que esta en los input
            category: req.body.category || portfolio.category,
            description: req.body.description || portfolio.description,
            image: {
                public_id: imageUpload.public_id,
                secure_url: imageUpload.secure_url
            }
        }
        //Eliminar la imagen temporal
        await fs.unlink(req.files.image.tempFilePath)
        //Actualizar en BDD findByIdUpdate
        await Portfolio.findByIdAndUpdate(req.params.id, data)
    }
    else {
        //Vamos a realizar la actualizacion de los campo de la imagen
        const { title, category, description } = req.body
        await Portfolio.findByIdAndUpdate(req.params.id, { title, category, description })
    }
    res.redirect('/portafolios')
}
const deletePortafolio = async (req, res) => {
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
    res.redirect('/portafolios')
}

module.exports = {
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}