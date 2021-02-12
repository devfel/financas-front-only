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
