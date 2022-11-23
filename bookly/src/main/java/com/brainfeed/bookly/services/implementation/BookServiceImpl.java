package com.brainfeed.bookly.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brainfeed.bookly.exception.FailedOperationException;
import com.brainfeed.bookly.exception.ResourceAlreadyExistsException;
import com.brainfeed.bookly.exception.ResourceNotFoundException;
import com.brainfeed.bookly.model.Author;
import com.brainfeed.bookly.model.Book;
import com.brainfeed.bookly.repository.BookRepository;
import com.brainfeed.bookly.services.BookService;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book addBook(Book book) {
        List<Author> authors = book.getAuthors();
        String title = book.getTitle();
        int volume = book.getVolume();

        for (Author author : authors) {
            List<Book> foundByAuthor = bookRepository.findByTitleAndAuthors(title, author);
            if (foundByAuthor.size() > 0) {
                List<Book> foundByAuthorAndVolume = bookRepository.findByTitleAndAuthorsAndVolume(title, author,
                        volume);
                if (foundByAuthorAndVolume.size() > 0) {
                    throw new ResourceAlreadyExistsException(
                            "Book with Author and Volume",
                            title + ", " + author.getFirstName() + " " + author.getLastName() + ", " + volume);
                } else {
                    bookRepository.save(book);
                    return book;
                }
            } else {
                bookRepository.save(book);
                return book;
            }
        }
        bookRepository.save(book);
        return book;
    }

    @Override
    public Book updateBook(Long bookId, Book book) {
        Book targetBook = getBookById(bookId);

        targetBook.setTitle(book.getTitle());
        targetBook.setAuthors(book.getAuthors());
        targetBook.setVolume(book.getVolume());
        targetBook.setPrice(book.getPrice());
        targetBook.setPubdate(book.getPubdate());
        targetBook.setDescription(book.getDescription());
        targetBook.setCoverImagePath(book.getCoverImagePath());

        try {
            bookRepository.save(targetBook);
            return targetBook;
        } catch (Exception e) {
            throw new FailedOperationException("Update");
        }
    }

    
    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    @Override
    public Book getBookById(Long bookId) {
        return bookRepository.findById(bookId)
        .orElseThrow(() -> new ResourceNotFoundException("Book", "bookid", bookId));
    }
    
    @Override
    public List<Book> getBooksByTitle(String title) {

        List<Book> books = bookRepository.findByTitle(title);
        if (books.size() > 0) {
            return books;
        } else {
            throw new ResourceNotFoundException("Book", "title", title);
        }
    }

    @Override
    public void addAuthor(Long bookId, Author author) {
        Book targetBook = getBookById(bookId);
        targetBook.addAuthor(author);
        bookRepository.save(targetBook);
    }

    @Override
    public void removeAuthor(Long bookId, Author author) {
        Book targetBook = getBookById(bookId);
        targetBook.removeAuthor(author);
        bookRepository.save(targetBook);
    }

    @Override
    public void deleteBook(Long bookId) {
        Book targetBook = getBookById(bookId);
        try {
            bookRepository.delete(targetBook);
        } catch (Exception e) {
            throw new FailedOperationException("Deleting Book");
        }
    }
}
