import 'reflect-metadata';
import express, { Application } from 'express';
import * as TypeORM from "typeorm";
// import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Context } from 'types/context';

// TypeORM.useContainer(Container);

(async () => {
    try {
        // create TypeORM connection
        await TypeORM.createConnection({
            type: "sqlite",
            database: "AuthDB.db",
            entities: [__dirname + "/services/**/*.entity.{ts,js}"],
            synchronize: true,
            logger: "advanced-console",
            logging: "all",
            dropSchema: true,
            cache: true,
        });
        const schema = await buildSchema({
            resolvers: [__dirname + "/services/**/*.resolver.{ts,js}"]
        });
        const context: Context = {};
        const server = new ApolloServer({ schema, context });
        const app: Application = express();
        server.applyMiddleware({ app });
        app.listen(4000);
        console.log(`Server listening`)
    } catch (error) {
        console.error(error);
    }
})()