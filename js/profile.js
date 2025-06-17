const isLoggedIn = localStorage.getItem("isLoggedIn") == "true" || sessionStorage.getItem("isLoggedIn")
if(!isLoggedIn){
    window.location.href = "../../login.html"
}

const backBtn = document.getElementById("backBtn")

if(localStorage.getItem("darkMode") === "enabled"){
    document.body.classList.add("dark-mode")
}   

backBtn.addEventListener("click", e => {
    window.location.href = "../../index.html"
})

const editForm = document.getElementById("editForm")
const username = document.getElementById("username")
const password = document.getElementById("editPassword")
const passError = document.getElementById("passError")
const success = document.getElementById("success")

let userData = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
let user = JSON.parse(userData)
console.log(user)
username.value = user.username

async function encriptionPassword (password,saltLenght) {
    return new Promise((resolve,reject) => {
        dcodeIO.bcrypt.hash(password,saltLenght,function(err,hash){
                if(err){
                    reject("Hashing Error: ",err)
                }else{
                    resolve(hash)
                }
            })
    })
}

editForm.addEventListener("submit", async e => {
    e.preventDefault()

    user.username = username.value

    if(password.value && password.value < 6){
        passError.textContent = "Password must be at least 6 characters"
    }else{
        const saltLenght = 10
        try{
            const hashpass =await encriptionPassword(password.value,saltLenght);
            user.password = hashpass
        }catch(err){
            console.log(err)
        }
    }

    if(localStorage.getItem("isLoggedIn")){
        localStorage.setItem("currentUser",JSON.stringify(user))
    }else{
        sessionStorage.setItem("currentUser",JSON.stringify(user))
    }
    let users = JSON.parse(localStorage.getItem("users")) || []
    let userIndex =  users.findIndex(u => u.email == user.email)
    console.log(users)
    if(userIndex > -1){
        console.log(users)
        users[userIndex] = user
        localStorage.setItem("users",JSON.stringify(users))
    }else{
        alert("User Details not Updated, User not found!")
    }

    success.textContent = "User Details Updated!"
    password.value = ""
})
