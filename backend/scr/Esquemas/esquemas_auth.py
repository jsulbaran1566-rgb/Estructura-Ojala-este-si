from pydantic import BaseModel, EmailStr, field_validator


# ================= AUTENTICACION =================

class LoginEntrada(BaseModel):
    correo: EmailStr
    clave: str

    @field_validator("clave")
    @classmethod
    def clave_no_vacia(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("La clave no puede estar vacía")
        return v
