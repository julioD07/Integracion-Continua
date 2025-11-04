# Music Portal - Instrucciones de desarrollo con Docker Compose

Este repositorio contiene dos proyectos principales y un archivo `docker-compose.yml` en la raíz:

- `backend-music-portal/` (API NestJS con Prisma)
- `music-portal/` (Frontend Vite + React/TypeScript)

El objetivo de este README es ofrecer los pasos mínimos para levantar el entorno con Docker Compose, crear la base de datos requerida y ejecutar el seed que crea el usuario inicial.

## Requisitos previos

- Docker y Docker Compose instalados en el equipo.
- (Opcional) SQL Server Management Studio si quieres crear la base de datos manualmente.

## Servicios definidos en `docker-compose.yml`

- `mssql` — Microsoft SQL Server (puerto 1433:1433)
- `nest-app` — API backend (puerto 3000:3000)
- `vite-app` — Frontend Vite (puerto 5173:5173)

Los puertos expuestos localmente:

- API: http://localhost:3000
- Frontend Vite: http://localhost:5173
- SQL Server: localhost, puerto 1433

El fichero `docker-compose.yml` en la raíz configura las variables de entorno necesarias (por ejemplo, `DATABASE_URL`) y monta los proyectos en los contenedores para desarrollo.

## Comando principal (levantar servicios)

Usa Docker Compose desde la raíz del repositorio donde está el `docker-compose.yml`:

```powershell
docker compose up --build -d
```

Qué hace:

- Construye las imágenes (si hace falta) y levanta los contenedores en segundo plano.

## Comandos útiles

- Ver logs en tiempo real del backend:

```powershell
docker compose logs -f nest-app
```

- Detener y eliminar contenedores, redes y volúmenes creados por Compose:

```powershell
docker compose down
```

- Listar contenedores levantados por compose:

```powershell
docker compose ps
```

## Base de datos: crear `music-portal-db`

La aplicación usa una base de datos llamada `music-portal-db`. Debes crearla en SQL Server antes de ejecutar el seed. Pasos rápidos con SQL Server Management Studio (SSMS):

1. Abre SSMS y conéctate a `localhost,1433`.
2. Usa el usuario `sa` y la contraseña definida en el `docker-compose.yml` (si estás usando el `docker-compose.yml` provisto, la contraseña está allí).
3. Crea una nueva base de datos y nómbrala `music-portal-db`.

Nota: si prefieres, puedes crear la base de datos ejecutando una consulta T-SQL como:

```sql
CREATE DATABASE [music-portal-db];
GO
```

## Variables de entorno

El backend contiene un `.env` en `backend-music-portal/.env` con la cadena `DATABASE_URL`. Asegúrate de revisarlo si necesitas modificar credenciales o la cadena de conexión.

Ejemplo (ya provisto en el proyecto):

```
DATABASE_URL="sqlserver://mssql:1433;database=music-portal-db;user=sa;password=...;trustServerCertificate=true"
PORT=3000
SECRETKEY=...
PATH_FILES="./"
```

Si cambias el nombre de la base de datos o las credenciales, actualiza esta cadena o crea la base con el nombre esperado.

## Ejecutar el seed (crear usuario inicial)

Una vez que el backend esté levantado y la base de datos creada, abre en tu navegador o usa curl/Postman la siguiente ruta para ejecutar el seed que crea el usuario inicial:

- Ejecutar seed: http://localhost:3000/api/seed/ejecutar

Acceso directo:

```powershell
# ejemplo con PowerShell + curl (Invoke-WebRequest)
Invoke-WebRequest -UseBasicParsing http://localhost:3000/api/seed/ejecutar
```

Después de ejecutar la ruta del seed deberías ver en la respuesta (y en la base de datos) el usuario inicial creado.

## Descripción rápida de carpetas importantes

- `backend-music-portal/` — código del API (NestJS). Contiene `Dockerfile`, `src/`, `prisma/` y `.env`.
- `music-portal/` — código del frontend (Vite + React). Contiene `Dockerfile` y `package.json`.

## Problemas frecuentes y soluciones

- El contenedor de SQL Server tarda un poco en arrancar. Si la API falla por conexión a la BD, espera 20-30s y vuelve a intentarlo o revisa logs (`docker compose logs -f mssql`).
- Si el seed falla por tablas inexistentes, revisa que hayas ejecutado las migraciones de Prisma (dependiendo del flujo del proyecto). En este setup las migraciones pueden aplicarse automáticamente desde el backend si está configurado.
- Si el puerto 1433 está ocupado localmente, detén el servicio de SQL Server local o ajusta el puerto en el `docker-compose.yml`.

## Cómo detener todo

```powershell
docker compose down
```

## Contacto y notas finales

Este README cubre el flujo de desarrollo mínimo con Docker Compose: levantar servicios, crear la base de datos `music-portal-db` y ejecutar el seed mediante la ruta proporcionada. Si quieres que añada instrucciones para ejecutar migraciones Prisma manuales, crear usuarios con datos específicos o ejemplos de variables de entorno para producción, dímelo y lo añado.

---

Archivo generado automáticamente: documentación básica para desarrollo con Docker Compose.
