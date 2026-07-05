from datetime import date
from sqlalchemy import Column, Integer, String, Date, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from Conexion.database import Base


# ================= RESERVAS =================
# El estado se guarda directamente en la tabla.
# historial_reservas actúa como bitácora de cada cambio de estado.

class Reserva(Base):
    __tablename__ = "reservas"
    __table_args__ = (
        CheckConstraint("cantidad > 0", name="chk_reservas_cant"),
        CheckConstraint(
            "estado IN ('Pendiente','Confirmada','Cancelada','Entregada')",
            name="chk_reserva_estado",
        ),
    )

    id           = Column(Integer, primary_key=True, index=True)
    comprador_id = Column(Integer, ForeignKey("usuarios.id", ondelete="RESTRICT"), nullable=False)
    lote_id      = Column(Integer, ForeignKey("lotes.id",    ondelete="RESTRICT"), nullable=False)
    cantidad     = Column(Integer, nullable=False)
    fecha        = Column(Date,    nullable=False, default=date.today)
    estado       = Column(String(20), nullable=False, default="Pendiente")

    comprador         = relationship("Usuario", back_populates="reservas")
    lote              = relationship("Lote",      back_populates="reservas")
    historial_estados = relationship(
        "HistorialReserva",
        back_populates="reserva_rel",
        order_by="HistorialReserva.id",
    )
