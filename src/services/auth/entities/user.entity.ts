import { Field, ID, ObjectType, Root } from "type-graphql";
import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";

@ObjectType()
@Entity("users")
export default class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Column()
    password: string;
}