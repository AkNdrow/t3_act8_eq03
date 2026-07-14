# Documentación de APIs

En este proyecto utilizamos la API pública **JSONPlaceholder** (https://jsonplaceholder.typicode.com) de dos maneras principales para enriquecer la funcionalidad del prototipo.

## 1. Población de Datos Inicial (Tabla CRUD)
Para inicializar la tabla de registros y no tenerla vacía en la primera carga, consumimos el endpoint `/users` para obtener una lista de nombres de usuario y los vinculamos a almacenes simulados en nuestra base local (`localStorage`).

- **Endpoint:** `GET https://jsonplaceholder.typicode.com/users`
- **Uso:** Obtención de nombres y correos de ejemplo para popular los registros de la tabla de la base de datos.

## 2. 🔐 Sistema de Autenticación Híbrido (Login)
Este prototipo demuestra la capacidad de validar credenciales utilizando una API externa real y abierta sin necesidad de complejas llaves (API Keys).

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
