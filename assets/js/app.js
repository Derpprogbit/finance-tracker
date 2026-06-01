//Load save transactions from localstorage like browser
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function calculateBalance() {
  return transactions.reduce((total, t) => {
    return t.type === "income" ? total + t.amount : total - t.amount;
  }, 0);
}

function calculateIncome() {
  return transactions
    .filter(t => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);
}

function calculateExpenses() {
  return transactions
    .filter(t => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);
}

function renderTransactions() {
    const list = document.getElementById("transaction-list");
    const balance = document.getElementById("balance");


list.innerHTML ="";
transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.className =  t.type;
    li.innerHTML = `
     <span>${t.desc}</span>
      <span>${t.type === "income" ? "+" : "-"}₱${t.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})">✕</button>
    `;
    list.appendChild(li);
});

const total = calculateBalance();
balance.textContent = "Balance: ₱" + total.toFixed(2);
balance.style.color = total >= 0 ? "#3B6D11" : "#A32D2D";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveTransactions();
  renderTransactions();
}

document.getElementById("transaction-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount) || amount <= 0) return;

  transactions.unshift({ desc, amount, type });
  saveTransactions();
  renderTransactions();
  this.reset();
});

renderTransactions ();