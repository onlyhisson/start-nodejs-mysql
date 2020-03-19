'use strict'

//import bcrypt from 'bcrypt'
//import { generate } from '../utils/uid.util'

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        title: {  // 게시글 제목
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        subTitle: {  // 게시글 제목
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        postContent: {  // 게시글 내용
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        fileUrl: {      // 게시글 이미지 경로
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })

    return Post;
}