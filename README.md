# 🎭 Persona 3 Reload - Developer Portfolio

Un sitio web de portafolio interactivo inspirado en la interfaz gráfica, efectos de sonido, transiciones y estética del videojuego **Persona 3 Reload**.

---

## 📌 Descripción del Proyecto

Este proyecto es una plataforma web interactiva diseñada para presentar la experiencia, proyectos, habilidades e información de contacto del desarrollador con una experiencia inmersiva basada en el universo de *Persona 3*. Incluye:

- **Menú Principal interactivo** con clips de video de fondo, música e integración de SFX de audio.
- **Sección Sobre Mí (`/about`)**: Información personal y trayecto profesional.
- **Sección de Currículum (`/resume`)**: Galería de habilidades técnicas e interactivas.
- **Sección de Redes y Proyectos (`/socials`)**: Enlaces directos a redes y repositorios de proyectos.
- **Formulario de Contacto**: Integrado dinámicamente con EmailJS para el envío de mensajes en tiempo real.

---

## 🛠️ Tecnologías e Infraestructura

El proyecto está construido utilizando la siguiente pila tecnológica:

- **Core & Build Tool:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Enrutamiento:** [React Router DOM (v7)](https://reactrouter.com/)
- **Animaciones y Transiciones:** [Framer Motion](https://www.framer.com/motion/)
- **Servicio de Correo:** [@emailjs/browser](https://www.emailjs.com/) para gestión de envíos desde el frontend.
- **Estilos y Media:** Vanilla CSS modular con integración de reproductores multimedia para video HTML5 (`.mp4`) y audio (`.mp3`).

---

## ⚙️ Configuración y Variables de Entorno

### 1. Requisitos Previos
Tener instalado Node.js (v18 o superior) y npm.

### 2. Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/themultidevvv-sys/persona3-portfolio.git
cd persona3-portfolio

# Instalar dependencias
npm install
```

### 3. Variables de Entorno (`.env`)

Crea un archivo `.env` en la raíz del proyecto (puedes tomar como guía el archivo `.env.example`):

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

> **Nota:** En Vite, las variables accesibles en el navegador deben comenzar obligatoriamente con el prefijo `VITE_`.

### 4. Ejecución en Desarrollo

```bash
npm run dev
```


## 👥 Créditos y Plantilla Original

- **Autor Original de la Plantilla:** [Walid Bouhenika](https://github.com/)
- **Propietario y Desarrollador del Portafolio:** **Elias Taveras** 


## ⚖️ Derechos de Autor y Copyright

- Todos los activos visuales (arte gráfico, videos de fondo, interfaz de usuario) y de audio (música y efectos de sonido) utilizados en este proyecto están inspirados en y pertenecen al videojuego **Persona 3 Reload**.
- Copyright © **ATLUS** / **SEGA**. Todos los derechos reservados.
- *Este proyecto es una iniciativa personal sin fines de lucro realizada con fines educativos y de portafolio.*
