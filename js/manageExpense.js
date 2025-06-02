
// add Expenses Section
const expensesForm = document.getElementById("expenseForm")

expensesForm.addEventListener("submit", e => {
    e.preventDefault()

    const title = document.getElementById("title")
    const amount = document.getElementById("amount")
    const date = document.getElementById("date")
    const category = document.getElementById("category")
    const notes = document.getElementById("notes")
    let expens;

    // console.log(`title: ${title.value} \namount: ${amount.value} \ndate: ${date.value} \ncategory: ${category.value} \nnotes: ${notes.value}`)
    if(localStorage.getItem("isLoggedIn")){
        expens = JSON.parse(localStorage.getItem("expens")) || []
    }else{
        expens = JSON.parse(sessionStorage.getItem("expens")) || []
    }

    console.log(expens)

    let data = {
        "title": title.value,
        "amount": amount.value,
        "date": date.value,
        "category": category.value,
        "notes": notes.value ? notes.value : "-"
    }
    console.log(data)

    expens.push(data)

    if(localStorage.getItem("isLoggedIn")){
        expens = localStorage.setItem("expens", JSON.stringify(expens))
        console.log(localStorage.getItem("expens"))
    }else{
        expens = sessionStorage.setItem("expens", JSON.stringify(expens))
        console.log(sessionStorage.getItem("expens"))
    }

    title.value = ""
    amount.value = ""
    date.value = ""
    category.value = ""
    notes.value = ""

    

})