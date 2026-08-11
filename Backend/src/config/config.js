const _config = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

const config = Object.freeze(_config);
export default config;
