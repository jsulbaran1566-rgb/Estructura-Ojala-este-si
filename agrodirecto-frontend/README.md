# AgroDirecto — Frontend

Plataforma de comercio agrícola directo entre productores y compradores (restaurantes, hoteles, distribuidores). Es un sitio estático (HTML + CSS + JS sin framework ni build) que consume la API REST de `estructura-api` mediante `fetch`. No guarda datos localmente: todo lo que se ve viene de la base de datos a través del backend.

---

## Tecnologías

- **HTML5** — estructura semántica de todas las páginas, sin frameworks ni plantillas.
- **CSS3** — estilos en `estilo.css`, con variables personalizadas (custom properties), Flexbox para layouts, y diseño responsive.
- **JavaScript (Vanilla, ES6+)** — sin frameworks (React, Vue, etc.) ni build tools (Webpack, Vite). Uso de `fetch`, `async/await`, módulos de funciones por archivo y manipulación directa del DOM.
- **Fetch API** — toda la comunicación con el backend pasa por `api.js`, que envuelve `fetch` en funciones específicas por dominio (usuarios, lotes, reservas, etc.).
- **sessionStorage** — persistencia de la sesión del usuario (token JWT y datos básicos) mientras dura la pestaña del navegador.
- **JWT (JSON Web Tokens)** — autenticación: el token se recibe en el login y se envía como `Authorization: Bearer` en cada petición protegida.
- **Google Fonts** — tipografías del sitio.
- **Live Server (VS Code)** — servidor de desarrollo estático necesario para que el CORS del backend acepte las peticiones (no funciona con `file://`).

> No se usa ningún framework de frontend ni gestor de paquetes (npm/yarn): es un proyecto 100% estático pensado para consumirse directo desde el navegador.

---

## Archivos principales

**`api.js`** es el conector entre el frontend y el backend (FastAPI). Todas las páginas hablan con la API a través de las funciones de este archivo — ninguna página usa `fetch` directamente. Se importa con `<script src="api.js">` antes del script propio de cada página.

- `API_URL` apunta a `http://127.0.0.1:8000`. Cambiar esta constante si el backend corre en otra dirección.
- `peticion(ruta, opciones)` es la función base: arma los encabezados (incluye el token JWT guardado en `sessionStorage` si existe), hace el `fetch`, y lanza un `Error` si el backend responde `success: false`. El backend siempre responde en el formato `{ success, message, data, error }`.
- Expone funciones específicas por dominio: autenticación (`iniciarSesion`, `cerrarSesion`, `haySesionActiva`), usuarios, lotes, roles, reservas, categorías, tipos de documento, proveedores, favoritos y soporte — un wrapper por cada endpoint del backend.
- `obtenerUsuarioActual()` lee de `sessionStorage` los datos básicos del usuario logueado (`id`, `nombre`, `correo`, `rol`) para usarlos en cualquier página sin volver a pedirlos a la API.

**`estilo.css`** maneja el diseño de todo el sitio: la nav, el hero, las tarjetas, las tablas, los modales, los formularios, los badges, los chips de rol y el layout de los paneles internos. Es el archivo compartido entre todas las páginas.

**`img/logo.jpeg`** es el logo del sitio; las demás imágenes (fotos de cultivos, hero, galería de contacto) se cargan desde URLs externas, no desde este proyecto.

---

## Autenticación

`login.html` llama a `iniciarSesion(correo, clave)`, que hace `POST /auth/login` contra el backend. Si las credenciales son válidas, la API responde con un token JWT y los datos del usuario; `api.js` guarda en `sessionStorage` el `token`, `usuario_id`, `usuario_nombre`, `usuario_correo` y `usuario_rol`, y ese token se manda como `Authorization: Bearer` en cada petición posterior. Según el rol devuelto, `login.html` redirige a:

- **Administrador** → `panel_admin.html`
- **Productor** → `panel_productor.html`
- **Comprador** → `panel_comprador.html`

`registro.html` crea un usuario nuevo con `registrarUsuario(...)` (`POST /usuarios`), pidiendo primero los roles disponibles (`GET /roles`) para asociar el `rol_id` correcto al elegido en el formulario ("Yo soy un...").

`cerrarSesion()` limpia todo el `sessionStorage` y redirige a `login.html`. Las páginas de panel deberían comprobar `haySesionActiva()` al cargar para evitar accesos sin login (no hay validación de token en el propio backend todavía, ver Notas técnicas).

---

## Páginas públicas

`index.html` — la landing. Explica qué es AgroDirecto y muestra estadísticas dinámicas obtenidas de la API (lotes activos, compradores, categorías, proveedores).

`nosotros.html` — contexto del proyecto, los servicios que ofrece y el equipo detrás.

`contacto.html` — canales de contacto, galería de imágenes agrícolas y un formulario de contacto que envía el mensaje a `POST /soporte` a través de `enviarSoporte(...)`.

`login.html` — inicio de sesión real contra el backend (ver sección Autenticación).

`registro.html` — registro de nuevos usuarios (productores o compradores) contra el backend.

---

## Panel de Administrador (requiere login, rol Administrador)

`panel_admin.html` — resumen general con estadísticas y tablas de usuarios/proveedores recientes obtenidas de la API. Enlaza a las páginas de gestión de abajo.

`usuarios.html` — CRUD completo de usuarios (`GET/POST/PUT/DELETE /usuarios`), con filtros por nombre/correo y rol. El modal permite crear o editar; al editar se puede cambiar la contraseña dejando el campo vacío para no tocarla.

`roles.html` — CRUD de roles del sistema (`/roles`). Muestra cuántos usuarios tiene asignado cada rol.

`proveedores.html` — CRUD de proveedores logísticos e insumos (`/proveedores`). Filtro por nombre/ciudad y tipo de servicio.

`lotes.html` — CRUD de lotes de cultivo (`/lotes`). Asocia cada lote a un productor. Muestra kg totales, kg reservados, categoría y fecha estimada de cosecha.

`historial.html` — dos vistas en pestañas: seguimiento de cultivos (`/historial_seguimiento`) y estados de reservas (`/historial_reservas`). Permite agregar o editar registros de seguimiento.

`soporte.html` — bandeja de tickets de soporte enviados desde cualquier panel (`GET /soporte`); permite cambiar su estado (`Pendiente`, `En proceso`, `Resuelto`) y eliminarlos.

---

## Panel de Productor (requiere login, rol Productor)

`panel_productor.html` — resumen del productor: sus lotes, ventas y accesos rápidos.

`mis_cultivos.html` — gestión de los lotes propios del productor (crear, editar, cambiar estado).

`trazabilidad.html` — seguimiento del historial de acciones sobre los lotes del productor.

`ventas_pagos.html` — historial de ventas y pagos recibidos por el productor.

`reportes.html` — reportes/estadísticas de la actividad del productor.

`perfil.html` — edición de los datos personales del usuario logueado (compartida con el panel de comprador).

---

## Panel de Comprador (requiere login, rol Comprador)

`panel_comprador.html` — resumen del comprador: reservas activas, accesos rápidos.

`explorar_lotes.html` — catálogo de lotes disponibles de todos los productores, con filtros por categoría; permite reservar (`POST /reservas`).

`mis_reservas.html` — historial y estado de las reservas hechas por el comprador (`/reservas` filtrado por `comprador_id`).

`entregas.html` — próximas entregas asociadas a las reservas del comprador.

`pagos.html` — pagos y facturas del comprador.

`productores_favoritos.html` — productores marcados como favoritos (`/favoritos`), para acceder rápido a sus lotes.

`perfil.html` — edición de los datos personales del usuario logueado (compartida con el panel de productor).

---

## Datos de ejemplo (seed)

El backend trae un script SQL con usuarios de ejemplo (`agro_mercado_postgres.sql`, ver README de `estructura-api`) para probar el login sin registrar una cuenta nueva:

```
Admin:      admin@agrodirecto.com      / admin123
Productor:  finca.paraiso@campo.com    / prod123
Comprador:  compras@laplaza.com        / comp123
```

---

## Notas técnicas

- El frontend **no funciona solo**: necesita la API de `estructura-api` corriendo en `http://127.0.0.1:8000` (ver el README de esa carpeta para instalarla y levantarla).
- Este proyecto es estático: para que el CORS del backend lo acepte, debe servirse desde `http://127.0.0.1:5500` o `http://localhost:5500` (por ejemplo con la extensión "Live Server" de VS Code), no abriendo los `.html` directamente con `file://`.
- La sesión se guarda en `sessionStorage` (token JWT + datos básicos del usuario) y se pierde al cerrar la pestaña. El backend actualmente no valida el token en sus rutas protegidas, así que el control de acceso por rol vive solo en el frontend.
- Las imágenes decorativas (hero, galería de contacto, fotos de cultivos) vienen de URLs externas (Unsplash y otros sitios), no están incluidas en el proyecto.
- Los modales se abren/cierran añadiendo/quitando la clase `abierto` al contenedor `.fondo-modal`.
- Las alertas dentro de los modales usan las clases `alerta alerta-ok visible` o `alerta alerta-error visible` definidas en `estilo.css`.