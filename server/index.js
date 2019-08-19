const express = require('express')
const cors = require('cors')
const ctrl = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

// Endpoints
app.post('/api/players',  ctrl.addPlayers) // Creating
app.get('/api/players', ctrl.getPlayers)  // Reading
app.put('/api/players/:id', ctrl.updatePlayers)  // Updating
app.delete('/api/players/:id', ctrl.deletePlayers)  // Deleting

// Server Listening
app.listen(8080, () => {
    console.log('Server is running')
})