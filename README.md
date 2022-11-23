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


