// {
//   "type": "mysql",
//   "host": "localhost",
//   "port": 3306,
//   "username": "root",
//   "password": "",
//   "database": "nestjs",
//   "synchronize": false,
//   "logging": true,
//   "entities": ["src/**/*.entity.js"],
//   "migrations": ["dist/migrations/*.js"]
// }
// TYPEORM_CONNECTION=mysql
// TYPEORM_HOST=localhost
// TYPEORM_PORT=3306
// TYPEORM_USERNAME=root
// TYPEORM_PASSWORD=
// TYPEORM_DATABASE=nestjs
// TYPEORM_SYNCHRONIZE=false
// TYPEORM_LOGGING=false
// TYPEORM_ENTITIE=["dist/**/**/*.entity.js"]
// TYPEORM_MIGRATIONS=["dist/**/**/*.entity.js"]
// TYPEORM_ENTITIES_DIR=
// TYPEORM_MIGRATIONS_DIR=
// TYPEORM_SUBSCRIBERS_DIR=

module.exports = {
  "type": "mysql",
  "host": process.env.TYPEORM_HOST,
  "port": process.env.TYPEORM_PORT,
  "username": process.env.TYPEORM_USERNAME,
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE,
  "synchronize": process.env.TYPEORM_SYNCHRONIZE,
  "logging": process.env.TYPEORM_LOGGING,
  "entities": [process.env.TYPEORM_ENTITIE],
  "migrations": [process.env.TYPEORM_MIGRATIONS]
}