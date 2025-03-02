import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEarthquakeForm from './AddEarthquakeForm';

const EarthquakeList = () => {
    const [earthquakes, setEarthquakes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/earthquakes');
            setEarthquakes(response.data);
        } catch (error) {
            console.error('Error fetching earthquake data:', error);
        }
    };

    const handleAdd = (newEarthquake) => {
        setEarthquakes([...earthquakes, newEarthquake]);
    };

    return (
        <div>
            <h2>Earthquake List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Country</th>
                        <th>Magnitude</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {earthquakes.map(earthquake => (
                        <tr key={earthquake.id}>
                            <td>{earthquake.id}</td>
                            <td>{earthquake.country}</td>
                            <td>{earthquake.magnitude}</td>
                            <td>{earthquake.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddEarthquakeForm onAdd={handleAdd} />
        </div>
    );
};

export default EarthquakeList;