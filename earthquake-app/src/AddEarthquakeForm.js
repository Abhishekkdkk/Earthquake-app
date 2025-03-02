import React, { useState } from 'react';
import axios from 'axios';

const AddEarthquakeForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        country: '',
        magnitude: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/earthquakes', formData);
            onAdd(response.data); // Update the list
            setFormData({ country: '', magnitude: '', date: '' }); // Clear the form
        } catch (error) {
            console.error('Error adding earthquake:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Earthquake</h2>
            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Magnitude:</label>
                <input
                    type="number"
                    name="magnitude"
                    value={formData.magnitude}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Earthquake</button>
        </form>
    );
};

export default AddEarthquakeForm;