import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [formData, setFormData] = useState({ id: '', country: '', magnitude: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch earthquake data
  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = async () => {
    try {
      const response = await fetch('/api/earthquakes');
      const data = await response.json();
      setEarthquakes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/api/earthquakes/${formData.id}` : '/api/earthquakes';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (isEditing) {
        setEarthquakes(earthquakes.map((eq) => (eq.id === formData.id ? data : eq)));
      } else {
        setEarthquakes([...earthquakes, data]);
      }
      setFormData({ id: '', country: '', magnitude: '', date: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (earthquake) => {
    setFormData(earthquake);
    setIsEditing(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/earthquakes/${id}`, { method: 'DELETE' });
      setEarthquakes(earthquakes.filter((eq) => eq.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Earthquake Dashboard</h1>

      {/* Form for adding/updating data */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="magnitude"
          placeholder="Magnitude"
          value={formData.magnitude}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Earthquake</button>
      </form>

      {/* Table for displaying data */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Country</th>
            <th>Magnitude</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {earthquakes.map((earthquake) => (
            <tr key={earthquake.id}>
              <td>{earthquake.id}</td>
              <td>{earthquake.country}</td>
              <td>{earthquake.magnitude}</td>
              <td>{earthquake.date}</td>
              <td>
                <button onClick={() => handleEdit(earthquake)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(earthquake.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App; 