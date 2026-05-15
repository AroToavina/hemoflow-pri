const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donors', require('./routes/donorRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/centers', require('./routes/centerRoutes'));

app.get('/', (req, res) => {
    res.send('API Gestion Don de Sang (MySQL) - Opérationnelle');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} (Mode MySQL)`);
});
