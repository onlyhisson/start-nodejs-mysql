require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
  require("@babel/register");
}

const baseDbSetting = {
  timezone: "+09:00",
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timestamps: true,
  },
};

module.exports = {
  production: {
    ...baseDbSetting,
    logging: false,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
  },
  development: {
    ...baseDbSetting,
    logging: true,
    database: process.env.DB_NAME_DEV,
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PW_DEV,
    host: process.env.DB_HOST_DEV,
  },
};
