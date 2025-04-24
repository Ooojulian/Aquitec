# Dockerfile CORREGIDO para react-scripts (CRA) y con ENV forzado

# ---- Stage 1: Build ----
# Usamos una imagen oficial de Node.js (versión LTS Alpine, que es ligera) como base para construir
FROM node:18-alpine AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json (o yarn.lock) primero
# Esto aprovecha el caché de Docker: si estos archivos no cambian, no reinstala dependencias
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto del código fuente de la aplicación al contenedor
COPY . .

# ==================================================
# ===> ¡LÍNEA AÑADIDA AQUÍ! <===
# Define la variable de entorno ANTES de ejecutar el build
ENV REACT_APP_API_URL=http://localhost:5000
# ==================================================

# Ejecutamos el script de build definido en package.json (que ejecutará "react-scripts build")
# Esto generará los archivos estáticos en la carpeta /app/build
RUN npm run build

# ---- Stage 2: Production ----
# Usamos una imagen oficial de Nginx (versión estable Alpine, muy ligera) como base final
FROM nginx:stable-alpine

# Copiamos los archivos estáticos construidos desde la etapa 'build'
# desde la carpeta /app/build (CORREGIDO) a la carpeta por defecto donde Nginx sirve contenido estático
COPY --from=build /app/build /usr/share/nginx/html

# Copiamos nuestro archivo de configuración personalizado de Nginx
# Sobrescribirá la configuración por defecto de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el puerto estándar HTTP que configuramos en nginx.conf)
EXPOSE 80

# Comando por defecto para iniciar Nginx cuando el contenedor arranque
# El "-g daemon off;" es para que Nginx corra en primer plano, lo cual es necesario para Docker
CMD ["nginx", "-g", "daemon off;"]