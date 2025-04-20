# 🚚 Sistema de Gestión de Envíos

Este proyecto es un backend desarrollado en **Node.js**, **Express** y **TypeScript**, diseñado para gestionar envíos, transportistas, rutas de envío y usuarios administradores.

---

## 📦 Características principales

- 📦 Crear y gestionar envíos → `POST /api/shipment`
- 🚛 Administración de transportistas → `POST /api/carrier`
- 🗺️ Asignar rutas a envíos → `POST /api/shipmentRoute`
- 👤 Listar usuarios administradores → `GET /api/admin/users`
- ✅ Validaciones de datos y manejo de errores
- 🧩 Estructura modular organizada (Domain, Services, Middleware, etc.)

---

## ⚙️ Requisitos previos

- Node.js `>= 18.x`
- npm o yarn
- (Opcional) Docker si deseas contenerizar el proyecto

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/MAURO0189/shipmentsBackend
cd backend-envios

npm install

```

## Desarrollo

npm run dev

## Producción

npm run build
npm start

## 📂 Estructura del Proyecto

📦 proyecto-ExpressShip
├── 📂 gestion-runt-frontend
│ ├── 📂 src
| ├── 📂 auth
│ ├── 📂 config
│ ├── 📂 domain
│ ├── 📂 infrastructure
│ ├── 📂 middleware
│ ├── 📂 services
│ ├── 📂 shared
│ ├── 📂 validators
│ ├── 📄index.ts
├── 📄 .env
├── 📄 .gitignore
├── 📄 package-lock.json
└── 📄 package.json
└── 📄 tsconfig.json

## Autor

Desarrollado por: Mauro Yepes

✉️ Email: mauroy711@gmail.com

🐙 GitHub: https://github.com/MAURO0189
