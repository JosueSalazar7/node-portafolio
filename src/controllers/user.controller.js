const passport = require("passport")
const User = require('../models/User')
//Presentar el formulario para el registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
//Capturar los datos del formulario y guardar en BDD
const registerNewUser = async(req,res)=>{
    //Desustructurar los datos del formulario
    const{name,email,password,confirmpassword} = req.body
    //Validar si todos los campos estan llenos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //Verificacion de contraseñas, si son iguales
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //Traer el usurio en base al email
    const userBDD = await User.findOne({email})
    //Verificar si el email ya esta registrado
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //Guardar el registro en la BDD
    const newUser = await new User({name,email,password,confirmpassword})
    //Encriptar el password
    newUser.password = await newUser.encrypPassword(password)
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
    logoutUser
}

