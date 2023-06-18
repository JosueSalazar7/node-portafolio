
const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
}
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
//Presentar el formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
//Capturar los daots y presentar en consola
const Portfolio = require('../models/Portfolio')//Importación del modelo
const createNewPortafolio =async (req,res)=>{
    const {title, category,description,skill,contact} = req.body
    const newPortfolio = new Portfolio({title,category,description,skill,contact})
    await newPortfolio.save()
    res.redirect('/portafolios')
}

const renderEditPortafolioForm =async(req,res)=>{
    //apartir del modelo llamar al metodo findgyid
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}
const updatePortafolio = async(req,res)=>{
    //CCapturamos los datos del formulario
    const {title,category,description}= req.body
    //A partar del modelo llamar al metodo findByIdAndUpadte
    //Pasando a la función el id del portafolio y los datos a modificar
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}

module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}