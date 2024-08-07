import React from 'react';

const AdminNavBar = ({ showForm, setShowForm }) => {
  return (
    <nav>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'View Questions' : 'New Question'}
      </button>
    </nav>
  );
};

export default AdminNavBar;
