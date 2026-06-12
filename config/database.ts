import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST') || 'localhost',
        port: env.get('DB_PORT') || 3306,
        user: env.get('DB_USER') || 'lk7bf_tickey',
        password: env.get('DB_PASSWORD') || 'ha359??eHWS$',
        database: env.get('DB_DATABASE') || 'lk7bf_tickey',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig