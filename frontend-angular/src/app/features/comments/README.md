# Comments Feature

Sistema completo de comentarios con componentes standalone y diseño responsive.

## 📦 Componentes

### CommentList
Componente principal que muestra la lista de comentarios y permite agregar nuevos.

**Uso:**
```typescript
<app-comment-list
  [postId]="postId"
  [allowComments]="true"
  (commentAdded)="onCommentAdded($event)"
  (commentDeleted)="onCommentDeleted($event)"
/>
```

**Props:**
- `postId` (required): ID del post al que pertenecen los comentarios
- `allowComments` (opcional): Permite agregar nuevos comentarios (default: true)

**Events:**
- `commentAdded`: Emite cuando se agrega un nuevo comentario
- `commentDeleted`: Emite cuando se elimina un comentario

### CommentItem
Componente individual para mostrar un solo comentario.

**Uso:**
```typescript
<app-comment-item
  [comment]="comment"
  [canEdit]="false"
  [canDelete]="true"
  (edit)="onEdit($event)"
  (delete)="onDelete($event)"
/>
```

**Props:**
- `comment` (required): Objeto de tipo Comment
- `canEdit` (opcional): Muestra botón de editar (default: false)
- `canDelete` (opcional): Muestra botón de eliminar (default: false)

**Events:**
- `edit`: Emite cuando se hace clic en editar
- `delete`: Emite cuando se hace clic en eliminar

## 🎨 Diseño Responsive

### Mobile (< 768px)
- Avatar: 40px
- Texto: Tamaño small
- Campos en columna única
- Padding reducido

### Tablet/Desktop (≥ 768px)
- Avatar: 48px
- Texto: Tamaño base
- Grid de 2 columnas para nombre/email
- Padding amplio

## 🔧 Servicios

### CommentService
Servicio para gestionar comentarios con métodos CRUD.

**Métodos:**
```typescript
getAll(): Observable<Comment[]>
getById(id: string): Observable<Comment>
getByPostId(postId: string): Observable<Comment[]>
create(request: CreateCommentRequest): Observable<Comment>
update(id: string, request: UpdateCommentRequest): Observable<Comment>
delete(id: string): Observable<Comment>
```

## 📊 Modelos

### Comment
```typescript
interface Comment {
  _id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}
```

### CreateCommentRequest
```typescript
interface CreateCommentRequest {
  postId: string;
  name: string;
  email: string;
  body: string;
}
```

### UpdateCommentRequest
```typescript
interface UpdateCommentRequest {
  name?: string;
  email?: string;
  body?: string;
}
```

## 🚀 Características

- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Avatar con iniciales del autor
- ✅ Timestamps relativos ("hace 2 horas")
- ✅ Validación de formularios
- ✅ Loading states
- ✅ Empty states
- ✅ Confirmación antes de eliminar
- ✅ Integración con shared components (LoadingSpinner, EmptyState, ConfirmDialog)
- ✅ Componentes standalone (sin NgModule)
- ✅ Tailwind CSS para estilos

## 🔗 Integración en Posts

El componente ya está integrado en el detalle de posts (`post-detail.ts`):

```typescript
// Solo se muestra en modo vista y cuando hay un postId
@if (isViewMode && postId) {
  <app-comment-list
    [postId]="postId"
    [allowComments]="true"
    (commentAdded)="onCommentAdded($event)"
    (commentDeleted)="onCommentDeleted($event)"
  />
}
```
