import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsPhoneNumber,
} from "class-validator";
import { Match } from "../../validators/match.decorator";

export class RegisterUserDto {
  @IsString()
  @MinLength(5, {
    message: "El nombre de usuario debe tener al menos 5 caracteres",
  })
  username!: string;

  @IsString()
  @MinLength(5, { message: "El apellido debe tener al menos 5 caracteres" })
  lastName!: string;

  @IsPhoneNumber("CO", {
    message: "Número de teléfono no es válido o no es de Colombia",
  })
  phoneNumber!: string;

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

  @IsString()
  @Match("password", { message: "Las contraseñas no coinciden" })
  confirmPassword!: string;
}
