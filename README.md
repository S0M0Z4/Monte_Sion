# Anuncios Públicos - Iglesia Monte Sion

PWA pública para consultar los anuncios que el administrador publica desde el Gestor de Anuncios.

## Funciones
- Diseño responsivo para computadora y teléfono.
- Encabezado limpio con el icono público de la aplicación.
- Inicio, Anuncios, Departamentos y Notificaciones con navegación sencilla.
- El botón de notificaciones no es el botón central principal.
- Instalación como PWA.
- El botón **Instalar** desaparece después de instalarse y la barra móvil se reorganiza sin espacios vacíos.
- Actualización en tiempo real desde Firebase.
- Filtros por texto, departamento y fecha.
- Vista completa y descarga de archivos adjuntos.
- Centro de notificaciones.

## Firebase
Conserva la misma configuración del proyecto y escucha:

```text
publicAnnouncements/{id}
publicNotifications/{id}
```

`publicAnnouncements` contiene los anuncios que el administrador marcó como públicos. `publicNotifications` contiene las señales generadas por el gestor.

## Estructura
```text
/
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── README.md
└── icon/
    ├── logo.png
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

Bootstrap Icons se carga desde CDN.

## Notificaciones
La aplicación escucha las notificaciones públicas en tiempo real. Para recibir push con la PWA completamente cerrada todavía se requiere configurar Firebase Cloud Messaging (FCM) y su clave VAPID/servicio de envío.
