const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const path = require('path');

let earthquakes = JSON.parse(fs.readFileSync('earthquakeData.json', 'utf-8'));

// Middleware to parse JSON bodies
app.use(express.json());

// GET /earthquakes – Retrieve all earthquake records
app.get('/earthquakes', (req, res) => {
    res.json(earthquakes);
});

// GET /earthquakes/:id – Retrieve a single earthquake record by ID
app.get('/earthquakes/:id', (req, res) => {

    const earthquake = earthquakes.find(eq => eq.id === req.params.id);
    if (!earthquake) {
        console.log('Earthquake not found'); // Log if no earthquake is found
        return res.status(404).json({ message: 'Earthquake not found' });
    }
    res.json(earthquake);
});
// POST /earthquakes – Add a new earthquake record
app.post('/earthquakes', (req, res) => {
    const newEarthquake = {
        id: `eq${earthquakes.length + 1}`, // Generate a unique ID
        ...req.body
    };
    earthquakes.push(newEarthquake);
    res.status(201).json(newEarthquake);
});

// PUT /earthquakes/:id – Update an existing earthquake record
app.put('/earthquakes/:id', (req, res) => {
    const index = earthquakes.findIndex(eq => eq.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Earthquake not found' });
    }
    earthquakes[index] = { ...earthquakes[index], ...req.body };
    res.json(earthquakes[index]);
});

// DELETE /earthquakes/:id – Delete an earthquake record
app.delete('/earthquakes/:id', (req, res) => {
    const index = earthquakes.findIndex(eq => eq.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Earthquake not found' });
    }
    const deletedEarthquake = earthquakes.splice(index, 1);
    res.json(deletedEarthquake);
});

app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/earthquakes', (req, res) => {
    res.json(earthquakes);
});

// 404 Not Found for invalid routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});