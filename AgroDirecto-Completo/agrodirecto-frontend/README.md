# AgroDirecto — Frontend

Plataforma de comercio agrícola directo entre productores y compradores (restaurantes, hoteles, distribuidores). Todo el frontend corre en el navegador sin servidor: los datos viven en `datos.js` como un objeto global `DB` que simula las tablas de la base de datos.

---

## Archivos principales

**`datos.js`** es el núcleo de todo. Contiene los arreglos de usuarios, lotes, reservas, proveedores, roles e historial. Cualquier página que necesite datos lo importa con un simple `<script src="datos.js">`. Hay una función utilitaria `DB.siguienteId(tabla)` para generar IDs al crear registros nuevos.

**`estilo.css`** maneja el diseño de todo el sitio: la nav, el hero, las tarjetas, las tablas, los modales, los formularios, los badges, los chips de rol y el layout del panel de administración. Es el archivo compartido entre todas las páginas.

---

## Páginas públicas

`index.html` — la landing. Explica qué es AgroDirecto, muestra estadísticas dinámicas sacadas de `DB` (lotes activos, compradores, categorías, proveedores).

`nosotros.html` — contexto del proyecto, los servicios que ofrece y el equipo detrás.

`contacto.html` — canales de contacto + galería de productos agrícolas + formulario (solo frontend, no envía nada real).

`login.html` — busca al usuario en `DB.usuarios` por correo, contraseña y estado activo. Si coincide, guarda `usuario_id`, `usuario_nombre` y `usuario_rol` en `sessionStorage` y redirige al panel correspondiente.

`registro.html` — crea un nuevo usuario en `DB.usuarios`. Si el rol es Comprador, también lo agrega a `DB.compradores`.

---

## Paneles internos (requieren login)

**`panel_admin.html`** — resumen general con estadísticas y tablas de usuarios/proveedores recientes. Solo de lectura, los enlaces llevan a las páginas de gestión.

**`usuarios.html`** — CRUD completo de usuarios con filtros por nombre/correo y rol. El modal permite crear o editar; al editar se puede cambiar la contraseña dejando el campo vacío para no tocarla.

**`roles.html`** — CRUD de roles del sistema. Muestra cuántos usuarios tiene asignado cada rol.

**`proveedores.html`** — CRUD de proveedores logísticos e insumos. Filtro por nombre/ciudad y tipo de servicio.

**`lotes.html`** — CRUD de lotes de cultivo. Asocia cada lote a un productor. Muestra kg totales, kg reservados, categoría y fecha estimada de cosecha.

**`historial.html`** — dos vistas en pestañas: seguimiento de cultivos y estados de reservas. Permite agregar o editar registros de seguimiento.

**`panel_comprador.html`** y **`panel_productor.html`** — paneles específicos por rol (comprador y productor respectivamente).

---

## Credenciales de prueba

```
Admin:     admin@agrodirecto.com   / admin123
Productor: finca.paraiso@campo.com / prod123
Comprador: compras@laplaza.com     / comp123
```

---

## Notas técnicas

- No hay backend ni base de datos real. Los cambios que se hacen en una sesión se pierden al recargar la página porque `DB` vive solo en memoria.
- La autenticación es simulada con `sessionStorage`. No hay tokens ni verificación real.
- Las imágenes del proyecto vienen de Unsplash (`images.unsplash.com/photo-{id}`) o de otros CDN públicos.
- Los modales se abren/cierran añadiendo/quitando la clase `abierto` al contenedor `.fondo-modal`.
- Las alertas dentro de los modales usan las clases `alerta alerta-ok visible` o `alerta alerta-error visible` definidas en `estilo.css`.
