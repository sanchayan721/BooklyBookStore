package com.brainfeed.bookly.services;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    public Map<String, String> addBookCoverImage(MultipartFile coverFile);    
    public Map<String, String> addAuthorImage(MultipartFile imageFile);
}
