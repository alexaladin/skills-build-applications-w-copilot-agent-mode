import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;


function userIcon(name) {
  const icons = {
    'Iron Man': '🦾',
    'Batman': '🦇',
    'Superman': '🦸‍♂️',
    'Wonder Woman': '🦸‍♀️',
    'Captain America': '🛡️',
    'Thor': '⚡',
  };
  return icons[name] || '👤';
}

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched users:', results);
        setUsers(results);
      });
  }, []);

    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id || i}>
                    <td><span style={{fontSize: '1.5em', marginRight: '0.5em'}}>{userIcon(user.name)}</span>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Users;
