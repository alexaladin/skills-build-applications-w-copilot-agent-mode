import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;


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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched workouts:', results);
        setWorkouts(results);
      });
  }, []);

    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Workouts</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>User</th>
                  <th>Workout</th>
                  <th>Reps</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, i) => (
                  <tr key={workout._id || i}>
                    <td><span style={{fontSize: '1.5em', marginRight: '0.5em'}}>{userIcon(workout.user)}</span>{workout.user}</td>
                    <td>{workout.workout}</td>
                    <td>{workout.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Workouts;
