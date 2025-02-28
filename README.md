# Social Network (Blog tech) API

Une API REST pour le back-end d'un blog tech (DevBlog) construite avec Node.js, Express et MongoDB.

## Fonctionnalités

- Authentification (inscription/connexion) avec JWT et OAuth
- Gestion des profils utilisateurs
- Publication et gestion de posts
- Likes et commentaires sur les posts
- Sauvegarde de posts
- Gestion des images avec Cloudinary
- Gestion des communautés
- Gestion des tokens (rafraîchissement/révocation)

## Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cloudinary
- Multer

## Installation

1. Cloner le repository
`git clone https://github.com/RudelAv/chroniksbackend.git`

2. Installer les dépendances
`npm install`

3. Configurer le fichier .env.local ou simplement .env avec les variables d'environnement suivantes:
```
DATABASE_URL=VOTRE_URL_DATABASE
ACCESS_TOKEN_SECRET=VOTRE_SECRET_ACCESS_TOKEN
REFRESH_TOKEN_SECRET=VOTRE_SECRET_REFRESH_TOKEN
ACCESS_TOKEN_EXPIRES=VOTRE_EXPIRES_ACCESS_TOKEN
REFRESH_TOKEN_EXPIRES=VOTRE_EXPIRES_REFRESH_TOKEN
CLOUDINARY_CLOUD_NAME=VOTRE_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=VOTRE_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=VOTRE_CLOUDINARY_API_SECRET
PORT=VOTRE_PORT
GOOGLE_CLIENT_ID=VOTRE_GOOGLE_CLIENT_ID

```


4. Lancer le serveur
`npm start`

## Utilisation

Pour accéder à l'API, vous pouvez utiliser un outil comme Postman ou curl.
Pour utiliser l'application front-end, vous pouvez cloner le repository [chroniksfrontend](https://github.com/RudelAv/chroniksfrontend.git) et suivre les instructions de son README.md.

