# Setup guide for mm-node

## Installing nvm

 Use the command below to run the installation script from nvm:
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`

 Verify installation
 To verify that nvm has been installed, do:

 `command -v nvm`
 which should output 'nvm' if the installation was successful. Please note that which nvm will not work, since nvm is a sourced shell function, not an executable binary.

## Installing NodeJs and NPM

 Find out the stable verion by
 `nvm list`

 Install by the following command:
 `nvm install <version>`

 Verify installation
 `npm -v` & `node -v`

## Installing Apache Tomcat

 Update your system:
 `sudo yum update`

 Install Apache 2.4:
 `sudo yum install httpd`

 Allow Apache Through the Firewall
    Allow the default HTTP and HTTPS port, ports 80 and 443, through firewall:
    `sudo firewall-cmd --permanent --add-port=80/tcp`
    `sudo firewall-cmd --permanent --add-port=443/tcp`

    And reload the firewall:
    `sudo firewall-cmd --reload`

 Configure Apache to Start on Boot
    And then start Apache:
    `sudo systemctl start httpd`
    Be sure that Apache starts at boot:
    `sudo systemctl enable httpd`
 To check the status of Apache:
 `sudo systemctl status httpd`
 To stop Apache:
 `sudo systemctl stop httpd`

## Installing MariaDB

 Enable the MariaDB repository:
 Generate a repository file for a specific MariaDB version from the following link:
 `https://downloads.mariadb.org/mariadb/repositories/#mirror=nus`

 Create a file named MariaDB.repo in /etc/yum.repos.d/
 Copy and paste the following content:

 ```
    # MariaDB 10.3 CentOS repository list - created 2018-08-09 05:16 UTC
    # http://downloads.mariadb.org/mariadb/repositories/
    [mariadb]
    name = MariaDB
    baseurl = http://yum.mariadb.org/10.3/centos7-amd64
    gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
    gpgcheck=1
```

 After the file is in place, install MariaDB with:
 `sudo yum install MariaDB-server MariaDB-client`

 Yum may prompt you to import the MariaDB GPG key:
 Type y and hit Enter

 Once the installation is completed, enable MariaDB to start on boot and start the service:
 `sudo systemctl enable mariadb`
 `sudo systemctl start mariadb`

 Once the MySQL service is started we can check it’s status by typing:
 `sudo systemctl status mariadb`

 Run the following command to improve the security of our MariaDB installation:
 `sudo mysql_secure_installation`
**Note** The script will prompt you to set up the root user password, remove the anonymous user, restrict root user access to the local machine, and remove the test database. All steps are explained in detail and it is recommended to answer “Y” (yes) to all questions.