## The club Members
>This is just a simple test project i create to perform CRUD operation through websocket API.

![screenshot](screenshot.png)

The project need **php** as server script language and **node.js** for building tasks.

#### how to deploy
These assume that you have **php** and **mysql** installed on your system.

 - import the data base from `service/web_crud_test.sql`
 - if needed, set the *username* and *password* role in `service/db_connection.php` so that the `$dbo` object can be use to process connection in the database.
 - start the *websocket server*  by running this command, assuming your are in *service* directory of the project: 
 
    ```sh
    ~/service$ php main.php 
    ```
    
    if you use **xampp** and you haven't allready add it *bin* directory in the `$PATH` environment, for example on GNU/Linux `/opt/lampp/bin`, use this command instead:
    	
    ```sh
    ~/service$ /opt/lampp/bin/php main.php 
    ```
    
 - launch the project through index page in your browser
 
#### how to build
>This is only if you want to contribute or modify the project.

These assume that you have **node.js**, **npm** and **ruby-sass** installed on your system.
 
 - **gulp** is present as node module in the project but i recommend to install it globaly if isn't yet done: (use `sudo` to prevent right access on some GNU/Linux OS)
 
    ```sh
    npm install -g gulp
    ```
    
 - to automate build tasks, run this on the main project directory :
 
    ```sh
    ~/$ gulp 
    ```
    
    available task are *auto watching*, *preprocessor compilation*, ... Take it a look of `./gulpfile.js` for more informations.
    
 - `node_modules` directory isn't need for deployement. Ignore it can be benefict for the production size project.
 
#### todo

 - implement the search operation
 - add filter to perform how profile are display
   - displaying order by older subscribed members *(default)*
   - displaying order by recent subscribed members
   - displaying only admin or gold or silver or simple members
 - perform pagination

 
#### about
Copyright (c) (April)-2016 [Tindo Ngoufo Arsel](https://github.com/tnga). The MIT License.
