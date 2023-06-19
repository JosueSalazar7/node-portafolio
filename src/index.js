require('dotenv').config();
//const app = require('./server.js')

// app.listen(3000,()=>{
//     console.log(`Server on port ${3000}`);
// })

const app = require('./server.js')
const connection = require('./database.js')
connection()
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})