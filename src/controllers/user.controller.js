const passport = require("passport")
const User = require('../models/User')
const { sendMailToUser } = require("../config/nodemailer")

const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    //Cargar el usuario en base al token receptado
    const userBDD = await User.findOne({token:req.params.token})
    //Setear el token a null
    userBDD.token = null
    //Cambiar el confiEmail a true
    userBDD.confirmEmail=true
    //Guardar en BDD
    await userBDD.save()
    //Mensaje de respuesta
    res.send('Token confirmado, ya puedes iniciar sesión');
}

//Presentar el formulario para el registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
//Capturar los datos del formulario y guardar en BDD
const registerNewUser = async(req,res)=>{
    
    const{name,email,password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    const newUser = await new User({name,email,password,confirmpassword})
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    //Enviar el correo
    sendMailToUser(email,token)
    newUser.save()
    res.redirect('/user/login')
}

//Presentar formulario para el login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
//Capturar los datos del formulario y hacer el login BDD
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}

