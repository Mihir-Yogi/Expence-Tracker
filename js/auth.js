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

    const checkPassMatch = () => {
        isMatch = password.value === cPassword.value
        if(isMatch){
            cError.textContent = ""
        }else{
            cError.textContent = "Password dose not matched!"
        }
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
        }else{
            emailError.textContent = ""
        }
        if(password.value == "" || password.value.length < 6){
            passError.textContent = "Enter Password upto 6 letters!"
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
                    userName : "",
                    email : "",
                    password : ""
                } 
                user.userName = fullName.value.trim()
                user.email = email.value.trim()
                user.password = hash // ⚠️ NOTE: In real-world apps, never store plain passwords like this!
                let users = JSON.parse(localStorage.getItem("users")) || [] 
                users.push(user)
                localStorage.setItem("users",JSON.stringify(users))
                e.target.submit()
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
    let users = JSON.parse(localStorage.getItem("users"))
    console.log(JSON.stringify(users))
loginform.addEventListener("submit", e => {
    e.preventDefault()

    const email = document.getElementById("email")
    const loginPassword = document.getElementById("loginPassword")
    const textError = document.getElementById("textError")
    const usernotFoundErr = document.querySelector("h4")

    let isValidForm = true

    let user = users.find(u => u.email === email.value.trim())
    console.log(user)

    if(!user){
        usernotFoundErr.textContent = "User Not Found"
    }

    bcrypt.compare(user.password,loginPassword,function(err,ismatch){
        if(err){
            console.log("password Matching Error!",err)
            return;
        }


    })

    isValidForm ? console.log("Login Successfull"): console.log(isEmailMatched)    
})
}