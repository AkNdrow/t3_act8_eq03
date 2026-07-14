# Plan de implementación - CleverNote

## Fase 1
- Integración del inicio de sesión con DummyJSON.
- Persistencia mínima de la sesión en localStorage con los datos del usuario autenticado.
- Redirección inicial hacia /dashboard cuando el usuario ya tiene una sesión activa.

## Fase 2 - Protección y layout principal
### 1. Protección de rutas
- Se creó el componente `ProtectedRoute` para validar si existe una sesión autenticada antes de permitir entrar a rutas internas.
- Si el usuario intenta acceder a /dashboard sin sesión, se redirige automáticamente a /login.

### 2. Layout principal
- Se creó `DashboardLayout.jsx` como contenedor global del dashboard.
- La distribución queda preparada con:
  - `Sidebar` fijo a la izquierda
  - `Navbar` superior
  - `Outlet` central para inyectar contenido dinámico por rutas

### 3. Navbar dinámico
- El `Navbar` ahora lee la sesión guardada en localStorage para mostrar el nombre real y la imagen del usuario autenticado.
- Se sustituyen los textos estáticos por datos reales de la respuesta del login.

### 4. Cierre de sesión
- El botón de cerrar sesión elimina la sesión guardada en localStorage.
- Luego redirige al usuario al flujo inicial de autenticación en /login.

### 5. Sidebar de navegación
- Se construyó `Sidebar.jsx` con enlaces visuales para:
  - Dashboard
  - Almacenes
  - Tareas completadas
- Las rutas internas se manejan con `NavLink`, para cambiar el contenido central sin recarga completa.

## Estado actual
- La protección de rutas ya está implementada.
- El layout principal y navegación interna del dashboard están preparados.
- La sesión de login queda reutilizable para la fase 3.

## Siguiente etapa (fase 3)
- Construir la tabla de documentos dentro del contenido principal del dashboard.
- Completar el CRUD visual y la persistencia asociada.
