package com.brainfeed.bookly.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import com.brainfeed.bookly.model.Book;
import com.brainfeed.bookly.services.BookService;
import com.brainfeed.bookly.services.FileStorageService;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping(value = "/books")
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping(value = "/books/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable String bookId) {
        return new ResponseEntity<Book>(bookService.getBookById(Long.parseLong(bookId)), HttpStatus.OK);
    }

    @PostMapping(value = "/book")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        System.out.println(book);
        return new ResponseEntity<Book>(bookService.addBook(book), HttpStatus.CREATED);
    }

    @PostMapping(value = "/book/addcover")
    public ResponseEntity<Map<String, String>> addCover(@RequestPart MultipartFile file) {
        return new ResponseEntity<Map<String, String>>(fileStorageService.addBookCoverImage(file), HttpStatus.CREATED);
    }

    @PostMapping(value = "/books/{bookId}/editcover")
    public ResponseEntity<MultipartFile> editCover(@RequestPart MultipartFile file, @RequestParam String bookId) {
        return new ResponseEntity<MultipartFile>(HttpStatus.CREATED);
    }

    @PutMapping(value = "/books/{bookId}")
    public ResponseEntity<Book> updateBook(@PathVariable String bookId, @RequestBody Book book) {
        return new ResponseEntity<Book>(bookService.updateBook(Long.parseLong(bookId), book), HttpStatus.OK);
    }

    @DeleteMapping(value = "/books/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable String bookId) {
        bookService.deleteBook(Long.parseLong(bookId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
