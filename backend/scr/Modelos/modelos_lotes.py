from sqlalchemy import Column, Integer, String, Date, ForeignKey, CheckConstraint, Numeric
from sqlalchemy.orm import relationship
from Conexion.database import Base


# ================= LOTES =================

class Lote(Base):
    __tablename__ = "lotes"
    __table_args__ = (
        CheckConstraint("cantidad > 0",             name="chk_lotes_cant"),
        CheckConstraint("kg_reservados >= 0",       name="chk_lote_reservados"),
        CheckConstraint("estado IN ('Activo','Inactivo')", name="chk_lote_estado"),
    )

    id            = Column(Integer,       primary_key=True, index=True)
    producto      = Column(String(150),   nullable=False)
    cantidad      = Column(Integer,       nullable=False)
    categoria     = Column(String(100),   ForeignKey("categorias.nombre", onupdate="CASCADE", ondelete="RESTRICT"), nullable=False)
    productor_id  = Column(Integer,       ForeignKey("usuarios.id", ondelete="RESTRICT"), nullable=False)
    estado        = Column(String(20),    nullable=False, default="Activo")
    fecha_cosecha = Column(Date,          nullable=True)
    kg_reservados = Column(Integer,       nullable=False, default=0)
    precio_kg     = Column(Numeric(10,2), nullable=True)

    categoria_rel = relationship("Categoria",           back_populates="lotes")
    productor     = relationship("Usuario",             back_populates="lotes")
    reservas      = relationship("Reserva",             back_populates="lote")
    historial     = relationship("HistorialSeguimiento",back_populates="lote_rel")
    compras       = relationship("Compra",              back_populates="lote")
    ventas        = relationship("Venta",               back_populates="lote")
