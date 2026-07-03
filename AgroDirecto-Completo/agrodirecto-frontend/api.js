// api.js — Conector entre el frontend y el backend (FastAPI)
// Aqui van todas las funciones que hablan con la API. Las paginas HTML
// solo llaman estas funciones, no usan fetch directamente.

// 1. Direccion base de la API
const API_URL = "http://127.0.0.1:8000";


// ============================================================
// FUNCION BASE — hace la peticion y devuelve los datos ya listos
// ============================================================

async function peticion(ruta, opciones = {}) {
    // 1. Armamos los encabezados. Si hay token guardado, lo mandamos siempre.
    const encabezados = { "Content-Type": "application/json" };
    const token = sessionStorage.getItem("token");
    if (token) {
        encabezados["Authorization"] = `Bearer ${token}`;
    }

    // 2. Hacemos la peticion
    const respuesta = await fetch(`${API_URL}${ruta}`, {
        ...opciones,
        headers: { ...encabezados, ...opciones.headers },
    });

    // 3. El backend siempre responde en formato { success, message, data, error }
    const cuerpo = await respuesta.json();

    if (!cuerpo.success) {
        throw new Error(cuerpo.message || "Ocurrio un error en la peticion");
    }

    return cuerpo.data;
}


// ============================================================
// AUTENTICACION
// ============================================================

// Inicia sesion. Si todo sale bien, guarda el token y los datos del usuario.
async function iniciarSesion(correo, clave) {
    const datos = await peticion("/auth/login", {
        method: "POST",
        body: JSON.stringify({ correo, clave }),
    });

    // Guardamos el token y los datos basicos del usuario para usarlos despues
    sessionStorage.setItem("token", datos.token);
    sessionStorage.setItem("usuario_id", datos.usuario.id);
    sessionStorage.setItem("usuario_nombre", datos.usuario.nombre);
    sessionStorage.setItem("usuario_correo", datos.usuario.correo);
    sessionStorage.setItem("usuario_rol", datos.usuario.rol);

    return datos.usuario;
}

// Cierra la sesion: borra todo lo guardado y manda al login
function cerrarSesion() {
    sessionStorage.clear();
    location.href = "login.html";
}

// Revisa si hay una sesion activa (util para proteger paginas de panel)
function haySesionActiva() {
    return !!sessionStorage.getItem("token");
}


// ============================================================
// USUARIOS
// ============================================================

async function obtenerUsuarios(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/usuarios${params ? "?" + params : ""}`);
}

async function registrarUsuario(usuario) {
    return peticion("/usuarios", {
        method: "POST",
        body: JSON.stringify(usuario),
    });
}

async function editarUsuarioApi(id, cambios) {
    return peticion(`/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify(cambios),
    });
}

async function eliminarUsuarioApi(id) {
    return peticion(`/usuarios/${id}?confirmar=true`, {
        method: "DELETE",
    });
}


// ============================================================
// LOTES
// ============================================================

async function obtenerLotes(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/lotes${params ? "?" + params : ""}`);
}

async function registrarLote(lote) {
    return peticion("/lotes", {
        method: "POST",
        body: JSON.stringify(lote),
    });
}

async function editarLoteApi(id, cambios) {
    return peticion(`/lotes/${id}`, {
        method: "PUT",
        body: JSON.stringify(cambios),
    });
}

async function eliminarLoteApi(id) {
    return peticion(`/lotes/${id}?confirmar=true`, {
        method: "DELETE",
    });
}


// ============================================================
// ROLES
// ============================================================

async function obtenerRoles() {
    return peticion("/roles");
}

async function registrarRol(rol) {
    return peticion("/roles", {
        method: "POST",
        body: JSON.stringify(rol),
    });
}

async function editarRolApi(id, cambios) {
    return peticion(`/roles/${id}`, {
        method: "PUT",
        body: JSON.stringify(cambios),
    });
}

async function eliminarRolApi(id) {
    return peticion(`/roles/${id}?confirmar=true`, {
        method: "DELETE",
    });
}


// ============================================================
// RESERVAS
// ============================================================

async function obtenerReservas(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/reservas${params ? "?" + params : ""}`);
}

async function crearReserva(reserva) {
    return peticion("/reservas", {
        method: "POST",
        body: JSON.stringify(reserva),
    });
}

async function editarEstadoReserva(id, cambios) {
    return peticion(`/reservas/${id}/estado`, {
        method: "PUT",
        body: JSON.stringify(cambios),
    });
}

async function eliminarReservaApi(id) {
    return peticion(`/reservas/${id}?confirmar=true`, {
        method: "DELETE",
    });
}


// ============================================================
// CATEGORIAS
// ============================================================

async function obtenerCategorias() {
    return peticion("/categorias");
}

async function obtenerLotesPorCategoria(nombre, filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/categorias/${encodeURIComponent(nombre)}/lotes${params ? "?" + params : ""}`);
}

async function registrarCategoria(categoria) {
    return peticion("/categorias", {
        method: "POST",
        body: JSON.stringify(categoria),
    });
}

async function editarCategoriaApi(nombre, cambios) {
    return peticion(`/categorias/${encodeURIComponent(nombre)}`, {
        method: "PUT",
        body: JSON.stringify(cambios),
    });
}

async function eliminarCategoriaApi(nombre) {
    return peticion(`/categorias/${encodeURIComponent(nombre)}`, {
        method: "DELETE",
    });
}


// ============================================================
// TIPOS DE DOCUMENTO
// ============================================================

async function obtenerTiposDocumento() {
    return peticion("/tipos_documento");
}

async function obtenerHistorialSeguimiento(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/historial_seguimiento${params ? "?" + params : ""}`);
}

async function obtenerCompras(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/compras${params ? "?" + params : ""}`);
}

async function obtenerVentas(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/ventas${params ? "?" + params : ""}`);
}

async function obtenerHistorialReservas(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/historial_reservas${params ? "?" + params : ""}`);
}


// ============================================================
// PROVEEDORES
// ============================================================

async function obtenerProveedores(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return peticion(`/proveedores${params ? "?" + params : ""}`);
}

async function obtenerProveedorPorId(id) {
    return peticion(`/proveedores/${id}`);
}

async function registrarProveedor(proveedor) {
    return peticion("/proveedores", {
        method: "POST",
        body: JSON.stringify(proveedor),
    });
}

async function editarProveedorApi(id, cambios) {
    return peticion(`/proveedores/${id}`, {
        method: "PUT",
        body: JSON.stringify(cambios),
    });
}

async function eliminarProveedorApi(id) {
    return peticion(`/proveedores/${id}?confirmar=true`, {
        method: "DELETE",
    });
}


// ============================================================
// UTILIDADES
// ============================================================

function obtenerUsuarioActual() {
    return {
        id: parseInt(sessionStorage.getItem("usuario_id")) || 0,
        nombre: sessionStorage.getItem("usuario_nombre") || "",
        correo: sessionStorage.getItem("usuario_correo") || "",
        rol: sessionStorage.getItem("usuario_rol") || "",
    };
}