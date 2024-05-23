# Prueba Sercomgas
Este repositorio es una prueba técnica para la posición de Desarrollador full-stack en Sercomgas. Este repositorio contiene el back-end, realizado con Node.js, TypeScript, Fastify, PostgreSQL y TypeORM y testeado con Jest; y el front-end realizado con React, TypeScript, React Query y Bootstrap.
***
## Tabla de contenido
- [1. Instalación del back-end](#1-instalación-del-back-end)
- [2. Instalación del front-end](#2-instalación-del-front-end)
- [3. Arranque de la web](#3-arranque-de-la-web)
***
## 1. Instalación del back-end

1. Descargar las dependencias necesarias. Para ello ejecuta los siguientes comandos desde la carpeta raíz:
   ```
   cd api
   npm install
   ```
2. Descarga [PostgreSQL](https://www.postgresql.org/download/)
3. Crea dos bases de datos, una llamada `sercomgas` y la otra llamada `testDb`. Puedes hacerlo desde una aplicación como [pgAdmin](https://www.pgadmin.org/download/) o con comandos mediante `psql` de la siguiente forma
   ```
   psql -h <your host name> -U <your useranme>
   CREATE DATABASE sercomgas;
   CREATE DATABASE testDb
   ```
4. Prepara una build con
   ```
   npm run build
   ```

Si quieres comprobar que los tests funcionan simplemente ejecuta
```
npm test
```
> [!WARNING]
> _Recuerda tener el servidor **cerrado** para poder ejecutar los tests_
***
## 2. Instalación del front-end

1. Descargar las dependencias necesarias. Para ello ejecuta los siguientes comandos desde la carpeta raíz:
   ```
   cd app
   npm install
   ```
***
## 3. Arranque de la web

1. Abre una terminal en la carpeta raíz y ejecuta
   ```
   cd api
   npm start
   ```
2. Abre otra terminal en la carpeta raíz y ejecuta
   ```
   cd app
   npm start
   ```
