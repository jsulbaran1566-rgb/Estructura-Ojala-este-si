from datetime import date
from sqlalchemy import Column, Integer, String, Date, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from Conexion.database import Base


# ================= USUARIOS =================

class Usuario(Base):
    __tablename__ = "usuarios"
    __table_args__ = (
        CheckConstraint(
            "estado IN ('Activo','Inactivo')",
            name="chk_usuarios_estado",
        ),
    )

    id               = Column(Integer, primary_key=True, index=True)
    tipo_documento   = Column(
        String(4),
        ForeignKey("tipos_documento.codigo", onupdate="CASCADE", ondelete="RESTRICT"),
        nullable=False
    )
    numero_documento = Column(String(30), unique=True, nullable=False)
    nombre           = Column(String(150), nullable=False)
    correo         = Column(String(150), unique=True, nullable=False)
    telefono       = Column(String(20),  unique=True, nullable=False)
    clave          = Column(String(255), nullable=False)
    direccion      = Column(String(200), nullable=True)
    ciudad         = Column(String(100), nullable=True)
    empresa        = Column(String(150), nullable=True)
    rol_id         = Column(Integer,     ForeignKey("roles.id", onupdate="CASCADE", ondelete="RESTRICT"), nullable=False)
    estado         = Column(String(20),  nullable=False, default="Activo")
    fecha_registro = Column(Date,        nullable=False,  default=date.today)

    tipo_documento_rel = relationship("TipoDocumento", back_populates="usuarios")
    rol_rel            = relationship("Rol",           back_populates="usuarios")
    lotes    = relationship("Lote",    back_populates="productor")
    ventas   = relationship("Venta",   back_populates="vendedor")
    reservas = relationship("Reserva", back_populates="comprador")
    compras  = relationship("Compra",  back_populates="comprador")
