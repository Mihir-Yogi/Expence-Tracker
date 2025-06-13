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
        localStorage.removeItem("showSectionStatus")
        localStorage.removeItem("budget")
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
    loadChart();
    document.body.classList.contains("dark-mode") ? localStorage.setItem("darkMode","enabled") : localStorage.setItem("darkMode","disabled")
})

const profile = document.getElementById("profile")
const menu = document.getElementById("menuList")

profile.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.toggle("active")
})

document.getElementById("profileBtn").addEventListener("click", e => {
    window.location.href = "Components/profile.html"
})

window.addEventListener("DOMContentLoaded", e => {
    loadChart()
    checkBudgetExists()
    setTimeout(()=>{
        document.getElementById("loader").style.display = "none"
    },2000)
})


// Main Dashboard script

const totalSpent = document.getElementById("totalSpentPrice")
const remainingPrice = document.getElementById("remainingPrice")
const budgetContainer = document.getElementById("budget-container")

// const totalExpense = (currentUser,users) => {
//     let expens = currentUser.expens
//     console.log()
// }
// totalExpense()

const checkBudgetExists = () => {
    const budget = localStorage.getItem("budget")
    if(budget){
        budgetContainer.innerHTML = `
            <span class="toatalSDisplay" id="budgetPriceText">₹${parseInt(budget).toLocaleString('en-IN')}</span>
            <button id="editBudgetBtn"><i class="fa-solid fa-pen"></i> Edit</button>
            `
        getPriceDetails(budget)

        document.getElementById("editBudgetBtn").addEventListener("click", e => {
            budgetContainer.innerHTML = ""
            budgetContainer.innerHTML = `<input type="number" id="budgetPrice" placeholder="Enter Your Budget" value=${budget}> <button id="budgetBtn"><i class="fa-solid fa-plus"></i>Add</button>`
            
            const budgetBtn = document.getElementById("budgetBtn")  
            budgetBtn.addEventListener("click", e => {
                const budgetPrice = document.getElementById("budgetPrice").value
                localStorage.setItem("budget",budgetPrice)
                checkBudgetExists()
            })
        })
        
    }else{
        budgetContainer.innerHTML = `<input type="number" id="budgetPrice" placeholder="Add Budget" /> <button id="budgetBtn"><i class="fa-solid fa-plus"></i> Add</button>`
        getPriceDetails(budget)
        
        const budgetBtn = document.getElementById("budgetBtn")  
        budgetBtn.addEventListener("click", e => {
            const budgetPrice = document.getElementById("budgetPrice").value
            localStorage.setItem("budget",budgetPrice)
            checkBudgetExists()
        })
    }
}

const getPriceDetails = (budget) => {
    let totalS = Number(user.totalSpent) || 0
    totalSpent.textContent = `₹${totalS.toLocaleString("en-IN")}`
    const numericBudget = Number(budget) || 0
    const remaining = numericBudget - totalS
    remainingPrice.textContent = `₹${remaining.toLocaleString('en-IN')}`
}


const hamburger = document.getElementById('hamburger');
const sideNav = document.querySelector('.sideNav');

hamburger.addEventListener('click', () => {
  sideNav.classList.toggle('open');
});

document.addEventListener('click', function (event) {
if (
    !sideNav.contains(event.target) &&
    !hamburger.contains(event.target) &&
    !menu.contains(event.target) &&
    !profile.contains(event.target)
) {
    sideNav.classList.remove('open');
    menu.classList.remove("active");
}
});

