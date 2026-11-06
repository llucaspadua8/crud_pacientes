
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'date' })
    data_nascimento: Date;

    @Column({ unique: true })
    CPF: string;

    @Column()
    email: string;

    @Column()
    sexo: string;
}
