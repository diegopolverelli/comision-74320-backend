import { UsersDTO } from "./dto/usersDTO.js"

const userRequest={
    nombre:"Juan",
    apellido:"Lopez",
    correo:"jlopez@test.com"
}

const userDB=new UsersDTO(userRequest) 

console.log(userDB)

// jsonwebtoken jwt.sign(usuario, "CoderCoder123", {ExpiresIn:"1h"})
console.log({...userDB})