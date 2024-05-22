"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var UsersData = /** @class */ (function () {
    function UsersData(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = 0;
    }
    return UsersData;
}());
var UserInst = /** @class */ (function (_super) {
    __extends(UserInst, _super);
    function UserInst(nome, email, senha, cnpj) {
        var _this = _super.call(this, nome, email, senha) || this;
        _this.tipo = 0;
        _this.cnpj = cnpj;
        return _this;
    }
    return UserInst;
}(UsersData));
var UserUser = /** @class */ (function (_super) {
    __extends(UserUser, _super);
    function UserUser(nome, email, senha) {
        var _this = _super.call(this, nome, email, senha) || this;
        _this.tipo = 1;
        return _this;
    }
    return UserUser;
}(UsersData));
function createUser(JSONData) {
    if (JSONData["tipo"] == 0) {
        return new UserInst(JSONData["nome"], JSONData["email"], JSONData["senha"], JSONData["cnpj"]);
    }
    else {
        return new UserUser(JSONData["nome"], JSONData["email"], JSONData["senha"]);
    }
}
function setUsers(user) {
    var users = getUsers();
    users.push(user);
    var usersJSON = JSON.stringify(users);
    (0, fs_1.writeFileSync)("src/UsersData/Users.json", usersJSON, { flag: "w" });
}
function getUsers() {
    var users = [];
    var inbytes = (0, fs_1.readFileSync)("src/UsersData/Users.json", { flag: "r" });
    var textDecoder = new TextDecoder();
    var resultJSON = textDecoder.decode(inbytes);
    var result = JSON.parse(resultJSON);
    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
        var objeto = result_1[_i];
        users.push(createUser(objeto));
    }
    return users;
}
var usuario = new UserInst("Instituicao", "instituicao@gmail.com", "senha123", "123456789-10");
setUsers(usuario);
