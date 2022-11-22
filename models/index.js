"use strict";

import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../configs/sequelize.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

db.User.hasMany(db.Post); // 1:N 관계
db.Post.belongsTo(db.User); // hasMany 반대, N:1 관계

// N:M 관계, 새로운 모델(PostHashtag)이 생성, 두 테이블의 아이디가 저장
db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });

db.User.belongsToMany(db.User, {
  foreignKey: "followingId", // 외래키
  as: "Followers", // 새로운 모델(Followers)이 생성
  through: "Follow",
});
db.User.belongsToMany(db.User, {
  foreignKey: "followerId",
  as: "Followings",
  through: "Follow",
});

module.exports = db;
