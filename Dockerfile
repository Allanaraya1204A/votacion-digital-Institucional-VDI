# ETAPA 1: Builder
FROM node:22-alpine AS builder

# Librerías necesarias para que Prisma funcione en Alpine (entorno Linux)
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copiamos archivos de configuración de paquetes
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos TODAS las dependencias para poder compilar NestJS
RUN npm install

# GENERAMOS EL CLIENTE DE PRISMA
# Esto es vital en el CI/CD para que el código compilado reconozca tus modelos
RUN npx prisma generate

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# ETAPA 2: Runner (Producción/Dev-Cloud)
FROM node:22-alpine AS runner

# También necesitamos openssl aquí para la conexión TLS con Neon
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copiamos solo lo necesario de la etapa anterior para mantener la imagen ligera
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Exponemos el puerto de NestJS
EXPOSE 3000

# Comando para ejecutar la app en la nube
CMD ["node", "dist/src/main.js"]