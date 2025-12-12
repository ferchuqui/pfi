# PFI - Backend Node.js con Firebase

API RESTful desarrollada con Node.js, Express y Firebase Firestore para la gestión de productos con autenticación JWT.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Seguridad](#seguridad)

## ✨ Características

- 🔐 Autenticación con JWT (JSON Web Tokens)
- 📦 CRUD completo de productos
- 🔥 Integración con Firebase Firestore
- 🛡️ Middleware de autenticación
- 🌐 CORS configurado
- 📝 Arquitectura en capas (Controllers, Services, Models)

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** v5.2.1 - Framework web
- **Firebase** v12.6.0 - Base de datos Firestore
- **jsonwebtoken** v9.0.3 - Autenticación JWT
- **dotenv** v17.2.3 - Gestión de variables de entorno
- **cors** v2.8.5 - Control de acceso entre orígenes

## 📦 Requisitos Previos

- Node.js v14 o superior
- npm o yarn
- Cuenta de Firebase con proyecto creado
- Firestore Database habilitado

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd pfi
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto (ver [Variables de Entorno](#variables-de-entorno))

4. **Iniciar el servidor**
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## ⚙️ Configuración

### Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Firestore Database**
4. Configura las reglas de seguridad (ver [Seguridad](#seguridad))
5. Obtén las credenciales de configuración desde **Configuración del proyecto** → **General**

### Reglas de Firestore (Desarrollo)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Advertencia:** Estas reglas son solo para desarrollo. Para producción, implementa reglas más restrictivas.

## 📖 Uso

### Iniciar el servidor

```bash
npm start
```

### Modo desarrollo (con nodemon)

```bash
npm run dev
```

## 🔌 Endpoints de la API

### Autenticación

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Productos

#### Obtener todos los productos
```http
GET /api/products
```

**Respuesta:**
```json
[
  {
    "id": "abc123",
    "nombre": "Producto 1",
    "precio": 100,
    "descripcion": "Descripción del producto"
  }
]
```

#### Obtener producto por ID
```http
GET /api/products/:id
```

**Respuesta:**
```json
{
  "id": "abc123",
  "nombre": "Producto 1",
  "precio": 100,
  "descripcion": "Descripción del producto"
}
```

#### Crear producto (requiere autenticación)
```http
POST /api/products/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Producto Nuevo",
  "precio": 150,
  "descripcion": "Descripción del nuevo producto"
}
```

#### Eliminar producto (requiere autenticación)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

---

## 📁 Estructura del Proyecto

```
pfi/
├── src/
│   ├── controllers/          # Controladores de rutas
│   │   ├── auth.controllers.js
│   │   └── product.controllers.js
│   ├── data/                 # Configuración de datos
│   │   ├── data.js          # Configuración de Firebase
│   │   └── token.js         # Generación de JWT
│   ├── midleware/           # Middlewares
│   │   └── authentication.js
│   ├── models/              # Modelos de datos
│   │   └── products.models.js
│   ├── routes/              # Definición de rutas
│   │   ├── auth.routes.js
│   │   └── product.routes.js
│   └── services/            # Lógica de negocio
│       └── products.services.js
├── .env                     # Variables de entorno (no versionado)
├── .gitignore
├── index.js                 # Punto de entrada
├── package.json
└── README.md
```

## 🔐 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# JWT Secret Key (generar una clave segura)
JWT_SECRET_KEY=tu_clave_secreta_muy_larga_y_segura_aqui

# Firebase Configuration
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_APP_ID=tu_app_id
```

### Generar JWT Secret Key

Ejecuta en Node.js:
```javascript
require('crypto').randomBytes(64).toString('hex')
```

## 🛡️ Seguridad

### Credenciales de prueba

- **Email:** `test@gmail.com`
- **Password:** `123456`

> ⚠️ **Importante:** Cambiar estas credenciales en producción

### Mejores prácticas

1. ✅ El archivo `.env` está en `.gitignore`
2. ✅ JWT con expiración de 1 hora
3. ✅ Middleware de autenticación en rutas protegidas
4. ✅ CORS configurado con orígenes específicos
5. ⚠️ Implementar reglas de Firestore más restrictivas para producción
6. ⚠️ Implementar rate limiting
7. ⚠️ Usar HTTPS en producción

## 🔄 Arquitectura

El proyecto sigue una arquitectura en capas:

1. **Routes** → Define los endpoints
2. **Controllers** → Maneja las peticiones HTTP
3. **Services** → Lógica de negocio
4. **Models** → Acceso a datos (Firestore)

```
Request → Routes → Middleware → Controllers → Services → Models → Firestore
```

## 📝 Notas

- El servidor usa Express v5.2.1 (última versión)
- Los tokens JWT expiran en 1 hora
- La colección de Firestore se llama `products`
- CORS está configurado para `localhost:3000` y `midominio.com`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👤 Autor

Tu nombre aquí

---

**Desarrollado con ❤️ usando Node.js y Firebase**
