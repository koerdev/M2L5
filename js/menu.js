let btnDeposit = document.getElementById("btnDeposit")
let btnSendMoney = document.getElementById("btnSendMoney")
let btnTransactions = document.getElementById("btnTransactions")

btnDeposit.addEventListener("click", function (e) {
    e.preventDefault()
    alert("Redirigiendo a depositar")
    window.location.href = "deposit.html"
})

btnSendMoney.addEventListener("click", function (e) {
    e.preventDefault()
    alert("Redirigiendo a enviar dinero")
    window.location.href = "sendmoney.html"
})

btnTransactions.addEventListener("click", function (e) {
    e.preventDefault()
    alert("Redirigiendo a últimos movimientos")
    window.location.href = "transactions.html"
})