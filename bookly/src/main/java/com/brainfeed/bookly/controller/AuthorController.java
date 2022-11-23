package com.brainfeed.bookly.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.brainfeed.bookly.model.Author;
import com.brainfeed.bookly.services.AuthorService;
import com.brainfeed.bookly.services.FileStorageService;

@RestController
public class AuthorController {
    
    @Autowired
    private AuthorService authorService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping(value = "/authors")
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    @GetMapping(value = "/authors/{authorId}")
    public ResponseEntity<Author> getBookById(@PathVariable String authorId) {
        return new ResponseEntity<Author>(authorService.getAuthorById(Long.parseLong(authorId)), HttpStatus.OK);
    }
    
    @PostMapping(value = "/author")
    public ResponseEntity<Author> addAuthor(@RequestBody Author author) {
        return new ResponseEntity<Author>(authorService.addAuthor(author), HttpStatus.CREATED);
    }

    @PostMapping(value = "/author/addimage")
    public ResponseEntity<Map<String, String>> addImage(@RequestPart MultipartFile file) {
        return new ResponseEntity<Map<String, String>>(fileStorageService.addAuthorImage(file), HttpStatus.CREATED);
    }

    @PostMapping(value = "authors/{authorId}/editimage")
    public ResponseEntity<MultipartFile> editImage(@RequestPart MultipartFile file, @RequestParam String authorId) {
        return new ResponseEntity<MultipartFile>(HttpStatus.CREATED);
    }

    @PutMapping(value = "/authors/{authorId}")
    public ResponseEntity<Author> updateAuthor(@PathVariable String authorId, @RequestBody Author author) {
        return new ResponseEntity<Author>(authorService.updateAuthor(Long.parseLong(authorId), author), HttpStatus.OK);
    }

    @DeleteMapping(value = "/authors/{authorId}")
    public ResponseEntity<?> deleteAuthorById(@PathVariable String authorId){
        authorService.deleteAuthor(Long.parseLong(authorId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
