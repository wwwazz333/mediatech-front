# Utiliser une image de base Nginx
FROM nginx:alpine

# Copier le fichier HTML dans le répertoire de travail de Nginx
COPY ./votre_fichier.html /usr/share/nginx/html

# Copier le fichier de configuration Nginx
COPY ./default.conf /etc/nginx/conf.d/

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx lorsque le conteneur est lancé
CMD ["nginx", "-g", "daemon off;"]
