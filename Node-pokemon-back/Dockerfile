# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY ./package*.json ./

# Instala las dependencias
RUN npm install


# # Copia todos los archivos del backend al directorio de trabajo
COPY . .

# # Ejecuta los comandos de prueba
# RUN npm test

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
