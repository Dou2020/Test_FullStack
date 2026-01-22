# Blog Platform API - Backend NestJS

API REST completa para plataforma de blog con autenticación JWT, gestión de posts, usuarios y comentarios. Desarrollada con NestJS, MongoDB, Mongoose y TypeScript.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Módulos y Componentes](#módulos-y-componentes)
- [Endpoints API](#endpoints-api)
- [Modelos de Datos](#modelos-de-datos)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [Requerimientos Funcionales](#requerimientos-funcionales)
- [Requerimientos No Funcionales](#requerimientos-no-funcionales)
- [Scripts Disponibles](#scripts-disponibles)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🚀 Características

- ✅ **API REST** - Endpoints RESTful bien estructurados
- ✅ **Autenticación JWT** - Sistema seguro con tokens
- ✅ **Validación de Datos** - class-validator y class-transformer
- ✅ **Base de Datos MongoDB** - Mongoose ODM
- ✅ **Encriptación de Contraseñas** - bcrypt con salt rounds
- ✅ **DTOs Type-Safe** - Data Transfer Objects con TypeScript
- ✅ **Swagger/OpenAPI** - Documentación automática de API
- ✅ **Soft Delete** - Eliminación lógica de registros
- ✅ **Timestamps Automáticos** - createdAt, updatedAt
- ✅ **CORS Habilitado** - Para integración con frontend
- ✅ **Manejo de Errores** - Excepciones HTTP estructuradas
- ✅ **Testing** - Unit tests y E2E tests

---

## 📦 Requisitos Previos

- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **MongoDB**: v6.x o superior (local o Atlas)
- **NestJS CLI**: v11.x o superior (opcional)

---

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd backend-nest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Application
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/blog_db

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:4200
```

Crear archivo `.env.example` (template):

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blog_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:4200
```

### 4. Iniciar MongoDB

**MongoDB Local:**
```bash
# Linux/Mac
sudo systemctl start mongod

# Windows
net start MongoDB
```

**MongoDB Atlas:**
- Usar URI de conexión en `MONGODB_URI`

### 5. Iniciar servidor de desarrollo

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000`

### 6. Acceder a Swagger Documentation

```
http://localhost:3000/api
```

---

## 📁 Arquitectura del Proyecto

```
src/
├── app.module.ts                 # Módulo raíz de la aplicación
├── main.ts                       # Punto de entrada de la aplicación
│
├── users/                        # Módulo de Usuarios
│   ├── users.controller.ts      # Controlador REST de usuarios
│   ├── users.controller.spec.ts # Tests del controlador
│   ├── users.service.ts         # Lógica de negocio de usuarios
│   ├── users.service.spec.ts    # Tests del servicio
│   ├── users.module.ts          # Módulo de usuarios
│   ├── dto/
│   │   ├── create-user.dto.ts   # DTO para crear usuario
│   │   └── update-user.dto.ts   # DTO para actualizar usuario
│   └── entities/
│       └── user.entity.ts       # Schema de Mongoose para User
│
├── login/                        # Módulo de Autenticación
│   ├── login.controller.ts      # Controlador de auth
│   ├── login.service.ts         # Lógica de autenticación
│   ├── login.module.ts          # Módulo de login/auth
│   └── dto/
│       └── login.dto.ts         # DTOs de login y registro
│
├── posts/                        # Módulo de Posts
│   ├── posts.controller.ts      # Controlador REST de posts
│   ├── posts.controller.spec.ts # Tests del controlador
│   ├── posts.service.ts         # Lógica de negocio de posts
│   ├── posts.service.spec.ts    # Tests del servicio
│   ├── posts.module.ts          # Módulo de posts
│   ├── dto/
│   │   ├── create-post.dto.ts   # DTO para crear post
│   │   └── update-post.dto.ts   # DTO para actualizar post
│   └── entities/
│       └── post.entity.ts       # Schema de Mongoose para Post
│
├── comments/                     # Módulo de Comentarios
│   ├── comments.controller.ts   # Controlador REST de comentarios
│   ├── comments.controller.spec.ts
│   ├── comments.service.ts      # Lógica de negocio de comentarios
│   ├── comments.service.spec.ts
│   ├── comments.module.ts       # Módulo de comentarios
│   ├── dto/
│   │   ├── create-comment.dto.ts
│   │   └── update-comment.dto.ts
│   └── entities/
│       └── comment.entity.ts    # Schema de Mongoose para Comment
│
└── test/                         # Tests E2E
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

---

## 🧩 Módulos y Componentes

### **App Module** (`app.module.ts`)

**Propósito**: Módulo raíz que integra todos los módulos de la aplicación

**Configuración**:
```typescript
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    LoginModule,
    PostsModule,
    CommentsModule,
  ],
})
```

**Características**:
- Configuración de MongoDB con Mongoose
- Importación de todos los módulos funcionales
- Configuración global de la aplicación

---

### **Users Module** (`src/users/`)

**Propósito**: Gestión completa de usuarios

#### **UserController**

**Endpoints**:
```typescript
GET    /users          # Obtener todos los usuarios
GET    /users/:id      # Obtener usuario por ID
POST   /users          # Crear nuevo usuario
PATCH  /users/:id      # Actualizar usuario
DELETE /users/:id      # Eliminar usuario
```

**Funcionalidades**:
- CRUD completo de usuarios
- Validación de DTOs
- Manejo de excepciones HTTP

#### **UserService**

**Métodos**:
```typescript
create(createUserDto: CreateUserDto): Promise<User>
findAll(): Promise<User[]>
findOne(id: string): Promise<User>
findByEmail(email: string): Promise<User | null>
findByUsername(username: string): Promise<User | null>
update(id: string, updateUserDto: UpdateUserDto): Promise<User>
remove(id: string): Promise<User>
```

**Lógica de Negocio**:
- Encriptación de contraseñas con bcrypt (10 salt rounds)
- Validación de usuarios únicos (email, username)
- Soft delete con campo `deleteAt`
- Búsqueda por criterios múltiples

#### **User Entity** (Schema)

```typescript
{
  username: string;      // Único, 3-30 caracteres
  name: string;          // 2-100 caracteres
  email: string;         // Único, formato válido
  password: string;      // Encriptado, 8-50 caracteres
  createdAt: Date;       // Timestamp automático
  updatedAt: Date;       // Timestamp automático
  deleteAt?: Date;       // Para soft delete
}
```

#### **CreateUserDto**

**Validaciones**:
- `username`: 3-30 caracteres, alfanumérico con guiones/guiones bajos
- `name`: 2-100 caracteres
- `email`: Formato de email válido, minúsculas
- `password`: 8-50 caracteres, mínimo una mayúscula, minúscula y número

---

### **Login Module** (`src/login/`)

**Propósito**: Autenticación JWT y gestión de sesiones

#### **LoginController**

**Endpoints**:
```typescript
POST /auth/register    # Registrar nuevo usuario
POST /auth/login       # Iniciar sesión
```

**Responses**:
```typescript
{
  access_token: string;
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
  }
}
```

#### **LoginService**

**Métodos**:
```typescript
register(registerDto: RegisterDto): Promise<AuthResponse>
login(loginDto: LoginDto): Promise<AuthResponse>
initSession(user: User): { access_token: string }
validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>
```

**Lógica de Autenticación**:
- Validación de credenciales
- Generación de JWT con payload de usuario
- Comparación de contraseñas con bcrypt
- Manejo de errores de autenticación (401)

#### **JWT Configuration**

```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET || 'defaultSecret',
  signOptions: { expiresIn: '24h' },
})
```

**Token Payload**:
```typescript
{
  sub: user._id,
  username: user.username,
  email: user.email,
  name: user.name
}
```

---

### **Posts Module** (`src/posts/`)

**Propósito**: Gestión de publicaciones del blog

#### **PostController**

**Endpoints**:
```typescript
GET    /posts          # Obtener todos los posts
GET    /posts/:id      # Obtener post por ID
POST   /posts          # Crear nuevo post
PATCH  /posts/:id      # Actualizar post
DELETE /posts/:id      # Eliminar post
```

#### **PostService**

**Métodos**:
```typescript
create(createPostDto: CreatePostDto): Promise<Post>
findAll(): Promise<Post[]>
findOne(id: string): Promise<Post>
update(id: string, updatePostDto: UpdatePostDto): Promise<Post>
remove(id: string): Promise<Post>
```

**Características**:
- Filtrado de posts no eliminados
- Validación de campos requeridos
- Manejo de arrays de tags
- Soft delete

#### **Post Entity** (Schema)

```typescript
{
  title: string;         // Requerido
  body: string;          // Requerido
  author: string;        // Requerido
  tags: string[];        // Array de strings, default []
  imageUrl: string;      // URL de imagen, nullable
  published: boolean;    // Estado, default false
  createdAt: Date;       // Timestamp automático
  updatedAt: Date;       // Timestamp automático
  deleteAt?: Date;       // Para soft delete
}
```

#### **CreatePostDto**

**Validaciones**:
- `title`: Requerido, string
- `body`: Requerido, string
- `author`: Requerido, string
- `tags`: Array de strings
- `imageUrl`: String opcional
- `published`: Boolean, default false

---

### **Comments Module** (`src/comments/`)

**Propósito**: Sistema de comentarios por post

#### **CommentController**

**Endpoints**:
```typescript
GET    /comments             # Obtener todos los comentarios
GET    /comments?postId=xxx  # Filtrar por post
GET    /comments/:id         # Obtener comentario por ID
POST   /comments             # Crear nuevo comentario
PATCH  /comments/:id         # Actualizar comentario
DELETE /comments/:id         # Eliminar comentario
```

#### **CommentService**

**Métodos**:
```typescript
create(createCommentDto: CreateCommentDto): Promise<Comment>
findAll(): Promise<Comment[]>
findByPostId(postId: string): Promise<Comment[]>
findOne(id: string): Promise<Comment>
update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment>
remove(id: string): Promise<Comment>
```

**Características**:
- Filtrado por postId con query params
- Ordenamiento por fecha (más recientes primero)
- Validación de relación con post (postId)
- Soft delete

#### **Comment Entity** (Schema)

```typescript
{
  postId: ObjectId;      // Referencia a Post, requerido
  name: string;          // 2-100 caracteres, requerido
  email: string;         // Formato válido, lowercase, requerido
  body: string;          // 5-1000 caracteres, requerido
  createdAt: Date;       // Timestamp automático
  updatedAt: Date;       // Timestamp automático
  deleteAt?: Date;       // Para soft delete
}
```

#### **CreateCommentDto**

**Validaciones**:
- `postId`: MongoID válido, requerido
- `name`: 2-100 caracteres, requerido
- `email`: Formato de email válido, requerido
- `body`: 5-1000 caracteres, requerido

---

## 🔌 Endpoints API

### **Authentication**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrar nuevo usuario | No |
| POST | `/auth/login` | Iniciar sesión | No |

**Request Body (Register)**:
```json
{
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Request Body (Login)**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### **Users**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/users` | Listar todos los usuarios | Opcional |
| GET | `/users/:id` | Obtener usuario por ID | Opcional |
| POST | `/users` | Crear usuario | No |
| PATCH | `/users/:id` | Actualizar usuario | Recomendado |
| DELETE | `/users/:id` | Eliminar usuario | Recomendado |

---

### **Posts**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/posts` | Listar todos los posts | No |
| GET | `/posts/:id` | Obtener post por ID | No |
| POST | `/posts` | Crear nuevo post | Recomendado |
| PATCH | `/posts/:id` | Actualizar post | Recomendado |
| DELETE | `/posts/:id` | Eliminar post | Recomendado |

**Request Body (Create Post)**:
```json
{
  "title": "Mi primer post",
  "body": "Contenido del post...",
  "author": "John Doe",
  "tags": ["tecnología", "programación"],
  "imageUrl": "https://example.com/image.jpg",
  "published": true
}
```

---

### **Comments**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/comments` | Listar todos los comentarios | No |
| GET | `/comments?postId=xxx` | Filtrar por post | No |
| GET | `/comments/:id` | Obtener comentario por ID | No |
| POST | `/comments` | Crear comentario | No |
| PATCH | `/comments/:id` | Actualizar comentario | Recomendado |
| DELETE | `/comments/:id` | Eliminar comentario | Recomendado |

**Request Body (Create Comment)**:
```json
{
  "postId": "507f1f77bcf86cd799439011",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "body": "Excelente artículo, muy informativo."
}
```

---

## 📊 Modelos de Datos

### **Relaciones entre Entidades**

```
User (1) ────────< Posts (N)
                   (author field)

Post (1) ────────< Comments (N)
                   (postId field)
```

### **Schemas Mongoose**

Todos los schemas incluyen:
- `timestamps: true` - Agrega automáticamente `createdAt` y `updatedAt`
- Campo `deleteAt` opcional para soft delete
- Validaciones a nivel de schema

---

## 🔐 Autenticación y Seguridad

### **JWT (JSON Web Tokens)**

**Configuración**:
- Secret Key: Variable de entorno `JWT_SECRET`
- Expiración: 24 horas (configurable)
- Algoritmo: HS256

**Payload del Token**:
```json
{
  "sub": "user_id",
  "username": "johndoe",
  "email": "john@example.com",
  "name": "John Doe",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### **Encriptación de Contraseñas**

**bcrypt Configuration**:
```typescript
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
```

**Validación**:
```typescript
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### **Validación de Datos**

**class-validator**:
- Validaciones declarativas en DTOs
- Mensajes de error personalizados en español
- Transformaciones automáticas (trim, lowercase)

**class-transformer**:
- Transformación de datos en DTOs
- Serialización/Deserialización automática

---

## ✅ Requerimientos Funcionales

### RF-001: Autenticación de Usuarios
- **Descripción**: Sistema de registro e inicio de sesión con JWT
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Endpoints**: 
  - `POST /auth/register`
  - `POST /auth/login`
- **Criterios de Aceptación**:
  - Usuario puede registrarse con validaciones
  - Contraseñas encriptadas con bcrypt
  - JWT generado en login exitoso
  - Token válido por 24 horas

### RF-002: Gestión de Usuarios (CRUD)
- **Descripción**: Operaciones completas sobre usuarios
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Endpoints**: 
  - `GET /users`, `GET /users/:id`
  - `POST /users`, `PATCH /users/:id`, `DELETE /users/:id`
- **Criterios de Aceptación**:
  - CRUD completo funcional
  - Validación de emails y usernames únicos
  - Soft delete implementado

### RF-003: Gestión de Posts (CRUD)
- **Descripción**: Crear, leer, actualizar y eliminar posts
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Endpoints**: 
  - `GET /posts`, `GET /posts/:id`
  - `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`
- **Criterios de Aceptación**:
  - CRUD completo funcional
  - Soporte para tags (array)
  - Estado published/draft
  - Soft delete implementado

### RF-004: Sistema de Comentarios
- **Descripción**: Comentarios asociados a posts
- **Prioridad**: Media
- **Estado**: ✅ Implementado
- **Endpoints**: 
  - `GET /comments?postId=xxx`
  - `POST /comments`, `PATCH /comments/:id`, `DELETE /comments/:id`
- **Criterios de Aceptación**:
  - Asociación con posts (postId)
  - Filtrado por post
  - Ordenamiento por fecha (DESC)
  - Validación de datos completa

### RF-005: Validación de Datos
- **Descripción**: Validación exhaustiva en DTOs
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Validaciones con class-validator
  - Mensajes de error descriptivos
  - Transformaciones automáticas (trim, lowercase)

### RF-006: Soft Delete
- **Descripción**: Eliminación lógica de registros
- **Prioridad**: Media
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Campo `deleteAt` en todas las entidades
  - Filtrado automático de registros eliminados
  - Posibilidad de restauración

### RF-007: Documentación API (Swagger)
- **Descripción**: Documentación automática de endpoints
- **Prioridad**: Media
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Swagger UI en `/api`
  - Todos los endpoints documentados
  - Schemas de DTOs visible

---

## 🎯 Requerimientos No Funcionales

### RNF-001: Rendimiento
- **Descripción**: Tiempos de respuesta óptimos
- **Estado**: ✅ Implementado
- **Métricas**:
  - Endpoints simples: < 50ms
  - Queries con filtros: < 200ms
  - Conexión MongoDB con pooling
  - Índices en campos frecuentes (email, username)

### RNF-002: Seguridad
- **Descripción**: Protección de datos y autenticación
- **Estado**: ✅ Implementado
- **Medidas**:
  - Contraseñas encriptadas con bcrypt (10 rounds)
  - JWT para autenticación stateless
  - Validación exhaustiva de inputs
  - CORS configurado para frontend específico
  - Variables de entorno para secretos
  - Helmet.js para headers de seguridad (opcional)

### RNF-003: Escalabilidad
- **Descripción**: Preparado para crecimiento
- **Estado**: ✅ Implementado
- **Características**:
  - Arquitectura modular por features
  - Mongoose con connection pooling
  - Stateless (JWT, sin sesiones)
  - Fácil horizontalización
  - MongoDB escalable (sharding, réplicas)

### RNF-004: Mantenibilidad
- **Descripción**: Código limpio y mantenible
- **Estado**: ✅ Implementado
- **Prácticas**:
  - TypeScript con tipos estrictos
  - Arquitectura modular (NestJS)
  - DTOs para validación y type-safety
  - Separación de responsabilidades (Controller-Service-Repository)
  - Naming conventions consistentes
  - Comentarios en código complejo

### RNF-005: Testabilidad
- **Descripción**: Código fácilmente testeable
- **Estado**: ✅ Implementado
- **Características**:
  - Inyección de dependencias (DI)
  - Unit tests configurados
  - E2E tests configurados
  - Mocks y stubs disponibles
  - Coverage reportes

### RNF-006: Disponibilidad
- **Descripción**: Alta disponibilidad del servicio
- **Estado**: ⏳ Parcial
- **Medidas**:
  - Manejo robusto de errores
  - Logging de errores
  - Health checks (pendiente)
  - Graceful shutdown (pendiente)
  - Monitoring (pendiente)

### RNF-007: Compatibilidad
- **Descripción**: Compatibilidad con estándares
- **Estado**: ✅ Implementado
- **Características**:
  - API REST estándar
  - JSON como formato de datos
  - HTTP status codes correctos
  - CORS habilitado
  - OpenAPI/Swagger 3.0

---

## 📜 Scripts Disponibles

### Desarrollo
```bash
# Modo desarrollo con watch
npm run start:dev

# Modo desarrollo estándar
npm run start

# Modo debug
npm run start:debug
```

### Build
```bash
# Compilar TypeScript
npm run build

# Limpiar build anterior
rm -rf dist && npm run build
```

### Testing
```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Coverage de tests
npm run test:cov

# Tests E2E
npm run test:e2e
```

### Producción
```bash
# Ejecutar build de producción
npm run start:prod
```

### Utilidades
```bash
# Formatear código
npm run format

# Lint
npm run lint

# Generar recurso (controller, service, module)
nest g resource nombre-recurso
```

---

## 🧪 Testing

### Unit Tests

**Ejecutar tests**:
```bash
npm run test
```

**Coverage**:
```bash
npm run test:cov
```

**Estructura de Tests**:
```typescript
describe('PostsService', () => {
  let service: PostsService;
  let model: Model<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### E2E Tests

**Ejecutar tests E2E**:
```bash
npm run test:e2e
```

**Ejemplo**:
```typescript
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
```

---

## 🚀 Deployment

### Variables de Entorno en Producción

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog_prod
JWT_SECRET=production_secret_key_very_secure
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://yourdomain.com
```

### Build de Producción

```bash
# 1. Instalar dependencias
npm ci --only=production

# 2. Compilar TypeScript
npm run build

# 3. Ejecutar aplicación
npm run start:prod
```

### Docker (Opcional)

**Dockerfile**:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/blog_db
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Plataformas de Deployment

- **Heroku**: `heroku create && git push heroku main`
- **Railway**: Deploy automático con GitHub
- **AWS**: EC2, Elastic Beanstalk, o ECS
- **DigitalOcean**: App Platform o Droplets
- **Vercel/Netlify**: Para funciones serverless (adaptar)

---

## 📚 Recursos Adicionales

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT Documentation](https://jwt.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)


## 👥 Stack Tecnológico

- **Framework**: NestJS v11.0.1
- **Runtime**: Node.js v18+
- **Lenguaje**: TypeScript v5.7.2
- **Base de Datos**: MongoDB v6+ con Mongoose v9.1.4
- **Autenticación**: JWT (@nestjs/jwt v10.2.0)
- **Validación**: class-validator v0.14.3, class-transformer v0.5.1
- **Encriptación**: bcrypt v5.1.1
- **Testing**: Jest, Supertest
- **Documentación**: Swagger/OpenAPI

---

**Versión**: 1.0.0  
**Última Actualización**: Enero 2026
