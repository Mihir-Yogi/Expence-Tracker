//Signup page auth

const signUpForm = document.getElementById("signupForm")
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

if(signUpForm){
    const fullName = document.getElementById("fullName")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const cPassword = document.getElementById("cPassword")
    const cError = document.getElementById("error")
    const fullNError = document.getElementById("fullNError")
    const emailError = document.getElementById("emailError")
    const passError = document.getElementById("pError")

    let isMatch = false
    let users = JSON.parse(localStorage.getItem("users"))
    const checkPassMatch = () => {
        isMatch = password.value === cPassword.value
        if(isMatch){
            cError.textContent = ""
        }else{
            cError.textContent = "Password dose not matched!"
        }
    }

    const checkEmailExists = (email) => {
        return users ? users.some(u => u.email === email) : false;
    }
    cPassword.addEventListener("input", checkPassMatch)
    password.addEventListener("input", checkPassMatch)

    signUpForm.addEventListener("submit", e => {
        e.preventDefault()

        const isValidEmail = regex.test(email.value.trim())
        let isValidForm = true

        if(fullName.value.trim() == ""){
            fullNError.textContent = "Enter Your Full Name!"
            isValidForm = false
        }else{
            fullNError.textContent = ""
        }
        if(email.value.trim() == "" || !isValidEmail){
            emailError.textContent = "Please Enter Valid Email id!"
            isValidForm = false
        }else if(checkEmailExists(email.value.trim())){
            emailError.innerHTML = "this email alerady exists in records please Login to continue"
            isValidEmail = false
        }else{
            emailError.textContent = ""
        }
        if(password.value == "" || password.value.length < 6){
            passError.textContent = "Password must be at least 6 characters!"
            isValidForm = false
        }else{
            passError.textContent = ""
        }
        if(cPassword.value == "" || !isMatch){
            cError.textContent = "Password do not matched!"
            isValidForm = false
        }else{
            cError.textContent = ""
        }

        if(isValidForm){
            const saltRounds = 10
            dcodeIO.bcrypt.hash(password.value,saltRounds,function(err,hash){
                if(err){
                    console.log("password hashing error!",err);
                    return;
                }
                    const user = {
                    username : "",
                    email : "",
                    password : "",
                } 
                user.username = fullName.value.trim()
                user.email = email.value.trim()
                user.password = hash // ⚠️ NOTE: In real-world apps, never store plain passwords like this!
                if (!Array.isArray(users)) {
                    users = [] 
                }
                console.log(users)  
                users.push(user)
                localStorage.setItem("users",JSON.stringify(users))
                window.location.href = "login.html"
                signUpForm.reset();
            })
        }else{
            alert("Form is Invalid!")
        }


    })
}

// Login page auth
const loginform = document.getElementById("loginForm")
if(loginform){
    
    loginform.addEventListener("submit", e => {
        e.preventDefault()
        let users = JSON.parse(localStorage.getItem("users"))

        const email = document.getElementById("email")
        const loginPassword = document.getElementById("loginPassword")
        const textError = document.getElementById("textError")
        const usernotFoundErr = document.querySelector("h4")
        const passwordError = document.getElementById("passError")
        const remember = document.getElementById("rememberMe")

        const isValidEmail = regex.test(email.value.trim())

        let isValidForm = true

        let user = {}

        if(email.value == "" || !isValidEmail){
            textError.textContent = "Enter Valid Email!"
            isValidForm = false
        }else if(!users){
            usernotFoundErr.textContent = "User Not Found"
            return;
        }else{
            textError.textContent = ""
            user = users.find(u => u.email === email.value.trim())
        }
        
        if(!user){
            usernotFoundErr.textContent = "User Not Found"
            return;
        }

        dcodeIO.bcrypt.compare(loginPassword.value,user.password,function(err,ismatch){
            if(err){
                console.log("password Matching Error!",err)
                return;
            }

            if(!ismatch){
                passwordError.textContent = "invalid Password!"
                isValidForm = false
            }else{
                passwordError.textContent = ""
            }

            if(isValidForm){
                console.log(remember.checked)
                if(remember.checked){
                    localStorage.setItem("isLoggedIn","true")
                    localStorage.setItem("currentUser",JSON.stringify(user))
                }else{
                    sessionStorage.setItem("isLoggedIn","true")
                    sessionStorage.setItem("currentUser",JSON.stringify(user))
                }
                window.location.href = "index.html"
                loginform.reset()
            }
        })

    })
}
const passResetForm = document.getElementById("passResetForm")
if(passResetForm){
    
    const mail = document.getElementById("resetEmail")
    const checkMailBtn = document.getElementById("checkEmail")
    const container = document.getElementById("container")
    let users =JSON.parse(localStorage.getItem("users"))
    let found;
    checkMailBtn.addEventListener("click", e => {
        e.preventDefault()
    
        document.getElementById("textError").textContent = ""

        found = users.find(u => u.email === mail.value.trim())
        
        if(found){
            if(!document.getElementById("newPassword")){
                let input  = document.createElement("input")
                input.type = "password"
                input.id = "newPassword"

                let p = document.createElement("p")
                p.id = "passError"

                container.append(input,p)
            }
        }else{
            document.getElementById("textError").textContent = "Email not Found!"
        }
    })
    
    async function encriptionPassword (password,saltLenght) {
        return new Promise((resolve,reject) => {
            dcodeIO.bcrypt.hash(password,saltLenght,function(err,hash){
                    if(err){
                        reject("Hashing Error: " + err)
                    }else{
                        resolve(hash)
                    }
                })
        })
    }
    
    passResetForm.addEventListener("submit", async e => {
        e.preventDefault()
        const newPass = document.getElementById("newPassword")
        const passError = document.getElementById("passError")
        const success = document.getElementById("success")
        
        passError.textContent = ""
        success.innerHTML = ""

        if(newPass){
            if(found){
                let flag = true
                let userIndex = users.findIndex(u => u.email === found.email)
                if(newPass.value.length < 6){
                    passError.textContent = "Password must be at least 6 characters"
                    flag = false
                }else{
                    try{
                        const hashpass = await encriptionPassword(newPass.value,10);
                        users[userIndex].password = hashpass
                    }catch(err){
                        console.log(err)
                        flag = false
                    }
                    if(flag){
                        localStorage.setItem("users", JSON.stringify(users))
                        success.innerHTML = "Password Successfully changed. Please login."
                        success.style.visibility = "visible"
                        newPass.remove()
                        mail.value = ""
                        setTimeout(() => {
                            window.location.href = "../../login.html"
                        }, 2000);
                    }else{
                        console.log("Invalid Email")
                    }
                }
            }else{
                console.log("Enter Valid Email")
        }
    }
})

document.getElementById("backBtn").addEventListener("click", e => {
    window.location.href = "../../login.html"
})
}
