package com.brainfeed.bookly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brainfeed.bookly.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long>{
    List<Author> findByEmail(String email);
    List<Author> findByFirstNameAndLastName(String firstName, String lastName);
}
