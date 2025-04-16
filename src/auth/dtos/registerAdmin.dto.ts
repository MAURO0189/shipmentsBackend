import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class RegisterAdminDto {
  @IsString()
  @MinLength(7, {
    message: "El nombre de administrador debe tener al menos 7 caracteres",
  })
  AdminName!: string;
  @IsEmail({}, { message: "Debe proporcionar un email válido" })
  email!: string;

  @IsString()
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
    {
      message:
        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
    }
  )
  password!: string;
}
