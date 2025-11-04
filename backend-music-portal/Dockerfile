FROM node:20-alpine3.22

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto por defecto
EXPOSE 3000

# Ejecutar NestJS en modo desarrollo
CMD ["npm", "run", "start:dev"]
