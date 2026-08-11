import dotenv from 'dotenv';
dotenv.config();
import connect from './src/db/db.js';
import server from './src/app.js';

connect();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("🚀 Server is running on port: " + PORT);
});