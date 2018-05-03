# mm-node

A starter boilerplate for NodeJS and Express

## Running the project locally

**Note** This project requires node v4.x.x or higher and npm 2.14.7 but in order to be able to take advantage of the complete functionality we **recommend node >=v6.5.0 and npm >=3.10.3**.

```
git clone https://github.com/AWNICS/mm-node.git
cd mm-node

# install project's dependencies
npm install

# watches your files for any change and restarts the server
npm start
```

## Configuration

```
# configuring env
mm-node/.env.dev

# configuring MySql
mm-node/src/util/conn.mysql.js

# configuring MongoDB
mm-node/src/util/conn.mysql.js

# configuring app
mm-node/src/config/app.config.js

# configuring log4js
mm-node/src/config/log4js.json & mm-node/src/config/log4js.config.js

# configuring swagger
mm-node/src/config/swagger.config.js
```

## License
MIT