let btnDeposit = document.getElementById("btnDeposit")
let btnSendMoney = document.getElementById("btnSendMoney")
let btnTransactions = document.getElementById("btnTransactions")

let depositAmount = document.getElementById("depositAmount")
let totalMoney = document.getElementById("totalMoney")
let btnDepositMoney = document.getElementById("btnDepositMoney")

if(btnDeposit) {
    btnDeposit.addEventListener("click", function (e) {
        e.preventDefault()
        
        alert("Redirigiendo a depositar")
        window.location.href = "deposit.html"
    })
}

if(btnSendMoney) {
    btnSendMoney.addEventListener("click", function (e) {
        e.preventDefault()

        alert("Redirigiendo a enviar dinero")
        window.location.href = "sendmoney.html"
    })
}

if(btnTransactions) {
    btnTransactions.addEventListener("click", function (e) {
        e.preventDefault()

        alert("Redirigiendo a últimos movimientos")
        window.location.href = "transactions.html"
    })
}

if(btnDepositMoney) {
    btnDepositMoney.addEventListener("click", function (e) {
        e.preventDefault()

        if (!depositAmount) return

        let amount = parseInt(depositAmount.value)
        if (isNaN(amount) || amount <= 0) return

        let total = parseInt(localStorage.getItem("totalMoney")) || 0
        total += amount

        localStorage.setItem("totalMoney", total)
        depositAmount.value = ""
        alert("Dinero depositado")
    })
}

if (totalMoney) {
    let storedTotal = localStorage.getItem("totalMoney")

    if(storedTotal === null) {
        let initialTotal = 60000
        localStorage.setItem("totalMoney", initialTotal)
    } else {
        totalMoney.innerText = storedTotal
    }
}