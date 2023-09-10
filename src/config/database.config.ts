import { registerAs } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { DatabaseType, DatabaseHost, DatabasePort, DatabaseUsername, DatabasePassword, DatabaseName, DatabaseSynchronize, DatabaseLogger } from "./env.config"

const DatabaseConfig = registerAs(
    "database",
    (): TypeOrmModuleOptions => ({
        type: process.env[DatabaseType] as "mongodb",
        host: process.env[DatabaseHost],
        port: +process.env[DatabasePort],
        username: process.env[DatabaseUsername],
        password: process.env[DatabasePassword],
        database: process.env[DatabaseName],
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: Boolean(process.env[DatabaseSynchronize]),
        logger: process.env[DatabaseLogger] as "simple-console",
    })
)

export { DatabaseConfig }