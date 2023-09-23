install prisma ad dev dependency

init prisma

set the env file to db connection

if a db is already existing just pull db with npx prisma db pull in order to generate models automatically

npx prisma generate

how to fix bigInt conversion problem:
-- create an interceptor folder in which you create a interceptor class and the you register it in app.module provider in an object with peroperties -provide:APP_ITERCEPTOR -useClass:bigintinterceptor file

add slugify for automatic slugs
add npm install multer @nestjs/platform-express for file interception and storage