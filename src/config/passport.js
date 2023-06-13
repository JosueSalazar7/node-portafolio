//Importacion de passport
const passport = require('passport')
//Importr el modelo user
const User = require('../models/User')
//Definición de la estrategia
const LocalStrategy = require('passport-local').Strategy
//Configuración de la estrategia
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    //Traer usuario en base al email
    const userBDD = await User.findOne({email})
    //Validacion del usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //Validación de las constraseñas
    const passwordUser = await userBDD.matchPassword(password)
    //Validación del password del formulario vs el de la BDDf                  
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    return done(null,userBDD)
}))
//Serializacion del usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//Deserializacion del usuario
passport.deserializeUser(async (id, done) => {
    //Traer el usuario en base al id de la session 
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});