from datetime import date
from typing import Optional
from pydantic import BaseModel, field_validator


# ================= LOTES =================

class LoteCrear(BaseModel):
    id: int
    producto: str
    cantidad: int
    categoria: str
    productor_id: int
    estado: str = "Activo"
    fecha_cosecha: Optional[date] = None
    precio_kg: Optional[float] = None

    @field_validator("id", "productor_id")
    @classmethod
    def ids_positivos(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("Los ids deben ser números positivos")
        return v

    @field_validator("cantidad")
    @classmethod
    def cantidad_positiva(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("La cantidad debe ser mayor a 0")
        return v

    @field_validator("estado")
    @classmethod
    def estado_valido(cls, v: str) -> str:
        if v not in ("Activo", "Inactivo"):
            raise ValueError("El estado debe ser 'Activo' o 'Inactivo'")
        return v

    @field_validator("precio_kg")
    @classmethod
    def precio_positivo(cls, v: Optional[float]) -> Optional[float]:
        if v is not None and v < 0:
            raise ValueError("El precio por kg no puede ser negativo")
        return v


class LoteEditar(BaseModel):
    producto:      Optional[str]   = None
    cantidad:      Optional[int]   = None
    categoria:     Optional[str]   = None
    estado:        Optional[str]   = None
    precio_kg:     Optional[float] = None
    fecha_cosecha: Optional[date]  = None

    @field_validator("cantidad")
    @classmethod
    def cantidad_positiva(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and v <= 0:
            raise ValueError("La cantidad debe ser mayor a 0")
        return v

    @field_validator("estado")
    @classmethod
    def estado_valido(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in ("Activo", "Inactivo"):
            raise ValueError("El estado debe ser 'Activo' o 'Inactivo'")
        return v

    @field_validator("precio_kg")
    @classmethod
    def precio_positivo(cls, v: Optional[float]) -> Optional[float]:
        if v is not None and v < 0:
            raise ValueError("El precio por kg no puede ser negativo")
        return v
