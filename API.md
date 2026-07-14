# Documentación de APIs

En este proyecto utilizamos dos APIs públicas diferentes para demostrar distintas capacidades técnicas: **DummyJSON** para las operaciones CRUD de la tabla principal, y **JSONPlaceholder** para el sistema de autenticación.

## 1. Operaciones CRUD (Tabla de Datos)
Para poblar la tabla principal del sistema y demostrar el funcionamiento de un CRUD (Crear, Leer, Actualizar, Eliminar) interactuando con un backend real, consumimos la API pública de **DummyJSON**.

- **API Base:** `https://dummyjson.com`
- **Módulo:** Productos (utilizados en este contexto como inventario/almacenes).
- **Endpoints utilizados:**
  - **GET** `/products?limit=10&skip=0` - Obtiene la lista inicial de registros para popular la tabla (paginada).
  - **GET** `/products/search?q={query}` - Búsqueda en tiempo real.
  - **POST** `/products/add` - Simula la creación de un nuevo registro.
  - **PUT** `/products/{id}` - Simula la edición y actualización de un registro existente.
  - **DELETE** `/products/{id}` - Simula la eliminación de un registro.

*Nota: Al ser un entorno de pruebas público, DummyJSON simula las peticiones POST, PUT y DELETE devolviendo el objeto modificado de forma exitosa, pero no muta su base de datos real.*

## 2. 🔐 Sistema de Autenticación Híbrido (Login)
Este prototipo demuestra la capacidad de validar credenciales utilizando una API externa real y abierta sin necesidad de complejas llaves (API Keys). Para esto, se utiliza **JSONPlaceholder**.

Existen dos maneras en las que funciona nuestro sistema de Login:

### A. Validación Local (Simulada)
Si ingresas con los usuarios locales (`Andres` o `Moises`) usando sus respectivas contraseñas estáticas, el sistema los valida de forma rápida y local. Ideal para pruebas rápidas de interfaz.

### B. Validación por API Externa (JSONPlaceholder)
Si ingresas cualquier correo válido de prueba existente en la API (por ejemplo `Sincere@april.biz`) y cualquier texto en la contraseña, la página realiza una petición HTTP `GET` a la API:
- **Endpoint:** `GET https://jsonplaceholder.typicode.com/users?email=[correo_ingresado]`
- **Comportamiento:** Si la API responde positivamente y valida que el correo existe en su base de datos, extraemos la información real de dicho usuario desde la API (Nombre, ID, Correo) y le permitimos el acceso a nuestro sistema. 
- **Manejo de Sesión:** Tras validar con éxito, generamos un **Token** simulado combinando la firma y el ID devuelto por la API, y lo guardamos en el `localStorage` para proteger las rutas privadas.

---
*Para ver la lista de usuarios válidos para probar la autenticación por API, puedes visitar directamente [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users).*
