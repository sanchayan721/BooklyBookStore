package com.brainfeed.bookly.controller;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.brainfeed.bookly.exception.FailedOperationException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.io.File;
import java.io.IOException;

@RestController
public class MediaDisplayController {

    @Value("${project.location}")
    private String projectLocation;

    @Value("${books.images.uploadpath}")
    private String coverImageUploadPath;

    @Value("${authors.images.uploadpath}")
    private String authorImageUploadPath;

    @Value("${users.images.uploadpath}")
    private String userImageUploadPath;

    @GetMapping("/uploads/books/{filename}")
    public ResponseEntity<byte[]> getBookCover(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        String pathName = '/' + projectLocation + '/' + coverImageUploadPath + '/' + filename;
        try {
            image = FileUtils.readFileToByteArray(new File(pathName));
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(image);
                    
        } catch (IOException e) {
            throw new FailedOperationException("Searching for cover image");
        }
    }

    @GetMapping("/uploads/authors/{filename}")
    public ResponseEntity<byte[]> getAuthorImage(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        String pathName = '/' + projectLocation + '/' + authorImageUploadPath + '/' + filename;
        try {
            image = FileUtils.readFileToByteArray(new File(pathName));
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(image);
                    
        } catch (IOException e) {
            throw new FailedOperationException("Searching for author image");
        }
    }

}
