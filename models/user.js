'use strict'

//import bcrypt from 'bcrypt'
//import { generate } from '../utils/uid.util'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {

        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        avatarUrl: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        facebookId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        githubId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {  // 세번째 인자는 테이블 옵션
        timestamps: true,   // true 시 createdAt, updatedAt 컬럼추가, 자동 입력된다.
        paranoid: true,     // true 시 deletedAt 컬럼추가, 자동 입력된다. timestamps: true여야 한다. 실제 삭제되지 않으나 find() 시 제외된다.
        // underscored      // ex createdAt => created_at
        // freezeTableName  // 첫번째 인자(여기서는 user)를 복수형으로 만들어 테이블 이름으로 사용하지 않는다.
        // tableName        // 테이블 이름 설정
        // comment          // 테이블 주석
    })

    return User;
}