
// add Expenses Section
const expensesForm = document.getElementById("expenseForm")

expensesForm.addEventListener("submit", e => {
    e.preventDefault()
    
    const title = document.getElementById("title")
    const amount = document.getElementById("amount")
    const date = document.getElementById("date")
    const category = document.getElementById("category")
    const notes = document.getElementById("notes")
    
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()+1
    const day = currentDate.getDay()+1

    const autoDate = `${year}-${month}-${day}`
    
    let users = JSON.parse(localStorage.getItem("users"))
    let currentUser;
    if(localStorage.getItem("isLoggedIn")){
        currentUser = JSON.parse(localStorage.getItem("currentUser"))
    }else{
        currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    }
    let userIndex = users.findIndex(u => u.email == currentUser.email)

    if(!currentUser.expens){
        currentUser.expens = (users[userIndex].expens)
    }
    // console.log(`title: ${title.value} \namount: ${amount.value} \ndate: ${date.value} \ncategory: ${category.value} \nnotes: ${notes.value}`)
    
    let expens = currentUser.expens || []

    console.log(expens)

    let data = {
        "title": title.value,
        "amount": amount.value,
        "date": date.value ? date.value : autoDate,
        "category": category.value,
        "notes": notes.value ? notes.value : "-"
    }
    console.log(data)

    expens.push(data)


    currentUser.expens = expens
    // console.log(currentUser)
    users[userIndex] = currentUser
    if(localStorage.getItem("isLoggedIn")){
        localStorage.setItem("currentUser",JSON.stringify(currentUser))
    }else{
        sessionStorage.setItem("currentUser",JSON.stringify(currentUser))
    }
    localStorage.setItem("users",JSON.stringify(users))
    title.value = ""
    amount.value = ""
    date.value = ""
    category.value = ""
    notes.value = ""

})


// show Expenses

