package com.brainfeed.bookly.services;

import java.util.List;

import com.brainfeed.bookly.model.Author;
import com.brainfeed.bookly.model.Book;

public interface BookService {
    public Book addBook(Book book);
    public Book updateBook(Long bookId , Book book);
    public void deleteBook(Long bookId);
    public List<Book> getAllBooks();
    public Book getBookById(Long BookId);
    public List<Book> getBooksByTitle(String title);
    public void addAuthor (Long bookId, Author author);
    public void removeAuthor (Long bookId, Author author);
}
