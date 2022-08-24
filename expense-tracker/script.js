const balanceAmount = document.getElementById('balance');
const moneyPlusAmount = document.getElementById('money-plus');
const moneyMinusAmount = document.getElementById('money-minus');
const historyList = document.getElementById('list');
const addTransactionForm = document.getElementById('form');
const newTransactionText = document.getElementById('text');
const newTransactionAmount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"))
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransactions(event){
  event.preventDefault()
  if(newTransactionText.value.trim()=== "" || newTransactionAmount.value.trim() ===""){
    alert("Please enter a text and amount")
  }else{
    const transaction = {
      id: generateId(),
      text: newTransactionText.value,
      amount: +newTransactionAmount.value,
    }
    transactions.push(transaction)
    addTransactionDom(transaction)
    updateValues()
    updateLocalStorage()
    newTransactionText.value= "";
    newTransactionAmount.value = "";

  }

}
function generateId(){
  return Math.floor(Math.random()*100000000)
}

function addTransactionDom(transaction){
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement ("li");
  item.classList.add(transaction.amount < 0? "minus" : "plus")
  item.innerHTML = `${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)} </span> 
  <button class = "delete-btn" onclick = "removeTransaction(${transaction.id})">X</button>`
  list.appendChild(item)
}

function updateValues(){
  const amounts = transactions.map((transaction) => transaction.amount)
  const total = amounts.reduce((acc,item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter((item) => item > 0).reduce((acc, item) => 
  (acc += item), 0).toFixed(2);
  const expense = (amounts.filter((item) => item < 0).reduce((acc, item) =>
   (acc += item),0)*-1).toFixed(2);

   
   balanceAmount.innerText = `$${total}`
   moneyPlusAmount.innerText = `$${income}`
   moneyMinusAmount.innerText = `$${expense}`
}



function removeTransaction(id){
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage()
  init()
  }

function updateLocalStorage(){
  localStorage.setItem("transactions", JSON.stringify(transactions))
}
 function init(){
 historyList.innerHTML = ""
 transactions.forEach(addTransactionDom)
 updateValues()
 }
init()


addTransactionForm.addEventListener("submit", addTransactions)
 