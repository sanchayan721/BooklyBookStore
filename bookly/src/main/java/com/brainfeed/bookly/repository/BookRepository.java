package com.brainfeed.bookly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brainfeed.bookly.model.Author;
import com.brainfeed.bookly.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
    List<Book> findByTitle(String title);
    List<Book> findByTitleAndAuthors(String title, Author author);
    List<Book> findByTitleAndAuthorsAndVolume(String title, Author author, int volume);
    List<Book> findByPrice(Double price);
}
