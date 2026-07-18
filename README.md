# Anuncios Públicos — Iglesia Monte Sion

Aplicación web pública e instalable (PWA) para consultar anuncios publicados desde el **Gestor de Anuncios**.

## Estructura

```text
/
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── README.md
├── assets/
│   └── bootstrap-icons.min.css
└── icon/
    ├── logo.png
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

## Firebase

La aplicación conserva la misma configuración de Firebase del Gestor y escucha estas rutas:

```text
publicAnnouncements/{id}
publicNotifications/{id}
```

- `publicAnnouncements` contiene únicamente los anuncios que el administrador marcó con **Mostrar al público**.
- `publicNotifications` contiene los avisos generados por el gestor al publicar anuncios.
- Cuando el administrador usa **Ocultar del público**, el gestor elimina el registro público y desaparece automáticamente de esta aplicación.

## Funciones

- Diseño responsivo con escritorio, teléfono y navegación móvil.
- Instalación como aplicación mediante Chrome, Edge o Safari.
- Actualización en tiempo real desde Firebase.
- Filtros por texto, departamento y fecha.
- Vista completa de cada anuncio.
- Vista previa de imágenes, videos y PDF.
- Descarga de todos los archivos adjuntos.
- Centro de notificaciones y aviso del navegador cuando la aplicación está abierta.

## Notificaciones

El usuario debe pulsar **Activar notificaciones** y aceptar el permiso del navegador. Con la arquitectura actual, los avisos del sistema se muestran cuando la aplicación se encuentra abierta o ejecutándose. Para recibir notificaciones con la aplicación completamente cerrada se requiere integrar Firebase Cloud Messaging y un servicio que envíe notificaciones push.

## Publicación

Para que la instalación PWA funcione, publica el proyecto mediante HTTPS. GitHub Pages, Firebase Hosting y Netlify son compatibles.
