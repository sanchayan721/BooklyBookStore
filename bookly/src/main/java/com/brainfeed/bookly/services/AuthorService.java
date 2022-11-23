package com.brainfeed.bookly.services;

import java.util.List;

import com.brainfeed.bookly.model.Author;

public interface AuthorService {
    public Author getAuthorById(Long authorId);
    public Author updateAuthor(Long authorId, Author author);
    public Author addAuthor(Author author);
    public void deleteAuthor(Long authorId);
    public List<Author> getAllAuthors();
}
