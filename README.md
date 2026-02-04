# ci-cd

## Getting started

Ce projet ne fait que réagir à une requête GET sur la route /auth/:secret.  
Si le secret est sous la forme `secret-<SECRET>` et qu'il correspond au secret contenu dans la variable d'environnement `PASSPHRASE` ou par défaut 'mysecretphrase'.

La route devrait donc renvoyer 200 OK avec la requête suivante :  
GET http://localhost:3000/auth/secret-mysecretphrase

---

## Bonus : Build Docker et publication sur Docker Hub

La pipeline CI inclut un job **Docker Build & Push** qui :

- Build une image Docker (multi-stage : Node/Vite → nginx)
- La pousse sur **Docker Hub** à chaque **push sur `main`**

### Prérequis

1. **Compte Docker Hub** : [hub.docker.com](https://hub.docker.com) — créez un compte si besoin.
2. **Token d’accès** : Docker Hub → Account Settings → Security → New Access Token. **Important** : choisir **Read & Write** (pas Read-only), sinon le push échoue avec « access token has insufficient scopes ».

### Configuration des secrets GitHub

Dans le dépôt GitHub : **Settings → Secrets and variables → Actions** → **New repository secret**.

| Nom du secret      | Valeur                                      |
|--------------------|---------------------------------------------|
| `DOCKERHUB_USERNAME` | Votre identifiant Docker Hub                |
| `DOCKERHUB_TOKEN`    | Le token d’accès (pas le mot de passe)      |

Une fois configurés, chaque push sur `main` déclenche le build et la publication de l’image `votre-username/ci-cd:latest` (et un tag avec le SHA du commit).

### Lancer l’image en local

```bash
docker run -p 8080:80 votre-username/ci-cd:latest
# Puis ouvrir http://localhost:8080
```

---

*Branche test-e2e : vérification du job E2E sur Pull Request.*
