# Guide d'Explication du Code

Ce guide détaille l'organisation et le fonctionnement du code source de HemoFlow.

## Structure du Projet

### Backend (`/backend`)
- **`config/db.js`** : Gère la connexion au pool de base de données MariaDB/MySQL.
- **`controllers/`** : Contient la logique métier. Chaque fichier (ex: `donationController.js`) exécute les requêtes SQL et traite les réponses API.
- **`middleware/auth.js`** : Contient les fonctions `auth` (vérification JWT) et `checkRole` (protection des routes par rôle : ADMIN, SECRETAIRE).
- **`routes/`** : Définit les points d'entrée de l'API (ex: `/api/donations`) et les relie aux contrôleurs correspondants.
- **`server.js`** : Point d'entrée principal qui configure Express, le CORS, et enregistre les routes.

### Frontend (`/frontend/src`)
- **`components/`** : Composants réutilisables.
  - `AppSidebar.tsx` : Navigation principale.
  - `DashboardShell.tsx` : Layout global avec Header et Sidebar.
  - `Add[Entity]Modal.tsx` : Formulaires modaux pour l'ajout de données.
- **`pages/`** : Vues de l'application (Dashboard, Donors, Donations, etc.).
- **`hooks/`** : Logique métier côté client.
  - `use-dashboard-data.ts` : Utilise React Query pour gérer le cache et la transformation des données de l'API.
  - `use-mobile.ts` : Détection du format de l'écran.
- **`context/`** : Gestion de l'état global (ex: `AuthContext.tsx` pour l'authentification et le token JWT).
- **`services/`** : Configuration d'Axios pour communiquer avec l'API backend.
- **`types/`** : Définitions TypeScript pour assurer la sécurité des données.

## Fonctionnement Clé

### Gestion de l'Authentification
Le backend utilise `jsonwebtoken` pour signer des tokens. Le frontend intercepte chaque requête API dans `api.ts` pour injecter ce token dans le header `x-auth-token`.

### Gestion des Données (React Query)
Nous utilisons `useQuery` pour récupérer les données. Le cycle de vie est :
1.  **Cache :** Vérifie si les données existent et sont récentes.
2.  **Fetch :** Appelle l'API via Axios.
3.  **Fallback :** Si la connexion échoue (ex: DB inaccessible), des données mockées sont retournées pour éviter de casser l'affichage.

### Style et UI
Le projet utilise **Tailwind CSS** pour le style. Les variables de couleurs personnalisées sont définies dans `index.css` via `oklch`, ce qui permet une gestion dynamique des couleurs à travers tout le projet.
