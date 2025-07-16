import React from 'react';
import './ExpenseList.css';

function ExpenseList({ members, expenses }) {
  // Calculate the balances for each member
  const calculateBalances = () => {
    const balances = members.reduce((acc, member) => {
      acc[member] = 0;
      return acc;
    }, {});

    expenses.forEach(({ amount, paidBy, participants }) => {
      // The person who paid gets the full amount credited to their balance.
      balances[paidBy] += amount;
      
      // The cost is split among all participants.
      const share = amount / participants.length;
      participants.forEach(participant => {
        balances[participant] -= share;
      });
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <div className="expense-list-container">
      <h3>Expenses</h3>
      <ul className="expense-list">
        {expenses.length > 0 ? (
          expenses.map(expense => (
            <li key={expense.id} className="expense-item">
              <div className="expense-description">{expense.description}</div>
              <div className="expense-details">
                Paid by {expense.paidBy}
                <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              </div>
            </li>
          ))
        ) : (
          <p>No expenses yet. Add one below!</p>
        )}
      </ul>

      <h3 className="balances-title">Balances</h3>
      <ul className="balances-list">
        {Object.entries(balances).map(([member, balance]) => (
          <li key={member} className={`balance-item ${balance > 0 ? 'positive' : 'negative'}`}>
            <span>{member}</span>
            <span className="balance-amount">{balance.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="balances-summary">
          A positive balance means they are owed money. A negative balance means they owe money.
      </div>
    </div>
  );
}

export default ExpenseList;
