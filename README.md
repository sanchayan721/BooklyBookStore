# BooklyBookStore
Full-Stack Book Store Application built using Spring Boot Backend and React FrontEnd.

## Technologies
 - Frontend
    - React
    - Redux
    - Material Ui
    - Axios
    - SASS
    
 - Backend
    - Spring Boot
 
 - Database
    - PostgreSQL
    

## Database Entities
There are two primary entites here in this application, e.g. Book and Author and there is a bi-directional Many-to-Many relationship between them which is achieved by a join table called book_author table. Which means, One author can have multiple book while one book can have multiple authors. 

### Book Entity
The book entity which corresponds to the books table in the database has a primary key bookId. Other than this, it also has title, volume, price, publisher, pubdate, description, genere, binding, coverImagePath, language and description. This entity has a list of authors.

### Author Entity
The author entity which corresponds to the authors table in the database has a primay key authorId. Other than this, it also has firstName, lastName, email, authorImagePath and a bio. Other than the primary key, the email field is unique as well. This entity has a list of books. 

### Many-To-Many Relationship
This relationship has been managed by a join table called book_author table which combines two foreign keys from the book table and the author table. This is achieved by @ManyToMany annotation from java percistence API. The Book side is the owner of the relationship. While, the Author side holds the mappedBy parameter.

### Uploading cover image and author image
The author and the book can have images. It is achieved by firstly uploading a file to the file system and storing the unique filename into the corresponding books and authors tables. Since the Image itself is not stored in the database, it is very fast and less computationally expensive.

## CRUD Operations
All CRUD operations can be performed on both of the entities. On one had it is possible to assign and remove books from an author, on the other hand, authors can be added and removed from the book. And the percistancy is managed by the application itself. Deleting all authors from a book does not delete the book and deleting all of the books from an author does not delete the author. This is achieved intentionally as a feature of the application. 

## Frontend
The frontend is built using React and the state management has been achieved by using Redux. Axios is being used to make REST API calls from front end. There is possibility to search for authors and books in the form itself while creating a book or an author. New authors can be added directly from the book form itself but author and be created without any books in a hpoe to add new books later on.

## How to run the app
  - The fronend and backend can be run seperately just keep in mind that the image files need to stored in proper locations, the path to these locations can be modified in the application.properties in 'bookly/java/com/brainfeed/bookly/main/resources'. 
  - The location of the project file is also very important and can be updated in the same location. 
  - The maximum size of the image files can be set here as well. They are 5MB by default. The frontend also poses restriction upon the size of the file which can be modified in 'bookly_frontend/src/utils/index.js' along with the formats of accepted image files, e.g. png, jpeg etc.
  - Database source url and username & password has to be set in 'bookly/java/com/brainfeed/bookly/main/resources/application.properties' in order to connect to a PGSQL server. 
  - In order to avoid and Cross Origin reference error the 'allowed.origin' property has to be set with the address and port no. of the front-end and also the server.location of the backend server in the 'bookly/java/com/brainfeed/bookly/main/resources/application.properties' file. 
  - The axios needs to know the address of the backend server which can be set by creating a .env file in the 'bookly_frontend' folder with 'REACT_APP_BACKEND_URL' field.
  - Once everything is set with the backend server and the database service running, the front-end can be run using "npm run start" command. 

