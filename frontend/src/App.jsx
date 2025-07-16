import React, { useState } from 'react';
import './App.css';

import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import GroupDetailPage from './pages/GroupDetailPage';
import Navbar from './components/Navbar';

function App() {
  const [page, setPage] = useState('home');
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [groups, setGroups] = useState([
    { id: 1, name: 'Family', members: ['Alice', 'Bob', 'Charlie'], expenses: [] },
    { id: 2, name: 'Work Friends', members: ['David', 'Eve'], expenses: [] },
    { id: 3, name: 'Study Group', members: ['Frank', 'Grace', 'Heidi'], expenses: [] },
  ]);

  const handleCreateGroup = (groupName) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      members: [],
      expenses: [],
    };
    setGroups([...groups, newGroup]);
  };
  
  const handleAddMember = (groupId, memberName) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        if (!group.members.includes(memberName)) {
          return { ...group, members: [...group.members, memberName] };
        }
      }
      return group;
    }));
  };

  // New function to handle removing a member from a group
  const handleRemoveMember = (groupId, memberName) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        // Return a new group object with the member filtered out
        return { ...group, members: group.members.filter(member => member !== memberName) };
      }
      return group;
    }));
  };

  const handleAddExpense = (groupId, expense) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return { ...group, expenses: [...group.expenses, expense] };
      }
      return group;
    }));
  };

  const handleSelectGroup = (group) => {
    setSelectedGroupId(group.id);
  };

  const handleBackToGroups = () => {
    setSelectedGroupId(null);
  };

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  const renderPage = () => {
    if (selectedGroup) {
      return (
        <GroupDetailPage 
          key={selectedGroup.id}
          group={selectedGroup} 
          onBack={handleBackToGroups}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember} // Pass the new function down
          onAddExpense={handleAddExpense}
        />
      );
    }

    switch (page) {
      case 'groups':
        return (
          <GroupsPage 
            groups={groups}
            onSelectGroup={handleSelectGroup} 
            onCreateGroup={handleCreateGroup}
          />
        );
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-container">
      <Navbar page={page} setPage={setPage} />
      <main className="page-content">{renderPage()}</main>
      <footer className="app-footer">
        <p>Expense Splitter App &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
