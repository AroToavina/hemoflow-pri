const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;

    try {
        const [existing] = await db.query('SELECT * FROM utilisateurs WHERE nom_utilisateur = ?', [nom]);
        if (existing.length > 0) {
            return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(mot_de_passe, salt);

        const [result] = await db.query(
            'INSERT INTO utilisateurs (nom_utilisateur, mot_de_passe, role) VALUES (?, ?, ?)',
            [nom, hashedPass, role || 'SECRETAIRE']
        );

        const payload = {
            user: { id: result.insertId, role: role || 'SECRETAIRE' }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.login = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM utilisateurs WHERE nom_utilisateur = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ msg: 'Identifiants invalides' });
        }

        const user = users[0];
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ msg: 'Accès réservé aux administrateurs' });
        }
        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Identifiants invalides' });
        }

        const payload = {
            user: { id: user.id_utilisateur, role: user.role }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id_utilisateur, nom: user.nom_utilisateur, role: user.role } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};
