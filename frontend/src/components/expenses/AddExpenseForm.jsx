import React, { useState, useEffect } from 'react';
import './AddExpenseForm.css';

function AddExpenseForm({ members, onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(members[0] || '');
  const [participants, setParticipants] = useState(members);
  const [error, setError] = useState(''); // State for displaying errors

  // This effect hook synchronizes the form's state when the members prop changes.
  useEffect(() => {
    // If the currently selected 'paidBy' person is no longer in the members list,
    // reset it to the new first member.
    if (!members.includes(paidBy)) {
      setPaidBy(members[0] || '');
    }
    // Ensure the participants list only contains current members.
    setParticipants(prevParticipants => prevParticipants.filter(p => members.includes(p)));
  }, [members, paidBy]); // This effect runs whenever the 'members' or 'paidBy' state changes.


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors on a new submission attempt.

    if (!description || !amount || !paidBy || participants.length === 0) {
      // Set a user-friendly error message instead of using alert().
      setError('Please fill out all fields and select at least one participant.');
      return;
    }

    const expense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      paidBy,
      participants,
    };

    onAddExpense(expense);

    // Reset form after submission
    setDescription('');
    setAmount('');
    setPaidBy(members[0] || '');
    setParticipants(members);
  };

  if (members.length === 0) {
    return <p className="info-text">Please add members to the group to start adding expenses.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add a New Expense</h3>
      {/* Display the error message here if it exists */}
      {error && <div className="form-error">{error}</div>}
      <div className="form-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (e.g., Dinner, Groceries)"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          min="0.01"
          step="0.01"
        />
      </div>
      <div className="form-row">
        <label>Paid by:</label>
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          {members.map(member => (
            <option key={member} value={member}>{member}</option>
          ))}
        </select>
      </div>
      <div className="participants-section">
        <label>Split between:</label>
        <div className="participants-list">
          {members.map(member => (
            <div key={member} className="participant-item">
              <input
                type="checkbox"
                id={`member-${member}`}
                checked={participants.includes(member)}
                onChange={() => {
                  setParticipants(prev => 
                    prev.includes(member) 
                      ? prev.filter(p => p !== memberName) 
                      : [...prev, memberName]
                  );
                }}
              />
              <label htmlFor={`member-${member}`}>{member}</label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
