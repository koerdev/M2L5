let btnDeposit = document.getElementById("btnDeposit")
let btnSendMoney = document.getElementById("btnSendMoney")
let btnTransactions = document.getElementById("btnTransactions")

let depositAmount = document.getElementById("depositAmount")
let totalMoney = document.getElementById("totalMoney")
let btnDepositMoney = document.getElementById("btnDepositMoney")

let btnAddContact = document.getElementById("btnAddContact")
let contactList = document.getElementById("contactList")

let btnSendMoneyContact = document.getElementById("btnSendMoneyContact")
let selectedContactIndex = null

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

        if(!depositAmount) return

        let amount = parseInt(depositAmount.value)
        if(isNaN(amount) || amount <= 0) return

        let total = parseInt(localStorage.getItem("totalMoney")) || 0
        total += amount

        localStorage.setItem("totalMoney", total)
        depositAmount.value = ""
        alert("Dinero depositado")
    })
}

if(totalMoney) {
    let storedTotal = localStorage.getItem("totalMoney")

    if(storedTotal === null) {
        let initialTotal = 60000
        localStorage.setItem("totalMoney", initialTotal)
    } else {
        totalMoney.innerText = storedTotal
    }
}

if(btnAddContact && contactList) {
    btnAddContact.addEventListener("click", function () {

        let name = prompt("Nombre y apellido:")
        if(!name) return

        let ndc = prompt("Número de Cuenta:")
        if(!ndc) return

        let alias = prompt("Alias:")
        if(!alias) return

        let bank = prompt("Nombre del banco:")
        if(!bank) return

        let contacts = JSON.parse(localStorage.getItem("contacts")) || []

        contacts.push({ name, ndc, alias, bank })
        localStorage.setItem("contacts", JSON.stringify(contacts))

        renderContacts()
    })
}

function renderContacts() {
    if(!contactList) return

    contactList.innerHTML = ""

    let contacts = JSON.parse(localStorage.getItem("contacts")) || []

    contacts.forEach((contact, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item"
        li.innerHTML = `
            <div class="contact-info">
                <span class="contact-name">${contact.name}</span>
                <span class="contact-details">NDC: ${contact.ndc}, Alias: ${contact.alias}, Banco: ${contact.bank}</span>
            </div>
        `
        contactList.appendChild(li)
    })
}

if(!localStorage.getItem("contacts")) {
    let initialContacts = []

    if(contactList) {
        contactList.querySelectorAll("li").forEach(li => {
            let name = li.querySelector(".contact-name")?.innerText || ""
            let details = li.querySelector(".contact-details")?.innerText || ""
            let ndcMatch = details.match(/NDC:\s*(\d+)/)
            let aliasMatch = details.match(/Alias:\s*([^,]+)/)
            let bankMatch = details.match(/Banco:\s*(.+)/)

            let ndc = ndcMatch ? ndcMatch[1] : ""
            let alias = aliasMatch ? aliasMatch[1] : ""
            let bank = bankMatch ? bankMatch[1] : ""

            initialContacts.push({ name, ndc, alias, bank })
        })
    }

    localStorage.setItem("contacts", JSON.stringify(initialContacts))
}

if(contactList) {
    renderContacts()
}

if(btnSendMoneyContact) {
    btnSendMoneyContact.addEventListener("click", function () {

        if(!selectedContactElement) {
            alert("Selecciona un contacto")
            return
        }

        let amount = prompt("Ingrese el monto a enviar:")
        amount = parseInt(amount)

        if(isNaN(amount) || amount <= 0) {
            alert("Monto inválido")
            return
        }

        let total = parseInt(localStorage.getItem("totalMoney")) || 0

        if(amount > total) {
            alert("Saldo insuficiente")
            return
        }

        total -= amount
        localStorage.setItem("totalMoney", total)

        let contactName = selectedContactElement
            .querySelector(".contact-name")?.innerText || "el contacto"

        alert(`Transferencia realizada a ${contactName}`)
    })
}