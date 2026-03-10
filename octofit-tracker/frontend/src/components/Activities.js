
import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


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

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched activities:', results);
        setActivities(results);
      });
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={a._id || i}>
                  <td><span style={{fontSize: '1.5em', marginRight: '0.5em'}}>{userIcon(a.user)}</span>{a.user}</td>
                  <td>{a.activity}</td>
                  <td>{a.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
