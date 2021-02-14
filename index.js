const modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },
  set(transactions) {
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions));
  },
};

const Transaction = {
  all: Storage.get(),

  /*  [
      {
          
          description: 'Luz',
          amount: -50000,
          data: '23/02/2021'
      }, 
      {
          
          description: 'Website',
          amount: 500000,
          data: '23/02/2021'
      }, 
      {
          
          description: 'Internet',
          amount: -50000,
          data: '23/02/2021'
      }, 
  ], */
  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },
  incomes() {
    let income = 0;
    //soma as entradas
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },
  expenses() {
    //somar as saídas
    let expense = 0;
    //soma as entradas
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });

    return expense;
  },
  total() {
    // entradas - saídas
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;
    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
   
      <td class="description">${transaction.description}</td>
      <td class=${CSSclass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
      </td>
  
      
      `;
    return html;
  },

  updateBalance() {
    document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
  },
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};
