import React, { useState } from 'react';
import './GroupDetailPage.css';

import AddExpenseForm from '../components/expenses/AddExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';

// The component now also receives 'onRemoveMember'
function GroupDetailPage({ group, onBack, onAddMember, onRemoveMember, onAddExpense }) {
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberName.trim() === '') return;
    onAddMember(group.id, newMemberName);
    setNewMemberName('');
  };

  return (
    <div className="group-detail-page">
      <button onClick={onBack} className="back-button">
        &larr; Back to All Groups
      </button>
      <header className="group-detail-header">
        <h1>{group.name}</h1>
      </header>
      
      <div className="group-content-grid">
        <div className="members-section">
          <h2>Members</h2>
          <form onSubmit={handleAddMember} className="add-member-form">
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Enter member's name"
            />
            <button type="submit">Add</button>
          </form>
          <ul className="member-list">
            {group.members.length > 0 ? (
              group.members.map(member => (
                <li key={member} className="member-item">
                  <span>{member}</span>
                  {/* Add a remove button for each member */}
                  <button 
                    onClick={() => onRemoveMember(group.id, member)} 
                    className="remove-member-btn"
                    title={`Remove ${member}`}
                  >
                    &times;
                  </button>
                </li>
              ))
            ) : (
              <p>No members yet.</p>
            )}
          </ul>
        </div>

        <div className="expenses-section">
          <ExpenseList members={group.members} expenses={group.expenses} />
          <AddExpenseForm 
            members={group.members} 
            onAddExpense={(expense) => onAddExpense(group.id, expense)} 
          />
        </div>
      </div>
    </div>
  );
}

export default GroupDetailPage;
