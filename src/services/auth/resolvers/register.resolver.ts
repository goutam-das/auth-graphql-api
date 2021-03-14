import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';
import User from "../entities/user.entity";
import RegisterInput from './register.input';

@Resolver()
export default class RegisterResolver {
    @Mutation(() => User)
    async register(@Arg('data') { firstName, lastName, email, password }: RegisterInput) {
        password = await bcrypt.hash(password, 12);
        const user = await User.create({ firstName, lastName, email, password }).save();
        return user;
    }
}