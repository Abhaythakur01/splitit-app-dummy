import React, { useState } from 'react';
import './GroupsPage.css';

// This is now a "presentational" component. It receives all data and functions as props.
function GroupsPage({ groups, onSelectGroup, onCreateGroup }) {
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (newGroupName.trim() === '') return;
    
    // Call the function passed down from App.jsx
    onCreateGroup(newGroupName); 
    
    setNewGroupName('');
  };

  return (
    <div className="groups-page">
      <h1>Your Groups</h1>
      
      <div className="group-creator">
        <form onSubmit={handleCreateGroup}>
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter new group name"
          />
          <button type="submit">Create Group</button>
        </form>
      </div>

      <div className="group-list">
        {groups.length > 0 ? (
          <ul>
            {groups.map(group => (
              <li key={group.id} onClick={() => onSelectGroup(group)} className="group-item">
                {group.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No groups yet. Create one above!</p>
        )}
      </div>
    </div>
  );
}

export default GroupsPage;
