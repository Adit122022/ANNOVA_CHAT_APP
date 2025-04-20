import dotenv from 'dotenv';
dotenv.config();
import connect from './src/db/db.js';
import server from './src/app.js';

connect();

server.listen(process.env.PORT, ()=>{
    console.log('Server is running on port : ' + process.env.PORT);
})