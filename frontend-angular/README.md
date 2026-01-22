# Blog Platform - Frontend Angular

Aplicación web de blog completa con sistema de autenticación, gestión de posts y comentarios. Desarrollada con Angular 21 (standalone components), Tailwind CSS y arquitectura modular.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Componentes Principales](#componentes-principales)
- [Servicios](#servicios)
- [Requerimientos Funcionales](#requerimientos-funcionales)
- [Requerimientos No Funcionales](#requerimientos-no-funcionales)
- [Scripts Disponibles](#scripts-disponibles)
- [Guía de Desarrollo](#guía-de-desarrollo)

---

## 🚀 Características

- ✅ **Autenticación JWT** - Login y registro de usuarios
- ✅ **Gestión de Posts** - CRUD completo de publicaciones
- ✅ **Sistema de Comentarios** - Comentarios por post con validaciones
- ✅ **Control de Acceso** - Permisos basados en autenticación
- ✅ **Componentes Reutilizables** - LoadingSpinner, EmptyState, ConfirmDialog, ErrorMessage
- ✅ **Diseño Responsive** - Optimizado para mobile, tablet y desktop
- ✅ **SSR Compatible** - Server-Side Rendering con Angular Universal
- ✅ **Lazy Loading** - Carga perezosa de módulos
- ✅ **Interceptores HTTP** - Gestión automática de tokens JWT
- ✅ **Tailwind CSS** - Diseño moderno y utility-first

---

## 📦 Requisitos Previos

- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **Angular CLI**: v21.0.1 o superior
- **Backend API**: NestJS backend corriendo en `http://localhost:3000`

---

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd frontend-angular
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

Crear archivo `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### 4. Iniciar servidor de desarrollo

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### 5. Build para producción

```bash
ng build
```

Los archivos compilados se generarán en `dist/`

---

## 📁 Arquitectura del Proyecto

```
src/app/
├── core/                          # Servicios y funcionalidades principales
│   ├── interceptors/
│   │   └── auth-interceptor.ts   # Inyección automática de JWT
│   └── services/
│       └── api.ts                # Gestión de autenticación y tokens
│
├── features/                      # Módulos de características
│   ├── public/                   # Módulo de autenticación
│   │   ├── pages/
│   │   │   ├── login/           # Componente de inicio de sesión
│   │   │   └── register/        # Componente de registro
│   │   ├── services/
│   │   │   └── login.ts         # Servicio de autenticación
│   │   └── model/
│   │       └── login.model.ts   # Interfaces de auth
│   │
│   ├── posts/                    # Módulo de posts
│   │   ├── pages/
│   │   │   ├── post-list/       # Lista de posts
│   │   │   ├── post-create/     # Crear/Editar post
│   │   │   └── post-detail/     # Ver post + comentarios
│   │   ├── components/
│   │   │   └── post-item/       # Card individual de post
│   │   ├── services/
│   │   │   └── post.ts          # Servicio de posts
│   │   └── model/
│   │       └── post.model.ts    # Interfaces de posts
│   │
│   └── comments/                 # Módulo de comentarios
│       ├── components/
│       │   ├── comment-item/    # Item individual de comentario
│       │   └── comment-list/    # Lista + formulario de comentarios
│       ├── services/
│       │   └── comment.ts       # Servicio de comentarios
│       └── model/
│           └── comment.model.ts # Interfaces de comentarios
│
├── shared/                       # Componentes compartidos
│   └── components/
│       ├── loading-spinner/     # Spinner de carga
│       ├── empty-state/         # Estado vacío
│       ├── confirm-dialog/      # Diálogo de confirmación
│       └── error-message/       # Mensajes de error de formularios
│
└── app.routes.ts                # Configuración de rutas principal
```

---

## ⚙️ Funcionalidades

### 🔐 Autenticación

**Login** (`/auth/login`)
- Formulario con validación de email y contraseña
- Almacenamiento de JWT en localStorage
- Guardado de datos de usuario
- Redirección automática después de login exitoso

**Register** (`/auth/register`)
- Formulario de registro completo
- Validación de coincidencia de contraseñas
- Validación de formato de email y username
- Encriptación de contraseña con bcrypt (backend)

**Interceptor HTTP**
- Inyección automática de JWT en headers
- Manejo de errores 401/403
- Redirección a login en caso de sesión expirada

### 📝 Posts

**Lista de Posts** (`/posts`)
- Grid responsive (1/2/3 columnas)
- Filtrado visual por estado (publicado/borrador)
- Estados: Loading, Error, Empty
- Acciones condicionales según autenticación:
  - **Público**: Ver detalles
  - **Autenticado**: Ver, Crear, Editar, Eliminar

**Crear/Editar Post** (`/posts/new`, `/posts/:id/edit`)
- Formulario reactivo con validaciones
- Campos: título, autor, contenido, tags, imagen, publicado
- Validación en tiempo real
- Auto-detección de modo (crear/editar)
- Loading state durante guardado

**Detalle de Post** (`/posts/:id`)
- Vista tipo artículo/blog
- Imagen destacada responsive
- Metadata: autor, estado, tags
- Botón editar (solo usuarios autenticados)
- Sección de comentarios integrada

### 💬 Comentarios

**Lista de Comentarios**
- Carga automática por postId
- Ordenados por fecha (más recientes primero)
- Empty state cuando no hay comentarios
- Confirmación antes de eliminar

**Formulario de Comentarios**
- Auto-relleno de datos para usuarios autenticados
- Campos readonly para usuarios logueados
- Validaciones: nombre (2-100), email, contenido (5-1000)
- Contador de caracteres
- Loading state durante envío

**Item de Comentario**
- Avatar con iniciales del autor
- Timestamps relativos ("hace 2 horas")
- Botones de editar/eliminar condicionales
- Diseño responsive

---

## 🧩 Componentes Principales

### Core Components

#### **ApiService** (`core/services/api.ts`)
**Propósito**: Gestión de autenticación y datos de usuario

**Métodos**:
- `login(token: string)` - Guardar token JWT
- `logout()` - Limpiar sesión
- `getToken()` - Obtener token actual
- `isAuthenticated()` - Verificar estado de autenticación
- `setUserData(userData)` - Guardar datos de usuario
- `getUserData()` - Obtener datos de usuario
- `getCurrentUsername()` - Obtener username
- `getCurrentUserFullName()` - Obtener nombre completo
- `getCurrentUserEmail()` - Obtener email

**Características**:
- Compatible con SSR (verifica `isPlatformBrowser`)
- Almacenamiento en localStorage
- Interfaces TypeScript para type-safety

#### **AuthInterceptor** (`core/interceptors/auth-interceptor.ts`)
**Propósito**: Interceptar requests HTTP y agregar JWT

**Funcionalidades**:
- Inyección automática de token en headers
- Exclusión de rutas públicas (`/auth/login`, `/auth/register`)
- Manejo de errores 401/403
- Redirección a login con returnUrl

---

### Shared Components

#### **LoadingSpinner**
**Propósito**: Indicador de carga configurable

**Props**:
- `overlay: boolean` - Modo overlay con backdrop
- `size: 'small' | 'medium' | 'large'` - Tamaño del spinner
- `message: string` - Mensaje opcional

**Uso**:
```html
<app-loading-spinner 
  [overlay]="false" 
  size="large" 
  message="Cargando posts...">
</app-loading-spinner>
```

#### **EmptyState**
**Propósito**: Mostrar estado vacío con acción opcional

**Props**:
- `icon: 'inbox' | 'search' | 'file' | 'user'` - Icono SVG
- `title: string` - Título del mensaje
- `message: string` - Descripción
- `actionButtonText: string` - Texto del botón (opcional)

**Events**:
- `actionClick` - Emite cuando se hace clic en el botón

**Uso**:
```html
<app-empty-state
  icon="inbox"
  title="No hay posts aún"
  message="Comienza creando tu primer post"
  actionButtonText="Crear Post"
  (actionClick)="createNewPost()">
</app-empty-state>
```

#### **ConfirmDialog**
**Propósito**: Modal de confirmación para acciones destructivas

**Props**:
- `isOpen: boolean` - Estado de visibilidad
- `title: string` - Título del diálogo
- `message: string` - Mensaje de confirmación
- `confirmText: string` - Texto botón confirmar
- `cancelText: string` - Texto botón cancelar
- `type: 'danger' | 'warning' | 'info'` - Tipo visual
- `loading: boolean` - Estado de carga

**Events**:
- `confirm` - Emite al confirmar
- `cancel` - Emite al cancelar

**Uso**:
```html
<app-confirm-dialog
  [isOpen]="showDeleteDialog"
  title="¿Eliminar post?"
  message="Esta acción no se puede deshacer"
  confirmText="Sí, eliminar"
  cancelText="Cancelar"
  type="danger"
  [loading]="isDeleting"
  (confirm)="confirmDelete()"
  (cancel)="cancelDelete()">
</app-confirm-dialog>
```

#### **ErrorMessage**
**Propósito**: Mostrar mensajes de error de validación de formularios

**Props**:
- `control: AbstractControl` - Control del formulario
- `fieldName: string` - Nombre del campo (opcional)
- `customMessages: object` - Mensajes personalizados (opcional)

**Errores Soportados**:
- `required`, `minlength`, `maxlength`, `email`, `pattern`, `passwordMismatch`, etc.

**Uso**:
```html
<app-error-message [control]="postForm.get('title')" />
```

---

### Feature Components

#### **Posts Module**

##### **PostList** (`pages/post-list`)
**Funcionalidad**: Lista todos los posts con grid responsive

**Características**:
- Grid adaptable (1/2/3 columnas)
- Botón "Nuevo Post" (solo autenticados)
- Loading, Error y Empty states
- Confirmación antes de eliminar
- Navegación a detalle/edición

**Estados**:
- `isLoading: boolean` - Cargando posts
- `error: string | null` - Mensaje de error
- `isAuthenticated: boolean` - Usuario autenticado
- `showDeleteDialog: boolean` - Diálogo de confirmación
- `isDeleting: boolean` - Eliminando post

##### **PostCreate** (`pages/post-create`)
**Funcionalidad**: Crear y editar posts

**Características**:
- Auto-detección de modo (nuevo/editar)
- Formulario reactivo con validaciones
- Estados de loading y saving
- Navegación automática después de guardar

**Campos Validados**:
- `title` - Mínimo 3 caracteres, requerido
- `author` - Requerido
- `body` - Mínimo 10 caracteres, requerido
- `tags` - Requerido (separados por comas)
- `imageUrl` - URL válida, requerido
- `published` - Boolean

##### **PostDetail** (`pages/post-detail`)
**Funcionalidad**: Ver post completo con comentarios

**Características**:
- Vista tipo artículo
- Imagen destacada responsive
- Metadata (autor, estado, tags)
- Botón editar (solo autenticados)
- Sección de comentarios integrada
- Loading state

##### **PostItem** (`components/post-item`)
**Funcionalidad**: Card individual de post

**Props**:
- `post: Post` - Datos del post
- `isAuthenticated: boolean` - Estado de autenticación

**Events**:
- `onView` - Ver detalle
- `onEdit` - Editar (solo autenticados)
- `onDelete` - Eliminar (solo autenticados)

**Características**:
- Imagen con fallback
- Badge de estado (publicado/borrador)
- Tags clicables
- Botones condicionales según autenticación

---

#### **Comments Module**

##### **CommentList** (`components/comment-list`)
**Funcionalidad**: Lista de comentarios + formulario

**Props**:
- `postId: string` - ID del post (requerido)
- `allowComments: boolean` - Permitir agregar comentarios

**Events**:
- `commentAdded` - Nuevo comentario agregado
- `commentDeleted` - Comentario eliminado

**Características**:
- Auto-relleno de datos de usuario autenticado
- Campos readonly para usuarios logueados
- Validación en tiempo real
- Contador de caracteres (max 1000)
- Confirmación antes de eliminar
- Loading y Empty states

**Estados**:
- `isLoading: boolean` - Cargando comentarios
- `isSubmitting: boolean` - Enviando comentario
- `isAuthenticated: boolean` - Usuario autenticado
- `showDeleteDialog: boolean` - Confirmación de eliminación

##### **CommentItem** (`components/comment-item`)
**Funcionalidad**: Item individual de comentario

**Props**:
- `comment: Comment` - Datos del comentario
- `canEdit: boolean` - Mostrar botón editar
- `canDelete: boolean` - Mostrar botón eliminar

**Events**:
- `edit` - Editar comentario
- `delete` - Eliminar comentario

**Características**:
- Avatar con iniciales (primeras letras del nombre)
- Timestamps relativos con formato inteligente:
  - "hace un momento" (< 1 min)
  - "hace X minutos/horas" (< 24h)
  - "hace X días" (< 7 días)
  - Fecha formateada (> 7 días)
- Botones de acción condicionales
- Diseño responsive

---

#### **Public Module (Auth)**

##### **Login** (`pages/login`)
**Funcionalidad**: Inicio de sesión

**Campos**:
- `email` - Email válido, requerido
- `password` - Requerido

**Características**:
- Validación de formulario reactivo
- Almacenamiento de JWT y datos de usuario
- Redirección a `/posts` después de login
- Link a registro
- Loading state

##### **Register** (`pages/register`)
**Funcionalidad**: Registro de nuevos usuarios

**Campos**:
- `username` - 3-30 caracteres, alfanumérico
- `name` - 2-100 caracteres
- `email` - Email válido
- `password` - 8-50 caracteres, complejidad requerida
- `confirmPassword` - Debe coincidir con password

**Características**:
- Validación avanzada de contraseñas
- Validator personalizado para coincidencia
- Feedback visual de errores
- Redirección automática después de registro
- Link a login

---

## 🔌 Servicios

### **PostService** (`features/posts/services/post.ts`)
**Métodos**:
- `getPosts(): Observable<Post[]>` - Obtener todos los posts
- `getPostById(id: string): Observable<Post>` - Obtener post por ID
- `createPost(post: Post): Observable<Post>` - Crear nuevo post
- `updatePost(id: string, post: Post): Observable<Post>` - Actualizar post
- `deletePost(id: string): Observable<Post>` - Eliminar post

### **CommentService** (`features/comments/services/comment.ts`)
**Métodos**:
- `getAll(): Observable<Comment[]>` - Todos los comentarios
- `getById(id: string): Observable<Comment>` - Comentario por ID
- `getByPostId(postId: string): Observable<Comment[]>` - Comentarios por post
- `create(request: CreateCommentRequest): Observable<Comment>` - Crear comentario
- `update(id: string, request: UpdateCommentRequest): Observable<Comment>` - Actualizar
- `delete(id: string): Observable<Comment>` - Eliminar comentario

### **LoginService** (`features/public/services/login.ts`)
**Métodos**:
- `login(credentials: LoginRequest): Observable<AuthResponse>` - Login
- `register(data: RegisterRequest): Observable<AuthResponse>` - Registro
- `logout(): void` - Cerrar sesión
- `getCurrentUser(): UserData | null` - Obtener usuario actual

---

## ✅ Requerimientos Funcionales

### RF-001: Autenticación de Usuarios
- **Descripción**: Sistema completo de login y registro
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Usuario puede registrarse con validaciones
  - Usuario puede iniciar sesión con email/password
  - Token JWT almacenado en localStorage
  - Redirección automática después de auth

### RF-002: Gestión de Posts (CRUD)
- **Descripción**: Crear, leer, actualizar y eliminar posts
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Cualquier usuario puede ver posts
  - Solo usuarios autenticados pueden crear/editar/eliminar
  - Validación de todos los campos
  - Confirmación antes de eliminar

### RF-003: Sistema de Comentarios
- **Descripción**: Comentarios por post con validaciones
- **Prioridad**: Media
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Cualquier usuario puede comentar
  - Usuarios autenticados tienen datos prellenados
  - Validación de nombre, email y contenido
  - Timestamps relativos
  - Confirmación antes de eliminar

### RF-004: Control de Acceso
- **Descripción**: Permisos basados en autenticación
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Criterios de Aceptación**:
  - Opciones de crear/editar/eliminar solo para autenticados
  - Interceptor HTTP inyecta JWT automáticamente
  - Redirección a login si sesión expira

### RF-005: Búsqueda y Filtrado
- **Descripción**: Filtrar posts por tags, autor, estado
- **Prioridad**: Baja
- **Estado**: ⏳ Pendiente

### RF-006: Paginación
- **Descripción**: Paginación de posts y comentarios
- **Prioridad**: Media
- **Estado**: ⏳ Pendiente

---

## 🎯 Requerimientos No Funcionales

### RNF-001: Rendimiento
- **Descripción**: Tiempos de carga óptimos
- **Estado**: ✅ Implementado
- **Métricas**:
  - Lazy loading de módulos
  - Componentes standalone (tree-shaking)
  - Optimización de imágenes con fallback
  - Build de producción optimizado

### RNF-002: Usabilidad
- **Descripción**: Interfaz intuitiva y responsive
- **Estado**: ✅ Implementado
- **Características**:
  - Diseño responsive (mobile-first)
  - Feedback visual en todas las acciones
  - Loading states en operaciones asíncronas
  - Mensajes de error descriptivos
  - Confirmaciones para acciones destructivas

### RNF-003: Seguridad
- **Descripción**: Protección de datos y autenticación
- **Estado**: ✅ Implementado
- **Medidas**:
  - JWT para autenticación
  - Interceptor HTTP para tokens
  - Validación en frontend y backend
  - Control de acceso a rutas
  - Contraseñas encriptadas (bcrypt en backend)

### RNF-004: Mantenibilidad
- **Descripción**: Código limpio y modular
- **Estado**: ✅ Implementado
- **Prácticas**:
  - Arquitectura modular por features
  - Componentes standalone reutilizables
  - TypeScript con interfaces bien definidas
  - Separación de responsabilidades
  - Documentación en código

### RNF-005: Escalabilidad
- **Descripción**: Preparado para crecer
- **Estado**: ✅ Implementado
- **Características**:
  - Lazy loading de módulos
  - Componentes reutilizables
  - Servicios desacoplados
  - Estructura modular clara

### RNF-006: Compatibilidad
- **Descripción**: Soporte multi-navegador y SSR
- **Estado**: ✅ Implementado
- **Soporte**:
  - Chrome, Firefox, Safari, Edge (últimas versiones)
  - Angular Universal (SSR)
  - Verificaciones isPlatformBrowser para código SSR-safe

---

## 📜 Scripts Disponibles

### Desarrollo
```bash
# Servidor de desarrollo
ng serve

# Servidor con puerto específico
ng serve --port 4300

# Servidor con host específico
ng serve --host 0.0.0.0
```

### Build
```bash
# Build de desarrollo
ng build

# Build de producción
ng build --configuration production

# Build con análisis de bundle
ng build --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/stats.json
```

### Testing
```bash
# Tests unitarios
ng test

# Tests con coverage
ng test --coverage

# Tests e2e
ng e2e
```

### Code Quality
```bash
# Linting
ng lint

# Formateo de código
npm run format
```

### Generadores
```bash
# Generar componente
ng generate component features/nombre/componente

# Generar servicio
ng generate service features/nombre/servicio

# Generar módulo
ng generate module features/nombre
```

---

## 🛠️ Guía de Desarrollo

### Estructura de Componentes Standalone

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-componente.html',
  styleUrl: './mi-componente.css',
})
export class MiComponente {}
```

### Uso de Servicios con inject()

```typescript
import { inject } from '@angular/core';
import { MiServicio } from './mi-servicio';

export class MiComponente {
  private readonly miServicio = inject(MiServicio);
}
```

### Sintaxis Moderna de Templates

```html
<!-- Control Flow -->
@if (condicion) {
  <div>Contenido</div>
} @else {
  <div>Alternativo</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

<!-- Switch -->
@switch (valor) {
  @case ('opcion1') { <div>Caso 1</div> }
  @case ('opcion2') { <div>Caso 2</div> }
  @default { <div>Default</div> }
}
```

### Tailwind CSS Classes

```html
<!-- Responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- mobile: w-full, tablet: w-1/2, desktop: w-1/3 -->
</div>

<!-- Hover y Estados -->
<button class="bg-blue-500 hover:bg-blue-600 disabled:opacity-50">
  Botón
</button>

<!-- Flexbox y Grid -->
<div class="flex items-center justify-between gap-4">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## 🌐 Rutas de la Aplicación

| Ruta | Componente | Descripción | Acceso |
|------|-----------|-------------|--------|
| `/` | Redirect | Redirige a `/posts` | Público |
| `/auth/login` | Login | Inicio de sesión | Público |
| `/auth/register` | Register | Registro de usuario | Público |
| `/posts` | PostList | Lista de posts | Público |
| `/posts/new` | PostCreate | Crear nuevo post | Autenticado |
| `/posts/:id` | PostDetail | Ver post + comentarios | Público |
| `/posts/:id/edit` | PostCreate | Editar post | Autenticado |

---


## 👥 Equipo de Desarrollo

- **Framework**: Angular 21
- **UI Framework**: Tailwind CSS
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Authentication**: JWT
- **Forms**: Reactive Forms

---

**Versión**: 1.0.0  
**Última Actualización**: Enero 2026
