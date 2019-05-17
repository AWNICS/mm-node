
# mm-node
----

MesoMeds REST services using NodeJS and Express

## Running the project locally

**Note** This project requires node v4.x.x or higher and npm 2.14.7 but in order to be able to take advantage of the complete functionality we **recommend node >=v6.5.0 and npm >=3.10.3**.

#### Pre-requisites
- Use node version manager in development environment for [windows](https://github.com/coreybutler/nvm-windows), [linux](https://github.com/nvm-sh/nvm) 
- [Mysql Server](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04) (local-standalone-server)
- MongoDb (Hosted at https://cloud.mongodb.com) 
- [Redis Server](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) (local-standalone-server)
- [Apache Server](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04) Setup
- [LetsEncrypt Certs](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04) Setup

## A. Configuration

#### 1. Configuring env (mm-node/.env.dev)

```
    MONGODB_URI=mongodb+srv://<user>:<password>@<ip-address-mm-node>/<database-name>?retryWrites=true
    MONGODB_LOCAL_URI=mongodb://<user>:<password>@<ip-address-mm-node>:27273/<database-name>
    NODE_ENV=dev
    PORT=3000
    MYSQL_HOST: '<ip-address-mysql>'
    MYSQL_USER: '<user>'
    MYSQL-PASSWORD: '<password>'
    MYSQL_DB: '<database-name>'
    MES91_KEY=<message-91-sms-gateway-api-key>
    MES91_SENDER=<message-91-sender-codename>
    OTP_LENGTH=6
    OTP_EXPIRY=3
    OTP_RETRY_TYPE=text
    PROJECT_ID = '<google-cloud-store-project-id>'
    BUCKET = '<google-cloud-store-bucket-name>'
    DIALOGFLOW_PROJECT_ID = '<google-dialogflow-project-id>'
    DIALOGFLOW_SESSION_ID = '<google-dialogflow-session-id>'
    SESSION_SECRET = <Your Session Secret goes here>
    JWT_SECRET = <jwt-secret-token-configuration>
    GOOGLE_ID=<**.apps.googleusercontent.com>
    GOOGLE_SECRET=<>
    CCAV_WORKING_KEY=<ccavenue-portal-working-key>
    CCAV_ACCESS_CODE=<ccavenue-portal-access-code>

```

#### 2. Configuring MongoDB (mm-node/src/util/conn.mongo.js)

```
# configure the env file name as
this.dotenv.config({ path: '.env.dev' });
```

#### 3. Configuring MySql (mm-node/src/util/conn.mysql.js)

```
# Edit the following section of code
var sequelize = new Sequelize('<database-name>', '<user>', '<password>', {
    host: '<ip-address-mysql>',
    dialect: 'mysql',

    ...

});
```

#### 4. Configuring app (mm-node/src/config/app.config.js)


```
# configure the env file name as fotr all environment variables
this.dotenv.config({ path: '.env.dev' });
```

```
LetsEncrypt SSL certificates should be maintained 
at production path "/etc/letsencrypt/live/mesomeds.com/*.pem"
```

#### 5. configuring log4js (mm-node/src/config/log4js.json & mm-node/src/config/log4js.config.js)
```
Appenders and filter are configured in mm-node/src/config/log4js.json
```

#### 6. configuring swagger (mm-node/src/config/swagger.config.js)

```
    # Setup the host server path
    host: 'localhost:3000',
    basePath: '/',

    ...

    <regex of the api's that we want to expose over swagger>
```

#### 7. Various cloud access credentials/keys

##### Google cloud 
- [Create service account access keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) on google cloud console
- Copy downloaded "google-cloud-project-id.json" file to mm-node/src/util folder
- This contains service_account information and private key/credential for cloud access
- Configure the src/config/gcp.config.js file with the appropriate key file path "keyFilename: './src/util/*.json'"

##### DialogFlow
- [Create the service account access keys](https://dialogflow.com/docs/reference/v2-auth-setup) for the DialogFlow services
- Copy downloaded "google-dialogflow-project-id.json" file to mm-node/src/util folder
- This contains service_account information and private key/credential for cloud access
- Configure the src/config/dialogFlow.config.js file with the appropriate key file path "keyFilename: './src/util/*.json'"

#### 8. E-mail configurations (mm-node/src/config/email.config.js)
```
    transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'support@awnics.com',
            pass: 'support@awnics'
        },
        tls: {
            rejectUnauthorized: false
        },
    },
```
#### 9. SMS configurations (mm-node/src/config/message.config.js)

```
const msgconfig = {
    "authkey": "<message-91-sms-gateway-api-key>",
    "country": "91",
    "userMessage": "Hi User, Greetings from Mesomeds. Click on the verification link below to complete the registration process activationLink",
    "doctorMessage": "Hi User, Greetings from Mesomeds. Thank you for registering with us. Our admin will reach out to you shortly",
    "passwordResetMessage": "Hello User, Password reset Link has been mailed to successfully. Check your inbox to reset your password",
    "notificationMessage": "Hello Doctor, Greetings from Mesomeds. There is a consultation in while.",
    "doctorNotifyMessage": "Hello Doctor, A previous consultation patient named patient1 had sent you a message"
};

```

----

## B. Install & Run

```
git clone https://github.com/AWNICS/mm-node.git
cd mm-node

# install project's dependencies
# TODO: remove bcrypt from package.json

rm package-lock.json
rm -rf node_modules\
npm install --unsafe-perm
npm install --save bcrypt

# watches your files for any change and restarts the server
npm start
```

----

## License
MIT