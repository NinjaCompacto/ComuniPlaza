
import { writeFileSync, readFileSync } from "fs";

abstract class UsersData{
    nome:string
    email:string
    senha:string
    tipo:number

    constructor(nome:string, email:string, senha:string){
        this.nome = nome
        this.email = email
        this.senha = senha
        this.tipo = 0
    }
}

class UserInst extends UsersData{
    cnpj:string

    constructor(nome:string, email:string, senha:string, cnpj:string){
       super(nome, email, senha)
       this.tipo = 0
       this.cnpj = cnpj
    }
}

class UserUser extends UsersData{
    data:Date

    constructor(nome:string, email:string, senha:string){
        super(nome, email, senha)
        this.tipo = 1
    }
}

function createUser(JSONData){
    if (JSONData["tipo"] == 0){
        return new UserInst(JSONData["nome"], JSONData["email"], JSONData["senha"], JSONData["cnpj"])
    }else{
        return new UserUser(JSONData["nome"], JSONData["email"], JSONData["senha"])
    }
}

function setUsers(user: UsersData){
    var users = getUsers()
    for(let olds of users){
        if(user.email == olds.email){
            return "Impossivel criar, usuário com este email ja cadastrado"
        }
    }
    users.push(user)
    let usersJSON = JSON.stringify(users)
    writeFileSync("src/UsersData/Users.json", usersJSON, {flag: "w"})
    return "Usuario criado com sucesso"
}

function getUsers(){
    var users = []
    var inbytes = readFileSync("src/UsersData/Users.json", {flag: "r"})
    let textDecoder = new TextDecoder();
    let resultJSON = textDecoder.decode(inbytes)
    let result = JSON.parse(resultJSON)
    for(let objeto of result){
        users.push(createUser(objeto))
    }
    return users
}

function validaUsers(email: string, senha: string){
    for(let user of getUsers()){
        if(user.email == email){
            return [user.senha === senha, user]
        }
    }
    return [false]
}

var usuario = new UserInst("Instituicao", "instituicao@gmail.com", "senha123", "123456789-10")
setUsers(usuario)



