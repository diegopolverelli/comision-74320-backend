const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")

const btnLogin=document.getElementById("btnLogin")

btnLogin.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()

    if(email.length==0 || password.length==0){
        alert("Complete datos!")
        return 
    }

    let response=await fetch("/login", {
        method:"post", 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    })

    let datos=await response.json()
    if(response.status>=400){
        alert("Error al autenticar...")
        return 
    }

    alert("Login exitoso...!!!")
    localStorage.setItem("token", datos.token)
})

const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    let response=await fetch("/usuario", {
        headers:{
            "AUthorization":`BEARER ${localStorage.getItem("token")}`
        }
    })

    let datos=await response.json()

    if(response.status>=400){
        divDatos.textContent=`Error: ${datos.error}`
        return 
    }else{
        divDatos.textContent=`${datos.mensaje}`
    }


})
