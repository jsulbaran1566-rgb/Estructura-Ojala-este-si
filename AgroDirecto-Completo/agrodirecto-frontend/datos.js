// ============================================================
// datos.js — Base de datos local compartida (sin servidor)
// Simula las tablas del SQL: usuarios, lotes, reservas, etc.
// ============================================================

const DB = {

  categorias: [
    { nombre: 'Hortaliza' },
    { nombre: 'Fruta' },
    { nombre: 'Tuberculo' },
    { nombre: 'Cereal' },
    { nombre: 'Leguminosa' },
  ],

  usuarios: [
    { id: 1,  nombre: 'Carlos Mora',          correo: 'admin@agrodirecto.com',      telefono: '3001000001', rol: 'Administrador', clave: 'admin123',  estado: 'Activo'   },
    { id: 2,  nombre: 'Finca El Paraiso SAS', correo: 'finca.paraiso@campo.com',   telefono: '3002000002', rol: 'Productor',     clave: 'prod123',   estado: 'Activo'   },
    { id: 3,  nombre: 'Agro Santa Marta',     correo: 'agro.santamarta@campo.com', telefono: '3003000003', rol: 'Productor',     clave: 'prod456',   estado: 'Activo'   },
    { id: 4,  nombre: 'Finca Los Andes',      correo: 'losandes@campo.com',        telefono: '3004000004', rol: 'Productor',     clave: 'prod789',   estado: 'Activo'   },
    { id: 5,  nombre: 'Restaurante La Plaza', correo: 'compras@laplaza.com',       telefono: '3005000005', rol: 'Comprador',     clave: 'comp123',   estado: 'Activo'   },
    { id: 6,  nombre: 'Hotel Campestre',      correo: 'suministros@hotelc.com',    telefono: '3006000006', rol: 'Comprador',     clave: 'comp456',   estado: 'Activo'   },
    { id: 7,  nombre: 'Distribuidora Norte',  correo: 'pedidos@distnorte.com',     telefono: '3007000007', rol: 'Comprador',     clave: 'comp789',   estado: 'Activo'   },
    { id: 8,  nombre: 'Maria Gonzalez',       correo: 'maria.g@campo.com',         telefono: '3008000008', rol: 'Productor',     clave: 'prod000',   estado: 'Inactivo' },
    { id: 9,  nombre: 'Supermercado Central', correo: 'central@super.com',         telefono: '3009000009', rol: 'Comprador',     clave: 'comp000',   estado: 'Activo'   },
    { id: 10, nombre: 'Juan Ramirez',         correo: 'juan.r@agro.com',           telefono: '3010000010', rol: 'Administrador', clave: 'admin456',  estado: 'Activo'   },
  ],

  compradores: [
    { id: 5, nombre: 'Restaurante La Plaza', ciudad: 'Bogota'   },
    { id: 6, nombre: 'Hotel Campestre',      ciudad: 'Medellin' },
    { id: 7, nombre: 'Distribuidora Norte',  ciudad: 'Barranquilla' },
    { id: 9, nombre: 'Supermercado Central', ciudad: 'Cali'     },
  ],

  roles: [
    { id: 1, nombre: 'Administrador', descripcion: 'Acceso total al sistema',              permisos: 'Ver, Crear, Editar, Eliminar' },
    { id: 2, nombre: 'Productor',     descripcion: 'Gestiona lotes y actualiza cosechas',  permisos: 'Ver, Crear, Editar'           },
    { id: 3, nombre: 'Comprador',     descripcion: 'Explora lotes y crea reservas',        permisos: 'Ver, Crear'                   },
    { id: 4, nombre: 'Supervisor',    descripcion: 'Revisa reportes y valida operaciones', permisos: 'Ver, Editar'                  },
  ],

  proveedores: [
    { id: 1, nombre: 'TransCarga SAS',       tipo: 'Logistica',     ciudad: 'Medellin',    telefono: '3101000001', correo: 'ops@transcarga.com',    estado: 'Activo'   },
    { id: 2, nombre: 'FrioExpress Ltda',     tipo: 'Refrigeracion', ciudad: 'Bogota',      telefono: '3101000002', correo: 'frio@express.com',      estado: 'Activo'   },
    { id: 3, nombre: 'AgroInsumos del Sur',  tipo: 'Insumos',       ciudad: 'Cali',        telefono: '3101000003', correo: 'ventas@agroinsumos.com',estado: 'Activo'   },
    { id: 4, nombre: 'EmpaqueStar',          tipo: 'Empaque',       ciudad: 'Bucaramanga', telefono: '3101000004', correo: 'info@empaquestar.com',  estado: 'Inactivo' },
    { id: 5, nombre: 'LogiCampo SAS',        tipo: 'Logistica',     ciudad: 'Pereira',     telefono: '3101000005', correo: 'logicampo@campo.com',   estado: 'Activo'   },
    { id: 6, nombre: 'Semillas del Llano',   tipo: 'Insumos',       ciudad: 'Villavicencio',telefono:'3101000006', correo: 'semillas@llano.com',    estado: 'Activo'   },
    { id: 7, nombre: 'CajaFlex Colombia',    tipo: 'Empaque',       ciudad: 'Manizales',   telefono: '3101000007', correo: 'cajaflex@col.com',      estado: 'Activo'   },
    { id: 8, nombre: 'ColdChain Andina',     tipo: 'Refrigeracion', ciudad: 'Bogota',      telefono: '3101000008', correo: 'cold@andina.com',       estado: 'Inactivo' },
  ],

  lotes: [
    { id: 1,  producto: 'Tomate Chonto',    cantidad: 2000, categoria: 'Hortaliza',   productor_id: 2, estado: 'Activo',    fecha_cosecha: '2026-07-15', kg_reservados: 500  },
    { id: 2,  producto: 'Aguacate Hass',    cantidad: 3000, categoria: 'Fruta',       productor_id: 3, estado: 'Activo',    fecha_cosecha: '2026-08-01', kg_reservados: 1200 },
    { id: 3,  producto: 'Papa Pastusa',     cantidad: 5000, categoria: 'Tuberculo',   productor_id: 4, estado: 'Activo',    fecha_cosecha: '2026-07-20', kg_reservados: 800  },
    { id: 4,  producto: 'Maiz Amarillo',    cantidad: 4000, categoria: 'Cereal',      productor_id: 2, estado: 'Activo',    fecha_cosecha: '2026-09-10', kg_reservados: 0    },
    { id: 5,  producto: 'Frijol Cargamanto',cantidad: 1500, categoria: 'Leguminosa',  productor_id: 4, estado: 'Activo',    fecha_cosecha: '2026-08-25', kg_reservados: 400  },
    { id: 6,  producto: 'Brocoli',          cantidad: 800,  categoria: 'Hortaliza',   productor_id: 2, estado: 'Activo',    fecha_cosecha: '2026-07-05', kg_reservados: 200  },
    { id: 7,  producto: 'Mango Tommy',      cantidad: 2500, categoria: 'Fruta',       productor_id: 3, estado: 'Activo',    fecha_cosecha: '2026-10-01', kg_reservados: 600  },
    { id: 8,  producto: 'Yuca',             cantidad: 3500, categoria: 'Tuberculo',   productor_id: 4, estado: 'Inactivo',  fecha_cosecha: '2026-06-30', kg_reservados: 3500 },
    { id: 9,  producto: 'Arveja Verde',     cantidad: 1000, categoria: 'Leguminosa',  productor_id: 2, estado: 'Activo',    fecha_cosecha: '2026-08-15', kg_reservados: 0    },
    { id: 10, producto: 'Platano Dominico', cantidad: 4500, categoria: 'Fruta',       productor_id: 3, estado: 'Activo',    fecha_cosecha: '2026-07-28', kg_reservados: 900  },
  ],

  reservas: [
    { id: 1, comprador_id: 5, lote_id: 1, cantidad: 300, fecha: '2026-07-15' },
    { id: 2, comprador_id: 6, lote_id: 2, cantidad: 500, fecha: '2026-08-01' },
    { id: 3, comprador_id: 7, lote_id: 3, cantidad: 400, fecha: '2026-07-20' },
    { id: 4, comprador_id: 5, lote_id: 5, cantidad: 200, fecha: '2026-08-25' },
    { id: 5, comprador_id: 9, lote_id: 2, cantidad: 700, fecha: '2026-08-01' },
    { id: 6, comprador_id: 6, lote_id: 6, cantidad: 200, fecha: '2026-07-05' },
    { id: 7, comprador_id: 7, lote_id: 7, cantidad: 300, fecha: '2026-10-01' },
    { id: 8, comprador_id: 9, lote_id: 3, cantidad: 400, fecha: '2026-07-20' },
    { id: 9, comprador_id: 5, lote_id: 10,cantidad: 600, fecha: '2026-07-28' },
  ],

  historial_seguimiento: [
    { id: 1,  accion: 'Siembra registrada',                lote: 1,  producto: 'Tomate Chonto',     fecha: '2026-03-10' },
    { id: 2,  accion: 'Control de plagas aplicado',        lote: 1,  producto: 'Tomate Chonto',     fecha: '2026-04-15' },
    { id: 3,  accion: 'Riego programado completado',       lote: 2,  producto: 'Aguacate Hass',     fecha: '2026-04-20' },
    { id: 4,  accion: 'Inicio de floracion confirmada',    lote: 2,  producto: 'Aguacate Hass',     fecha: '2026-05-01' },
    { id: 5,  accion: 'Abono organico aplicado',           lote: 3,  producto: 'Papa Pastusa',      fecha: '2026-04-25' },
    { id: 6,  accion: 'Cosecha iniciada',                  lote: 8,  producto: 'Yuca',              fecha: '2026-06-20' },
    { id: 7,  accion: 'Entrega al comprador completada',   lote: 8,  producto: 'Yuca',              fecha: '2026-06-30' },
    { id: 8,  accion: 'Siembra registrada',                lote: 4,  producto: 'Maiz Amarillo',     fecha: '2026-05-12' },
    { id: 9,  accion: 'Inspección fitosanitaria aprobada', lote: 5,  producto: 'Frijol Cargamanto', fecha: '2026-05-20' },
    { id: 10, accion: 'Lote habilitado para reservas',     lote: 9,  producto: 'Arveja Verde',      fecha: '2026-06-01' },
    { id: 11, accion: 'Primer corte de muestra tomado',    lote: 6,  producto: 'Brocoli',           fecha: '2026-06-10' },
    { id: 12, accion: 'Cosecha estimada confirmada',       lote: 7,  producto: 'Mango Tommy',       fecha: '2026-06-15' },
  ],

  historial_reservas: [
    { id: 1,  reserva_id: 1, estado: 'Pendiente',  fecha: '2026-06-01' },
    { id: 2,  reserva_id: 1, estado: 'Confirmada', fecha: '2026-06-05' },
    { id: 3,  reserva_id: 2, estado: 'Pendiente',  fecha: '2026-06-02' },
    { id: 4,  reserva_id: 2, estado: 'Confirmada', fecha: '2026-06-06' },
    { id: 5,  reserva_id: 3, estado: 'Pendiente',  fecha: '2026-06-03' },
    { id: 6,  reserva_id: 4, estado: 'Confirmada', fecha: '2026-06-07' },
    { id: 7,  reserva_id: 5, estado: 'Entregada',  fecha: '2026-06-10' },
    { id: 8,  reserva_id: 6, estado: 'Confirmada', fecha: '2026-06-08' },
    { id: 9,  reserva_id: 7, estado: 'Pendiente',  fecha: '2026-06-12' },
    { id: 10, reserva_id: 8, estado: 'Cancelada',  fecha: '2026-06-13' },
  ],

  compras: [
    { id: 1, comprador_id: 5, lote_id: 8, cantidad: 1000, fecha: '2026-06-30' },
    { id: 2, comprador_id: 6, lote_id: 8, cantidad: 2500, fecha: '2026-06-30' },
  ],

  ventas: [
    { id: 1, vendedor_id: 4, lote_id: 8, cantidad: 3500, fecha: '2026-06-30' },
  ],

  // ---- Utilidades ----
  siguienteId(tabla) {
    const lista = this[tabla];
    return lista.length ? Math.max(...lista.map(r => r.id)) + 1 : 1;
  }
};