[README.md](https://github.com/user-attachments/files/22627044/README.md)
## TP2 Seguridad Informática – Integración CI/CD Segura con GitHub Actions y API de OpenWeatherMap

##  Descripción General

Este proyecto forma parte del **Trabajo Práctico N°2 de la materia Seguridad Informática**, y tiene como objetivo aplicar prácticas seguras de desarrollo, despliegue e integración continua en un entorno controlado.

El sistema está desarrollado en **Node.js**, utiliza la **API pública de OpenWeatherMap** para obtener información meteorológica y emplea **GitHub Actions** como entorno de CI/CD (Integración Continua / Despliegue Continuo).

>  La clave del proyecto es la **implementación segura de secretos**, el uso de **automatización con workflows CI/CD**, y la **simulación de despliegue** en entorno productivo.

---

##  Tecnologías Utilizadas

- **Node.js v18** → Entorno de ejecución principal.  
- **npm** → Gestor de dependencias.  
- **Axios** → Cliente HTTP para consumir la API externa.  
- **Jest** → Framework de testing automatizado.  
- **GitHub Actions** → Plataforma de CI/CD.  
- **GitHub Secrets** → Gestión segura de claves privadas.  
- **OpenWeatherMap API** → Fuente de datos meteorológicos.  

---

##  Estructura del Proyecto

```
TP2Seguridad/
│
├── src/
│   ├── index.js                # Punto de entrada principal
│   ├── config.js               # Configuración global (API Key, URL base)
│   └── weatherService.js       # Lógica de consumo de la API OpenWeatherMap
│
├── test/
│   └── weatherService.test.js  # Pruebas unitarias (Jest)
│
├── scripts/
│   ├── simulate-deploy.js      # Simulación de despliegue
│   └── rotate-secrets.js       # Ejemplo de rotación de secretos
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # Pipeline CI/CD automatizado
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

##  Configuración Segura de Secretos

El proyecto utiliza **GitHub Secrets** para almacenar de forma segura la clave de acceso a la API de OpenWeatherMap.

### 1. Crear el secreto

1. Ir al repositorio en GitHub → **Settings → Secrets → Actions**  
2. Crear un nuevo secreto:
   - **Name:** `OPENWEATHER_API_KEY`
   - **Value:** tu clave privada de OpenWeatherMap (por ejemplo `API KEY`)

### 2. Uso en el código

El valor del secreto se obtiene mediante variables de entorno:

```js
// src/config.js
module.exports = {
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  openWeatherBaseUrl: 'https://api.openweathermap.org/data/2.5'
};
```

El secreto no se guarda en ningún archivo local ni se sube al repositorio.

---

##  Ejecución del Proyecto

### 1. Instalación de dependencias

npm install

### 2. Ejecución local

node src/index.js

### 3. Pruebas unitarias (Jest)

npm test


Las pruebas verifican el correcto funcionamiento de las llamadas a la API y el manejo de errores cuando la clave no está configurada.

---

##  Pipeline de CI/CD (GitHub Actions)

El archivo **`.github/workflows/ci-cd.yml`** define un pipeline de integración continua que se ejecuta automáticamente al realizar un **push o pull request** a la rama `main`.

###  Etapas del pipeline

1. **Checkout del repositorio**  
2. **Instalación de dependencias Node.js**  
3. **Ejecución de pruebas automatizadas (Jest)**  
4. **Simulación de despliegue en entorno productivo**  

###  Ejemplo de workflow

name: CI/CD Secure Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Simulate deployment
        run: node scripts/simulate-deploy.js


---

##  Scripts Incluidos

### `simulate-deploy.js`

Simula el despliegue de la aplicación sin hosting real (por ejemplo, Heroku):

node scripts/simulate-deploy.js

Salida esperada:

Simulando despliegue de la aplicación...
Compilando y verificando dependencias...
Despliegue completado exitosamente.


### `rotate-secrets.js`

Ejemplo de rotación periódica de secretos:

node scripts/rotate-secrets.js

Salida esperada:

Simulando rotación segura de claves API...
Nueva API Key generada exitosamente.


>  En entornos productivos, la rotación real podría implementarse con **HashiCorp Vault** o **AWS Secrets Manager**.

---

##  Despliegue en Heroku (Alternativa Real)

Si se desea realizar un despliegue real:

1. Crear una app en [Heroku](https://www.heroku.com/)
2. Instalar Heroku CLI  
3. Iniciar sesión y desplegar el proyecto:

heroku login
heroku create tp2seguridad-app
git push heroku main

4. Agregar la variable de entorno:

heroku config:set OPENWEATHER_API_KEY=tu_clave_aqui

5. Verificar el despliegue:

heroku open

---

##  Cobertura de Pruebas

Ejemplo de salida de Jest con cobertura:


-------------------|---------|----------|---------|---------
File               | % Stmts | % Branch | % Funcs | % Lines
-------------------|---------|----------|---------|---------
All files          |   66.66 |    42.85 |     100 |   66.66
 config.js         |     100 |      100 |     100 |     100
 weatherService.js |   58.33 |       20 |     100 |   58.33
-------------------|---------|----------|---------|---------


---

##  Buenas Prácticas de Seguridad Aplicadas

- **Principio de mínimo privilegio:** las claves privadas solo se exponen a GitHub Actions.  
- **Gestión centralizada de secretos:** uso de GitHub Secrets y simulación de HashiCorp Vault.  
- **Pipeline automatizado y auditable:** CI/CD reproducible, con registro de todas las ejecuciones.  
- **Rotación segura de claves API:** garantizando la invalidez de credenciales antiguas.  
- **Pruebas automatizadas previas al despliegue:** validación de integridad antes de liberar nuevas versiones.

---

##  Autor

**Grupo AntiMalware: Matías Bertoldo, Nicolás Cuadrado, Natalia Sanchez, Francisco Galera, Ezequiel Castro Burgos**  
Estudiantes de **Licenciatura en Informática y Desarrollo de Software**  
Universidad del Aconcagua – 2025  

---

##  Licencia

Este proyecto se distribuye con fines **académicos y educativos**.  
Prohibida su reproducción comercial o redistribución sin autorización.
