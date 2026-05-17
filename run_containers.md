# Instructions pour lancer les Conteneurs

Ce document explique comment démarrer l'application HemoFlow en utilisant Docker ou manuellement.

## 🚀 Méthode Docker Hub (Images pré-construites)

Utilisez cette méthode pour déployer l'application sans avoir à recompiler le code source, en utilisant les images stockées sur Docker Hub.

### 1. Récupération des images
Récupérez les dernières versions des images :
```bash
docker pull aro2304/hemoflow-backend:latest
docker pull aro2304/hemoflow-frontend:latest
```

### 2. Configuration du déploiement
Créez un fichier nommé `docker-compose.hub.yml` avec le contenu suivant pour utiliser les images du Hub :

```yaml
services:
  backend:
    image: aro2304/hemoflow-backend:latest
    container_name: blood-donation-api
    restart: unless-stopped
    networks:
      - backend-nw
    environment:
      - DB_HOST=db
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_NAME=${DB_NAME}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy

  frontend:
    image: aro2304/hemoflow-frontend:latest
    container_name: blood-donation-ui
    restart: unless-stopped
    networks:
      - frontend-nw
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: mysql:8.0
    container_name: blood-donation-db
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASS}
      - MYSQL_DATABASE=${DB_NAME}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASS}
    networks:
      - backend-nw
    volumes:
      - db-data:/var/lib/mysql
      - ./setup_db.sql:/docker-entrypoint-initdb.d/setup_db.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$DB_ROOT_PASS"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  frontend-nw:
    driver: bridge
  backend-nw:
    driver: bridge

volumes:
  db-data:
```

### 3. Lancement
Lancez l'application avec ce nouveau fichier :
```bash
docker-compose -f docker-compose.hub.yml up -d
```

---

## 🐳 Méthode Docker Compose Locale (Build)

Cette méthode lance toute la stack (Backend, Frontend, Base de données) en une seule commande.

### 1. Préparation
Assurez-vous d'avoir un fichier `.env` à la racine du projet. Vous pouvez copier l'exemple :
```bash
cp .env.example .env
```
Éditez le fichier `.env` pour définir vos propres secrets (notamment `JWT_SECRET` et `DB_ROOT_PASS`).

### 2. Lancement
Exécutez la commande suivante à la racine :
```bash
docker-compose up --build
```
*Utilisez l'option `-d` pour lancer en arrière-plan.*

### 3. Accès
- **Frontend :** [http://localhost](http://localhost) (Port 80 par défaut dans le compose)
- **Backend API :** [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Lancement Manuel (Développement)

Si vous ne souhaitez pas utiliser Docker pour tout, suivez ces étapes :

### 1. Base de Données
Lancez une instance MariaDB ou MySQL et exécutez le script d'initialisation :
```bash
mysql -u root -p < setup_db.sql
```

### 2. Backend
```bash
cd backend
npm install
npm start
```
*Le backend sera sur `http://localhost:5000`*

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Le frontend sera sur `http://localhost:5173`*

---

## 🔍 Vérification des Services
Pour vérifier que vos conteneurs tournent bien :
```bash
docker ps
```

Pour voir les logs en cas de problème :
```bash
docker-compose logs -f
```

## 🛑 Arrêt
```bash
docker-compose down
```
*Ajoutez `-v` pour supprimer également les volumes de données.*
