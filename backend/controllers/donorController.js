const db = require('../config/db');

exports.getDonors = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donneurs ORDER BY id_donneur DESC');
        res.json(rows.map(row => ({ ...row, _id: row.id_donneur })));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.getDonorById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donneurs WHERE id_donneur = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ msg: 'Donneur non trouvé' });
        res.json({ ...rows[0], _id: rows[0].id_donneur });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.addDonor = async (req, res) => {
    const { nom, prenom, cin, groupeSanguin, rhesus, telephone, adresse } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO donneurs (nom, prenom, cin, groupe_sanguin, rhesus, telephone, adresse) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nom, prenom, cin, groupeSanguin, rhesus, telephone, adresse]
        );
        res.json({ _id: result.insertId, ...req.body });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.updateDonor = async (req, res) => {
    const { nom, prenom, cin, groupeSanguin, rhesus, telephone, adresse } = req.body;
    try {
        await db.query(
            'UPDATE donneurs SET nom=?, prenom=?, cin=?, groupe_sanguin=?, rhesus=?, telephone=?, adresse=? WHERE id_donneur=?',
            [nom, prenom, cin, groupeSanguin, rhesus, telephone, adresse, req.params.id]
        );
        res.json({ _id: req.params.id, ...req.body });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.deleteDonor = async (req, res) => {
    try {
        await db.query('DELETE FROM donneurs WHERE id_donneur = ?', [req.params.id]);
        res.json({ msg: 'Donneur supprimé' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};
