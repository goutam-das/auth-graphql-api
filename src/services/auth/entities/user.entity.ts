import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";



@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    email!: string;
}