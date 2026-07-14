# Proyecto: Sistema de Login y Tabla CRUD

Este proyecto es un prototipo desarrollado en React (utilizando Vite) que incluye:
- Un sistema de Login básico.
- Un Dashboard con una barra lateral (Sidebar) y barra de navegación (Navbar).
- Una tabla interactiva (CRUD) con paginación para gestionar registros (Almacenes y Tareas).
- Persistencia de datos local utilizando `localStorage`.

## Datos de Entrega
- **Integrantes del Equipo:** [Nombre del Integrante 1], [Nombre del Integrante 2]
- **API utilizada para la tabla de datos:** JSONPlaceholder (https://jsonplaceholder.typicode.com/users) para la simulación inicial, además de generación de datos en JSON local.
- **Enlace al proyecto desplegado:** http://IP_DE_SU_VPS/t3_act8_eq03

---

## 🚀 Cómo ejecutarlo en tu computadora (Local)

1. Abre una terminal y navega hasta la carpeta del proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en la URL que te indique la consola (usualmente `http://localhost:5173`).

---

## 🌍 Guía de Despliegue en un VPS desde CERO (Ubuntu/Debian)

Si tu servidor VPS (Virtual Private Server) está completamente nuevo y vacío, aquí tienes los pasos desde cero para publicar tu aplicación para que cualquier persona en internet pueda verla.

### Paso 1: Conectarte a tu VPS
Abre una terminal (Símbolo del sistema o PowerShell en Windows) y conéctate a tu servidor usando SSH. Te pedirá la contraseña del servidor.
```bash
ssh root@<IP_DE_TU_VPS>
```
*(Cambia `root` por tu usuario si te dieron uno distinto, y `<IP_DE_TU_VPS>` por la dirección IP real de tu servidor).*

### Paso 2: Actualizar el servidor e instalar herramientas básicas
Una vez dentro de la consola del VPS, ejecuta los siguientes comandos uno por uno para instalar **Git** (para clonar tu código), **Node.js** (para construir la app) y **Nginx** (el servidor web que mostrará tu página al público).

```bash
# 1. Actualizar la lista de paquetes del sistema
apt update && apt upgrade -y

# 2. Instalar Nginx y Git
apt install nginx git -y

# 3. Instalar Node.js (usaremos Node 20 que es muy actual)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```
Para comprobar que Node se instaló correctamente, puedes escribir `node -v` y te debería mostrar la versión instalada.

### Paso 3: Clonar tu proyecto de GitHub
Ahora vamos a descargar el código fuente a tu VPS.
```bash
# Navegamos a la carpeta donde alojaremos la web
cd /var/www

# Clonamos tu repositorio (Pondrá tu proyecto en una carpeta)
git clone https://github.com/AkNdrow/t3_act8_eq03.git

# Entramos a la carpeta que se acaba de descargar
cd t3_act8_eq03
```

### Paso 4: Instalar dependencias y empaquetar el proyecto (Build)
Ahora prepararemos el proyecto para producción. Esto creará una carpeta llamada `dist` que contiene solo el HTML, CSS y JS puro y optimizado.
```bash
# Instalamos las librerías del proyecto
npm install

# Construimos la versión para producción
npm run build
```

### Paso 5: Configurar Nginx para mostrar tu proyecto
Le tenemos que decir a Nginx dónde encontrar los archivos de tu proyecto web (la carpeta `dist` que acabas de generar).

1. Abre el archivo de configuración por defecto de Nginx con el editor `nano`:
   ```bash
   nano /etc/nginx/sites-available/default
   ```
2. Borra todo lo que hay ahí dentro y pega la siguiente configuración:

   ```nginx
   server {
       listen 80 default_server;
       listen [::]:80 default_server;

       server_name _;

       # Servir tu app en la subcarpeta que pide la actividad
       location /t3_act8_eq03 {
           alias /var/www/t3_act8_eq03/dist;
           try_files $uri $uri/ /t3_act8_eq03/index.html;
       }
   }
   ```
3. Guarda el archivo en `nano` presionando `Ctrl + O`, luego `Enter`, y sal presionando `Ctrl + X`.

### Paso 6: Reiniciar Nginx y probar
Revisamos que no haya errores de sintaxis en el archivo que acabamos de crear y reiniciamos el servidor web:
```bash
# Verifica que todo está bien (debe decir "syntax is ok")
nginx -t

# Reinicia el servicio para aplicar los cambios
systemctl restart nginx
```

### 🎉 ¡Listo!
Si abres tu navegador de internet (Chrome, Edge, etc.) y escribes la **Dirección IP de tu VPS**, ¡deberías ver tu proyecto de React funcionando en vivo en internet!
