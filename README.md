TUTO d'installation du BOT

```
Commande pour Linux :

> apt update
> apt upgrade -y
> apt install npm
> apt install node.js
> npm install pm2 -g
> npm install discord.js path colors fs mysql2
```
```
Installation My SQL

> apt update
> apt install mariadb-server
> mysql_secure_installation
> mysql
- GRANT ALL ON *.* TO 'User_Name'@'localhost' IDENTIFIED BY 'Password_Generator' WITH GRANT OPTION;
- FLUSH PRIVILEGES;
- exit
```
```
Creer votre DATABASE :

Vous creer votre DATABASE soit sous PHPMYADMIN soit en SQL a vous de voir.
```
```
Modifier le fichier INDEX.JS et changer :

	host: "localhost",
	user: "User_Name",
	password: "Password_Generator",
	database: "Database_Name"

En vos informations MySql.
```
```
Modifier le fichier CONFIG.JSON et changer :

    "token": "TOKEN_YOUR_BOT",
    "owner": {
        "id": "ID_Owner_Bot"

En vos informations.
```
```
Pour finir :

> pm2 start ./BlackList-Bot/index.js
```

Puis votre BOT sera fonctionnel.

```
Le PREFIX est "."

Les commandes sont :

.blacklist add "ID DISCORD" "RAISON"
.blacklist remove "ID DISCORD"

.staff add ID
.staff remove ID
```
