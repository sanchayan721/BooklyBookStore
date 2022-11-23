package com.brainfeed.bookly.services.implementation;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brainfeed.bookly.exception.FailedOperationException;
import com.brainfeed.bookly.exception.ResourceAlreadyExistsException;
import com.brainfeed.bookly.exception.ResourceNotFoundException;
import com.brainfeed.bookly.model.Author;
import com.brainfeed.bookly.model.Book;
import com.brainfeed.bookly.repository.AuthorRepository;
import com.brainfeed.bookly.repository.BookRepository;
import com.brainfeed.bookly.services.AuthorService;
import com.brainfeed.bookly.services.BookService;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookService bookService;

    @Override
    public Author getAuthorById(Long authorId) {
        return authorRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("Author", "authorId", authorId));
    }

    @Override
    public Author updateAuthor(Long authorId, Author author) {
        Author targetAuthor = getAuthorById(authorId);

        targetAuthor.setFirstName(author.getFirstName());
        targetAuthor.setLastName(author.getLastName());
        targetAuthor.setEmail(author.getEmail());
        targetAuthor.setAuthorImagePath(author.getAuthorImagePath());
        targetAuthor.setBio(author.getBio());

        List<Book> booksByAuthor = author.getBooks();
        List<Book> existing = targetAuthor.getBooks();

        for (Book book : existing) {
            Book foundBook = bookService.getBookById(book.getBookId());
            foundBook.getAuthors().removeIf(foundAuthor -> foundAuthor.getAuthorId() == author.getAuthorId());
        }

        if (!booksByAuthor.isEmpty()) {
            booksByAuthor.forEach(book -> {
                bookService.getBookById(book.getBookId()).addAuthor(targetAuthor);
            });
        } else {
            for (Book book : existing) {
                Book foundBook = bookService.getBookById(book.getBookId());
                foundBook.getAuthors().removeIf(foundAuthor -> foundAuthor.getAuthorId() == author.getAuthorId());
            }
        }

        try {
            authorRepository.save(targetAuthor);
            return targetAuthor;
        } catch (Exception e) {
            throw new FailedOperationException("update");
        }
    }

    @Override
    public Author addAuthor(Author author) {

        String email = author.getEmail();

        List<Author> authors = authorRepository.findByEmail(email);
        if (!authors.isEmpty()) {
            throw new ResourceAlreadyExistsException("email", email);
        } else {
            authorRepository.save(author);
            return author;
        }
    }

    @Override
    public void deleteAuthor(Long authorId) {
        Author targetAuthor = getAuthorById(authorId);
        try {
            List<Book> booksByAuthor = targetAuthor.getBooks();
            if (booksByAuthor.isEmpty()) {
                authorRepository.delete(targetAuthor);
            } else {
                for (Book bookByAuthor : booksByAuthor) {
                    Book foundBook = bookService.getBookById(bookByAuthor.getBookId());
                    foundBook.getAuthors()
                            .removeIf(foundAuthor -> foundAuthor.getAuthorId() == targetAuthor.getAuthorId());
                }
                authorRepository.save(targetAuthor);
                authorRepository.delete(targetAuthor);
            }
        } catch (Exception e) {
            throw new FailedOperationException("Deleting Author");
        }
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

}
