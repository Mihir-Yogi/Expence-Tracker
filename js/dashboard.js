const isLoggedIn = localStorage.getItem("isLoggedIn") == "true" || sessionStorage.getItem("isLoggedIn")
if(!isLoggedIn){
    window.location.href = "login.html"
}

const profilegreet = document.getElementById("welcomeText")
const homeGreet = document.getElementById("homeGreet")
const logoutBtn = document.getElementById("logoutbtn")

let user = JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(sessionStorage.getItem("currentUser"))
if(user || user.username){
    profilegreet.textContent = user.username 
    homeGreet.textContent = user.username
}else{
    profilegreet.textContent = "User"
    homeGreet.textContent = "User"
}

if(logoutBtn){
    logoutBtn.addEventListener("click", e => {
    if(confirm("Are you sure you want to log out?")){
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("darkMode")
        sessionStorage.removeItem("isLoggedIn")
        sessionStorage.removeItem("currentUser")
        sessionStorage.removeItem("darkMode")
        window.location.href = "login.html"
    }
})
}

if(localStorage.getItem("darkMode") === "enabled"){
    document.body.classList.add("dark-mode")
}

const darkToggle = document.getElementById("darktoggle")
let currentStatus = localStorage.getItem("darkMode")
if(currentStatus === "enabled"){
    darkToggle.checked = true    
}
darkToggle.addEventListener("click", e => {
    document.body.classList.toggle("dark-mode")
        document.body.classList.contains("dark-mode") ? localStorage.setItem("darkMode","enabled") : localStorage.setItem("darkMode","disabled")
    
})

const profile = document.getElementById("profile")
const menu = document.getElementById("menuList")

profile.addEventListener("click", e => {
    menu.classList.toggle("active")
})

document.getElementById("profileBtn").addEventListener("click", e => {
    window.location.href = "Components/profile.html"
})

// Show Main section 

const dashboardTab = document.getElementById("dashboardTab")
const addExpenseTab = document.getElementById("addExpenseTab")
const showExpenseTab = document.getElementById("showExpenseTab")

const dashboardSection = document.getElementById("dashboardSection")
const addExpenseSection = document.getElementById("addExpenseSection")
const showExpenseSection = document.getElementById("showExpenseSection")

const showSection = showSec => {
    dashboardSection.style.display = "none"
    addExpenseSection.style.display = "none"
    showExpenseSection.style.display = "none"
    
    showSec.style.display = "block"
}

dashboardTab.addEventListener("click", e => {
    showSection(dashboardSection)
})

addExpenseTab.addEventListener("click", e => {
    showSection(addExpenseSection)
})

showExpenseTab.addEventListener("click", e => {
    showSection(showExpenseSection)
})

window.addEventListener("DOMContentLoaded", e => {
    showSection(dashboardSection)
})

