const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log('The app is listening on ', port);
    console.log(process.env.APP_NAME);
})