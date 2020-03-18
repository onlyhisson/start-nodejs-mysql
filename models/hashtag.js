'use strict'

//import bcrypt from 'bcrypt'
//import { generate } from '../utils/uid.util'

module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('hashtag', {
        title: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })

    return Hashtag;
}