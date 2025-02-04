# Almir Books

A React application to store and manage a database of books. Frontend interfaces with a REST API built on PHP / MySQL.  

## Security
The front-end is protected via a username and password ( password encryption being used ) The backend database ( api endpoints ) are protected via JWT web tokens. Unauthorised users cannot interface with the data without a valid signed token which is generated when the user successfully logs in. Please note JWT is disabled on the demo link above due to restrictions by the hosting provider. JWT will work locally, installed via composer. 

## DRY, Extensible & Scalable
The core application structure is broken up to facilitate expanding feature requirements and makes debugging and maintenance easier by not repeating the same code time and again. 

## Responsive
Using react, content is managed by a virtual DOM and only updated to view ( the real DOM ) when changes are made to the data. This ensures a smooth and efficient use of resources as well as ensuring data is always up to date when the user is viewing it not requiring a page refresh. 
 

## Installation

Use the package manager npm to install

```bash
npm install
```
Install JWT via composer in the /backend directory
```bash
composer require firebase/php-jwt
```

Build the project 
```bash
npm run build
```

Run Locally
```bash
npm start
```

Start php server
```bash
php -S localhost:8080
```


## Database

MySQL database

Contains two tables: `Books` and `Users`

Table structure for table `Books`
```bash
CREATE TABLE IF NOT EXISTS `Books` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `ISBN` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IBAN` (`ISBN`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;
```
Table structure for table `Users`
```bash
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

```
## Improvements
* Pagination - Paginate database results so the application is not returning too many records from the database at once
* Login failure feedback- Provide better UX by informing the user via a toast message that login has failed. 
* Deleting a record - Implement animation when user deletes a book ( row to fade away ) - provide "Are you sure?" dialog.
* Allow ordering or records - new books should appear on top by default.
* Better UX via presenting "create" and "edit" forms in Model dialogs.