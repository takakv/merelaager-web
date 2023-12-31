# merelaager

## Running locally

### Install MySQL DB
```
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

Create new database
```
mysql -u root -p
```
```
CREATE DATABASE merelaager;
CREATE USER 'prisma'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON merelaager.* TO 'prisma'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Add the database url to environment
```
export DATABASE_URL=mysql://prisma:password@localhost:3306/merelaager
```

npx push prisma db to mysql
```
sudo npx prisma db push
```

### Generate SASS
```
yarn run sass
```

rebuild
```
yarn build:remix
yarn build:server
```

### Run the page
```
yarn start
```