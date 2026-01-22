# Posts Feature - Estructura de Componentes

## 📋 Componentes Reorganizados

### 1. **PostCreate** - Crear y Editar Posts
**Ruta:** `pages/post-create/`  
**Propósito:** Formulario para crear nuevos posts y editar posts existentes

**Rutas:**
- `/posts/new` - Crear nuevo post
- `/posts/:id/edit` - Editar post existente

**Características:**
- ✅ Formulario reactivo con validaciones
- ✅ Modo creación y modo edición
- ✅ Validación en tiempo real con ErrorMessage
- ✅ Loading states durante guardado
- ✅ Navegación automática después de guardar
- ✅ Diseño responsive (mobile, tablet, desktop)

**Campos del Formulario:**
- Título (mínimo 3 caracteres)
- Autor (requerido)
- Etiquetas (separadas por comas)
- URL de imagen
- Contenido (mínimo 10 caracteres)
- Publicado (checkbox)

---

### 2. **PostDetail** - Visualizar Post y Comentarios
**Ruta:** `pages/post-detail/`  
**Propósito:** Vista de solo lectura del post con sección de comentarios

**Rutas:**
- `/posts/:id` - Ver detalle del post

**Características:**
- ✅ Visualización completa del post
- ✅ Imagen destacada responsive
- ✅ Metadata (autor, fecha, estado publicado)
- ✅ Tags del post
- ✅ Botón de editar (navega a post-create)
- ✅ Sección de comentarios integrada
- ✅ Diseño tipo artículo/blog

**Componentes Integrados:**
- `CommentList` - Lista y formulario de comentarios
- `LoadingSpinner` - Estado de carga

---

### 3. **PostList** - Lista de Posts
**Ruta:** `pages/post-list/`  
**Propósito:** Grid de posts con acciones

**Rutas:**
- `/posts` - Lista principal

**Características:**
- ✅ Grid responsive (1/2/3 columnas)
- ✅ Botón crear nuevo post
- ✅ Estados: Loading, Error, Empty
- ✅ Acciones: Ver, Editar, Eliminar
- ✅ Confirmación antes de eliminar

---

## 🚀 Flujo de Navegación

```
PostList (/posts)
    │
    ├─→ Nuevo Post → PostCreate (/posts/new)
    │                    └─→ Guardar → Volver a PostList
    │
    ├─→ Ver Post → PostDetail (/posts/:id)
    │                  ├─→ Editar → PostCreate (/posts/:id/edit)
    │                  └─→ Comentarios (inline)
    │
    └─→ Editar → PostCreate (/posts/:id/edit)
                     └─→ Guardar → Volver a PostList
```

## 📁 Estructura de Archivos

```
posts/
├── pages/
│   ├── post-list/
│   │   ├── post-list.ts          # Lista de posts
│   │   ├── post-list.html
│   │   └── post-list.css
│   │
│   ├── post-create/              # ✨ CREAR Y EDITAR
│   │   ├── post-create.ts        # Formulario (nuevo/editar)
│   │   ├── post-create.html
│   │   └── post-create.css
│   │
│   └── post-detail/              # ✨ SOLO VISUALIZACIÓN
│       ├── post-detail.ts        # Vista + Comentarios
│       ├── post-detail.html
│       └── post-detail.css
│
├── components/
│   └── post-item/                # Card de post individual
│
├── model/
│   └── post.model.ts             # Interfaces
│
├── services/
│   └── post.ts                   # Service HTTP
│
├── posts-module.ts
└── posts-routing-module.ts       # Rutas configuradas
```

## 🎯 Responsabilidades

| Componente | Crear | Editar | Ver | Comentar |
|-----------|-------|--------|-----|----------|
| PostCreate | ✅ | ✅ | ❌ | ❌ |
| PostDetail | ❌ | ❌ | ✅ | ✅ |
| PostList | ❌ | ❌ | ✅ (grid) | ❌ |

## 🔧 Uso en Código

### Navegar a crear post:
```typescript
this.router.navigate(['/posts/new']);
```

### Navegar a editar post:
```typescript
this.router.navigate(['/posts', postId, 'edit']);
```

### Navegar a ver post:
```typescript
this.router.navigate(['/posts', postId]);
```

## 🎨 Diseño Responsive

### Mobile (< 640px)
- Grid 1 columna
- Stack de formularios
- Botones full-width

### Tablet (640px - 1024px)
- Grid 2 columnas
- Formularios con mejor spacing

### Desktop (> 1024px)
- Grid 3 columnas
- Formularios optimizados
- Máximo width para legibilidad

## ✅ Validaciones

Todas las validaciones se manejan con:
- `Validators` de Angular
- `ErrorMessage` component compartido
- Feedback visual inmediato

## 🔗 Dependencias

- **Shared Components**: LoadingSpinner, ErrorMessage, EmptyState, ConfirmDialog
- **Comments Feature**: CommentList component
- **Router**: Para navegación entre vistas
- **Forms**: ReactiveFormsModule para formularios
