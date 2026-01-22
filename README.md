# Blog Platform - Full Stack Application

Plataforma de blog completa con backend NestJS, frontend Angular y base de datos MongoDB, completamente dockerizada.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Instalación con Docker](#instalación-con-docker)
- [Instalación Manual](#instalación-manual)
- [Uso](#uso)
- [Documentación](#documentación)
- [Scripts Disponibles](#scripts-disponibles)

---

## 🚀 Características

- ✅ **Backend API REST** - NestJS con TypeScript
- ✅ **Frontend SPA** - Angular 21 standalone components
- ✅ **Base de Datos** - MongoDB con Mongoose
- ✅ **Autenticación JWT** - Sistema completo de auth
- ✅ **Gestión de Posts** - CRUD completo con tags
- ✅ **Sistema de Comentarios** - Comentarios por post
- ✅ **Diseño Responsive** - Tailwind CSS (mobile/tablet/desktop)
- ✅ **Docker** - Contenedores para todos los servicios
- ✅ **MongoDB Express** - UI para gestión de BD

---

## 🏗️ Arquitectura

```
.
├── backend-nest/           # API NestJS
│   ├── src/
│   ├── Dockerfile         # Producción
│   └── Dockerfile.dev     # Desarrollo
│
├── frontend-angular/      # Frontend Angular
│   ├── src/
│   ├── Dockerfile         # Producción
│   ├── Dockerfile.dev     # Desarrollo
│   └── nginx.conf         # Configuración nginx
│
├── docker-compose.yml     # Orquestación producción
├── docker-compose.dev.yml # Orquestación desarrollo
└── README.md
```

---

## 📦 Requisitos Previos

### Para Docker (Recomendado)
- **Docker**: v20.x o superior
- **Docker Compose**: v2.x o superior

### Para Instalación Manual
- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **MongoDB**: v6.x o superior
- **Angular CLI**: v21.x

---

## 🐳 Instalación con Docker

### Opción 1: Producción (Recomendado)

```bash
# 1. Clonar repositorio
git clone <repository-url>
cd prueba_job

# 2. Construir y levantar contenedores
docker compose up -d

# 3. Ver logs
docker compose logs -f

# 4. Detener servicios
docker compose down

# 5. Detener y eliminar volúmenes (limpieza completa)
docker compose down -v
```

**Servicios disponibles:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- MongoDB: localhost:27017
- MongoDB Express: http://localhost:8081 (usuario: admin, contraseña: admin)

---

### Opción 2: Desarrollo (con Hot Reload)

```bash
# 1. Levantar servicios en modo desarrollo
docker-compose -f docker-compose.dev.yml up -d

# 2. Ver logs en tiempo real
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend

# 3. Detener servicios
docker-compose -f docker-compose.dev.yml down
```

**Características del modo desarrollo:**
- ✅ Hot reload en backend (NestJS watch mode)
- ✅ Hot reload en frontend (Angular dev server)
- ✅ Volúmenes montados para cambios en tiempo real
- ✅ MongoDB Express incluido
- ✅ Source maps habilitados

---

### Comandos Docker Útiles

```bash
# Ver contenedores en ejecución
docker ps

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Reconstruir imágenes
docker-compose build
docker-compose build --no-cache  # Sin caché

# Entrar a un contenedor
docker exec -it blog-backend sh
docker exec -it blog-frontend sh
docker exec -it blog-mongodb mongosh

# Ver uso de recursos
docker stats

# Limpiar imágenes no usadas
docker system prune -a

# Reiniciar un servicio específico
docker-compose restart backend
```

---

## 💻 Instalación Manual

### Backend (NestJS)

```bash
cd backend-nest

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar MongoDB localmente
sudo systemctl start mongod  # Linux
# o usar MongoDB Atlas

# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

### Frontend (Angular)

```bash
cd frontend-angular

# Instalar dependencias
npm install

# Configurar environment
# Editar src/environments/environment.ts

# Desarrollo
npm run start

# Producción
npm run build
```

---

## 🎯 Uso

### Acceso a la Aplicación

1. **Frontend (UI)**
   ```
   http://localhost:4200
   ```

2. **Backend API**
   ```
   http://localhost:3000
   ```
   
   Endpoints principales:
   - `POST /auth/register` - Registrar usuario
   - `POST /auth/login` - Iniciar sesión
   - `GET /posts` - Listar posts
   - `GET /comments?postId=xxx` - Comentarios por post

3. **MongoDB Express (Gestión BD)**
   ```
   http://localhost:8081
   Usuario: admin
   Contraseña: admin
   ```

### Flujo de Usuario

1. **Registro**: Crear cuenta en `/login`
2. **Login**: Iniciar sesión con credenciales
3. **Posts**: 
   - Ver lista de posts en `/posts`
   - Crear nuevo post (autenticado)
   - Ver detalles de post en `/posts/:id`
   - Editar/Eliminar posts propios
4. **Comentarios**:
   - Agregar comentarios en posts
   - Ver comentarios ordenados por fecha

---

## 📚 Documentación

### Backend
- README completo: `backend-nest/README.md`
- Swagger API: `http://localhost:3000/api`
- Arquitectura modular con NestJS
- Autenticación JWT
- Mongoose ODM

### Frontend
- README completo: `frontend-angular/README.md`
- Angular 21 standalone components
- Tailwind CSS responsive
- RxJS para estado reactivo
- Guards y interceptors

---

## 📜 Scripts Disponibles

### Docker Compose

```bash
# Producción
docker-compose up -d              # Iniciar servicios
docker-compose down               # Detener servicios
docker-compose restart            # Reiniciar servicios
docker-compose logs -f            # Ver logs
docker-compose ps                 # Ver estado

# Desarrollo
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f
```

### Backend (Manual)

```bash
npm run start:dev        # Desarrollo con watch
npm run build            # Compilar TypeScript
npm run start:prod       # Producción
npm run test             # Tests unitarios
npm run test:e2e         # Tests E2E
npm run test:cov         # Coverage
```

### Frontend (Manual)

```bash
npm run start            # Desarrollo (puerto 4200)
npm run build            # Build de producción
npm run build:ssr        # Build con SSR
npm run serve:ssr        # Servir con SSR
npm run test             # Tests unitarios
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno

**Backend (.env)**:
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/blog_db?authSource=admin
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:4200
```

**Frontend (environment.ts)**:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### Puertos por Defecto

| Servicio | Puerto | URL |
|----------|--------|-----|
| Frontend | 4200 | http://localhost:4200 |
| Backend | 3000 | http://localhost:3000 |
| MongoDB | 27017 | localhost:27017 |
| Mongo Express | 8081 | http://localhost:8081 |

### Modificar Puertos

Editar `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Cambiar 4200 a 8080
  backend:
    ports:
      - "4000:3000"  # Cambiar 3000 a 4000
```

---

## 🔒 Seguridad

### Producción

1. **Cambiar credenciales**:
   ```bash
   # En docker-compose.yml
   MONGO_INITDB_ROOT_PASSWORD: <contraseña_segura>
   JWT_SECRET: <clave_jwt_segura>
   ```

2. **Deshabilitar Mongo Express**:
   ```bash
   # Comentar servicio en docker-compose.yml
   ```

3. **HTTPS**:
   - Usar reverse proxy (nginx/Traefik)
   - Certificados SSL (Let's Encrypt)

4. **Variables de Entorno**:
   - Usar archivo `.env` NO versionado
   - Usar secretos en producción (Docker Secrets, K8s Secrets)

---

## 🐛 Troubleshooting

### Error: Puerto en uso
```bash
# Ver procesos usando el puerto
lsof -i :3000
lsof -i :4200

# Matar proceso
kill -9 <PID>

# O cambiar puerto en docker-compose.yml
```

### MongoDB no conecta
```bash
# Ver logs de MongoDB
docker-compose logs mongodb

# Reiniciar servicio
docker-compose restart mongodb

# Verificar health check
docker inspect blog-mongodb
```

### Cambios no se reflejan
```bash
# Reconstruir imágenes
docker-compose build --no-cache

# Limpiar volúmenes
docker-compose down -v
docker-compose up -d
```

### Frontend no carga
```bash
# Verificar build
docker-compose logs frontend

# Verificar nginx
docker exec -it blog-frontend cat /etc/nginx/nginx.conf

# Probar localmente
cd frontend-angular
npm run build
```

---

## 🚀 Deployment

### Docker Swarm
```bash
docker stack deploy -c docker-compose.yml blog-stack
```

### Kubernetes
- Convertir con Kompose: `kompose convert`
- Aplicar manifests: `kubectl apply -f k8s/`

### Cloud Platforms
- **AWS**: ECS, EKS, Elastic Beanstalk
- **Azure**: Container Instances, AKS
- **GCP**: Cloud Run, GKE
- **DigitalOcean**: App Platform, Kubernetes

---

## 📊 Monitoreo

### Health Checks

Todos los servicios tienen health checks configurados:

```bash
# Verificar health
docker inspect blog-backend | grep -A 10 "Health"
docker inspect blog-frontend | grep -A 10 "Health"
docker inspect blog-mongodb | grep -A 10 "Health"
```

### Logs

```bash
# Logs en tiempo real
docker-compose logs -f

# Últimas 100 líneas
docker-compose logs --tail=100

# Logs de un servicio específico
docker-compose logs -f backend
```


---

## 👥 Stack Tecnológico

### Backend
- **Framework**: NestJS v11
- **Runtime**: Node.js v18
- **Database**: MongoDB v6 + Mongoose v9
- **Auth**: JWT (@nestjs/jwt)
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt

### Frontend
- **Framework**: Angular v21
- **Styling**: Tailwind CSS v3
- **HTTP**: HttpClient
- **Reactive**: RxJS v7
- **Forms**: Reactive Forms

### DevOps
- **Containerization**: Docker v20+
- **Orchestration**: Docker Compose v2
- **Web Server**: Nginx (Alpine)
- **Database UI**: Mongo Express

---

**Versión**: 1.0.0  
**Última Actualización**: Enero 2026
