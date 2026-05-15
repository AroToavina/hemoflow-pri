const db = require('../config/db');

exports.getDonations = async (req, res) => {
    try {
        const query = `
            SELECT d.*, dr.nom as donorNom, dr.prenom as donorPrenom, c.nom_centre as centreNom
            FROM dons d
            JOIN donneurs dr ON d.id_donneur = dr.id_donneur
            JOIN centres_collecte c ON d.id_centre = c.id_centre
            ORDER BY d.id_don DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows.map(row => ({
            _id: row.id_don,
            dateDon: row.date_don,
            statut: row.statut,
            donorId: { nom: row.donorNom, prenom: row.donorPrenom },
            centreId: { nom: row.centreNom }
        })));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.addDonation = async (req, res) => {
    const { donorId, centreId, dateDon, statut } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO dons (id_donneur, id_centre, date_don, statut) VALUES (?, ?, ?, ?)',
            [donorId, centreId, dateDon, statut]
        );
        res.json({ _id: result.insertId, ...req.body });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.updateDonationStatus = async (req, res) => {
    try {
        await db.query('UPDATE dons SET statut = ? WHERE id_don = ?', [req.body.statut, req.params.id]);
        res.json({ _id: req.params.id, statut: req.body.statut });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};
