# Instructions pour lancer les Conteneurs (Docker Hub)

Ce document explique comment démarrer l'application HemoFlow en utilisant les images pré-construites sur Docker Hub.

## 🚀 Déploiement via Docker Hub

Cette méthode est la plus rapide pour déployer l'application sans avoir à compiler le code source localement.

### 1. Préparation
Assurez-vous d'avoir un fichier `.env` à la racine du projet pour configurer vos secrets.
```bash
cp .env.example .env
```
*Note : Éditez le fichier `.env` pour définir vos mots de passe et votre secret JWT.*

### 2. Configuration du déploiement
Créez un fichier nommé `docker-compose.hub.yml` avec le contenu suivant :

```yaml
services:
  backend:
    image: aro2304/hemoflow-backend:latest
    container_name: blood-donation-api
    restart: unless-stopped
    ports:
      - "5000:5000"
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

### 3. Récupération des images
Récupérez les dernières versions des images depuis Docker Hub :
```bash
docker pull aro2304/hemoflow-backend:latest
docker pull aro2304/hemoflow-frontend:latest
```

### 3. Lancement
Lancez l'application en utilisant le fichier de configuration dédié :
```bash
docker-compose -f docker-compose.hub.yml up -d
```

### 4. Accès à l'application
Une fois les conteneurs lancés, l'application est accessible aux adresses suivantes :
- **Interface Utilisateur (Frontend) :** [http://localhost](http://localhost) (Port 80)
- **API (Backend) :** [http://localhost:5000](http://localhost:5000)

---

## 🔍 Administration et Maintenance

### Vérifier l'état des services
```bash
docker ps
```

### Consulter les logs
```bash
docker-compose -f docker-compose.hub.yml logs -f
```

### Arrêter l'application
```bash
docker-compose -f docker-compose.hub.yml down
```
*Utilisez `down -v` pour supprimer également les volumes de données de la base.*
