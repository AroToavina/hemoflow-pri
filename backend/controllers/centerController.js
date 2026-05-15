const db = require('../config/db');

exports.getCenters = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM centres_collecte ORDER BY nom_centre ASC');
        res.json(rows.map(row => ({ 
            _id: row.id_centre, 
            nom: row.nom_centre, 
            adresse: row.adresse, 
            telephone: row.telephone 
        })));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};

exports.addCenter = async (req, res) => {
    const { nom, adresse, telephone } = req.body;
    console.log("Tentative d'ajout de centre:", { nom, adresse, telephone });
    try {
        const [result] = await db.query(
            'INSERT INTO centres_collecte (nom_centre, adresse, telephone) VALUES (?, ?, ?)',
            [nom, adresse, telephone]
        );
        console.log("Centre ajouté avec succès, ID:", result.insertId);
        res.json({ _id: result.insertId, nom, adresse, telephone });
    } catch (err) {
        console.error("Erreur détaillée lors de l'ajout du centre:", err);
        res.status(500).send('Erreur serveur: ' + err.message);
    }
};
