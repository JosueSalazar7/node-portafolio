
const {Router} = require('express')

const router = Router()
const {renderIndex,renderLogin} = require('../controllers/index.controllers.js')

//server
router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})
//controladores
router.get('/',renderIndex)
router.get('/login',renderLogin)



module.exports = router