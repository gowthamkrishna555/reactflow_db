"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize_2 = require("../lib/sequelize");
var Node = sequelize_2.sequelize.define("Node", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    label: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    position_x: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    position_y: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "#1976d2",
    },
});
exports.default = Node;
