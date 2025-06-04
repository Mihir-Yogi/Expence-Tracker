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

const currentUser = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("currentUser")) : JSON.parse(sessionStorage.getItem("currentUser"))
dashboardTab.addEventListener("click", e => {
    document.getElementById("totalSpentPrice").textContent = `₹${currentUser.totalSpent}`
    loadChart();
    showSection(dashboardSection)
    localStorage.setItem("showSectionStatus","dashboard")
})

addExpenseTab.addEventListener("click", e => {
    loadChart();
    clearForm()
    showSection(addExpenseSection)
    localStorage.setItem("showSectionStatus","addExpense")
    backBtnWork()
})

const showList = () => {
    loadChart();
    const tbody = document.getElementById("tableBody")
    tbody.textContent = ""
    // console.log(currentUser)
    const expens = currentUser.expens || []
    // console.log(expens)
    const keyOrder = ['index','title','amount','date','category','notes','edit','delete']
    expens.forEach((e,i) => {
        const tr = document.createElement("tr")
        keyOrder.forEach(key => {
            const td = document.createElement("td")

            switch(key){
                case "index":
                    td.textContent = i+1
                    break;
                case "edit":
                    td.innerHTML = `<button class='edBtn editBtn' data-id=${i}><i class='icon fa-solid fa-pen-to-square'></i></button>`
                    break;
                case "delete":
                    td.innerHTML = `<button class='edBtn deleteBtn' data-id=${i}><i class='icon fa-solid fa-trash'></i></button>`
                    break;
                default:
                    td.textContent = e[key] || ""
            }

            tr.appendChild(td)
        })
        // console.log(tr)
        tbody.appendChild(tr)
    })
}

showExpenseTab.addEventListener("click", e => {
    clearForm()
    showSection(showExpenseSection)
    localStorage.setItem("showSectionStatus","showExpense")
    backBtnWork()
    showList()
})

const clearForm = () => {
    document.getElementById("title").value = ""
    document.getElementById("amount").value = ""
    document.getElementById("date").value = ""
    document.getElementById("category").value = ""
    document.getElementById("notes").value = ""
    document.getElementById("success").value = ""
}

window.addEventListener("DOMContentLoaded", e => {
    checkBudgetExists()
    if(localStorage.getItem("showSectionStatus")){
        switch(localStorage.getItem("showSectionStatus")){
            case "dashboard":
                showSection(dashboardSection)
                break;
            case "addExpense":
                showSection(addExpenseSection)
                backBtnWork()
                break;
            case "showExpense":
                showSection(showExpenseSection)
                backBtnWork()
                showList()

                break;
            default:
                showSection(dashboardSection)
                
            }
    }else{
        showSection(dashboardSection)
        localStorage.setItem("showSectionStatus","dashboard")
    }
})

// add Expenses Section
const expensesForm = document.getElementById("expenseForm")
let users = JSON.parse(localStorage.getItem("users"))

let userIndex = users.findIndex(u => u.email == currentUser.email)

const updateTotalExpense = (thiscurrentUser,thisusers) =>{
    let amountsArr = thiscurrentUser.expens.map(e => parseInt(e.amount))
    let total = amountsArr.reduce((acc,e)=> acc + e ,0)
    // console.log(total)
    thiscurrentUser.totalSpent = total
    // console.log(currentUser)
    thisusers[userIndex] = thiscurrentUser
    if(localStorage.getItem("isLoggedIn")){
        localStorage.setItem("currentUser",JSON.stringify(thiscurrentUser))
    }else{
        sessionStorage.setItem("currentUser",JSON.stringify(thiscurrentUser))
    }
    localStorage.setItem("users",JSON.stringify(thisusers))
}
expensesForm.addEventListener("submit", e => {
    e.preventDefault()
    
    const title = document.getElementById("title")
    const amount = document.getElementById("amount")
    const date = document.getElementById("date")
    const category = document.getElementById("category")
    const notes = document.getElementById("notes")
    const successMessage = document.getElementById("success")
    
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()+1
    const day = currentDate.getDay()+1

    const autoDate = `${year}-${month}-${day}`

    if(!currentUser.expens){
        currentUser.expens = (users[userIndex].expens)
    }
    // console.log(`title: ${title.value} \namount: ${amount.value} \ndate: ${date.value} \ncategory: ${category.value} \nnotes: ${notes.value}`)

    let expens = currentUser.expens || []


    // console.log(expens)
    const index = expensesForm.dataset.editing;
    let data = {
        "title": title.value.trim(),
        "amount": amount.value.trim(),
        "date": date.value ? date.value : autoDate,
        "category": category.value.trim(),
        "notes": notes.value.trim() || "-",
    }
    // console.log(data)

    if (index !== undefined) {
        expens[index] = data;
        delete expensesForm.dataset.editing;
    } else {
        expens.push(data);
    }
    currentUser.expens = expens

    // currentUser.expens = expens
    // let amountsArr = currentUser.expens.map(e => parseInt(e.amount))
    // let total = amountsArr.reduce((acc,e)=> acc + e ,0)
    // // console.log(total)
    // currentUser.totalSpent = total
    // // console.log(currentUser)
    // users[userIndex] = currentUser
    // if(localStorage.getItem("isLoggedIn")){
    //     localStorage.setItem("currentUser",JSON.stringify(currentUser))
    // }else{
    //     sessionStorage.setItem("currentUser",JSON.stringify(currentUser))
    // }
    // localStorage.setItem("users",JSON.stringify(users))
    updateTotalExpense(currentUser,users)
    title.value = ""
    amount.value = ""
    date.value = ""
    category.value = ""
    notes.value = ""

    successMessage.textContent = "Record Stored successfully"
    success.style.visibility = "visible"
    setTimeout(() => {
        successMessage.textContent = ""
        success.style.visibility = "hidden"
        if(index){
            document.getElementById("addExpenseSection").style.display = "none"
        }
        showList()
    }, 1500);
})



const editExpense = index => {
    const currentUser = localStorage.getItem("isLoggedIn")
                        ? JSON.parse(localStorage.getItem("currentUser"))
                        : JSON.parse(sessionStorage.getItem("currentUser"))

    const expense = currentUser.expens[index]
    // console.log(expense)
    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    const dateInput = document.getElementById("date");
    const isoDate = new Date(expense.date).toISOString().split("T")[0]; // "YYYY-MM-DD"
    dateInput.value = isoDate;
    document.getElementById("category").value = expense.category;
    document.getElementById("notes").value = expense.notes;

    document.getElementById("addExpenseSection").style.display = "block"
    document.getElementById("expenseForm").dataset.editing = index;

}

document.getElementById("tableBody").addEventListener("click", e => {
    const editBtn = e.target.closest(".editBtn");
    if (editBtn) {
        const rowIndex = parseInt(editBtn.dataset.id);
        if (!isNaN(rowIndex)) {
            editExpense(rowIndex);
        }
    }

    const deleteBtn = e.target.closest(".deleteBtn");
    if(deleteBtn) {
        const rowIndex = parseInt(deleteBtn.dataset.id)
        console.log(currentUser.expens)
        if(!isNaN(rowIndex)){  
            currentUser.expens.splice(rowIndex, 1);
                if(localStorage.getItem("isLoggedIn")){
                    localStorage.setItem("currentUser",JSON.stringify(currentUser))
                }else{
                    sessionStorage.setItem("currentUser",JSON.stringify(currentUser))
                }
                users[userIndex] = currentUser
                localStorage.setItem("users",JSON.stringify(users))
                showList()
                document.getElementById("addExpenseSection").style.display = "none"
                clearForm()
                updateTotalExpense(currentUser,users)
                checkBudgetExists()
                loadChart()
        }
    }

})

const backBtn = document.getElementById("backBtn")
const backBtnWork = () => {
    
    if(localStorage.getItem("showSectionStatus") == "addExpense"){
        backBtn.style.display = "none"
    }else{
        backBtn.style.display = "block"
            backBtn.addEventListener("click", e => {
                document.getElementById("addExpenseSection").style.display = "none"
            })
    }
}

