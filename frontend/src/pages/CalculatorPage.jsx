import React, { useState } from 'react';
import './GroupsPage.css';

// The component now receives 'onSelectGroup' as a prop from App.jsx
function GroupsPage({ onSelectGroup }) {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Family', members: ['Alice', 'Bob', 'Charlie'] },
    { id: 2, name: 'Work Friends', members: ['David', 'Eve'] },
    { id: 3, name: 'Study Group', members: ['Frank', 'Grace', 'Heidi'] },
  ]);

  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (newGroupName.trim() === '') return;

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      members: [], // New groups start with no members
    };

    setGroups([...groups, newGroup]);
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
            {/* Each list item is now a button that triggers 'onSelectGroup' when clicked,
              passing the specific group object up to the App component.
            */}
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
