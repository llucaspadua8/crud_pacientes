
import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';


enum Sexo {
    Masculino = 'M',
    Feminino = 'F'
}

export class CreatePatientDto {
    
    @Transform(({value})=>value.trim())
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    nome: string;
    
    @IsDateString()
    @IsNotEmpty()
    data_nascimento: string;
    
    @Transform(({value})=>value.replace(/\D/g, ''))
    @IsCPF()
    @IsNotEmpty()
    CPF: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(Sexo)
    @IsNotEmpty()
    sexo: string;
}
