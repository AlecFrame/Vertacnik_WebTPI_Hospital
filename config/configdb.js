const conn = {
    "development": {
        "username": process.env.USERNAME,
        "password": process.env.PASS,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.USERNAME,
        "password": process.env.PASS,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.USERNAME,
        "password": process.env.PASS,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql"
    }
}