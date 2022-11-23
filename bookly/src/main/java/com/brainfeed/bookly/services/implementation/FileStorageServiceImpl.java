package com.brainfeed.bookly.services.implementation;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.brainfeed.bookly.exception.FailedOperationException;
import com.brainfeed.bookly.services.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${project.location}")
    private String projectLocation;

    @Value("${books.images.uploadpath}")
    private String coverImageUploadPath;

    @Value("${authors.images.uploadpath}")
    private String authorImageUploadPath;

    @Value("${users.images.uploadpath}")
    private String userImageUploadPath;

    @Value("${server.location}")
    private String serverLocation;

    @Override
    public Map<String, String> addBookCoverImage(MultipartFile coverFile) {
        if (coverFile.getSize() > 5 * 1024 * 1024) {
            throw new FailedOperationException("Cover image size must be less than 5MB");
        } else {
            try {
                byte[] bytes = coverFile.getBytes();
                UUID uuid = UUID.randomUUID();
                String randomSalt = uuid.toString();

                String originalName = StringUtils.cleanPath(coverFile.getOriginalFilename());
                String treatedOriginalName = originalName.toLowerCase().replaceAll(" ", "-");

                String fileNewName = randomSalt + treatedOriginalName;
                String filePathName = '/' + projectLocation + '/' + coverImageUploadPath + '/' + fileNewName;
                Path filePath = Paths.get(filePathName);

                Files.write(filePath, bytes);

                Map<String, String> pathMap = new HashMap<String, String>();
                pathMap.put("filePath", serverLocation + '/' + coverImageUploadPath + '/' + fileNewName);

                return pathMap;

            } catch (IOException e) {
                throw new FailedOperationException("Saving Image");
            }
        }
    }

    @Override
    public Map<String, String> addAuthorImage(MultipartFile imageFile) {
        if (imageFile.getSize() > 5 * 1024 * 1024) {
            throw new FailedOperationException("Cover image size must be less than 5MB");
        } else {
            try {
                byte[] bytes = imageFile.getBytes();
                UUID uuid = UUID.randomUUID();
                String randomSalt = uuid.toString();

                String originalName = StringUtils.cleanPath(imageFile.getOriginalFilename());
                String treatedOriginalName = originalName.toLowerCase().replaceAll(" ", "-");

                String fileNewName = randomSalt + treatedOriginalName;
                String filePathName = '/' + projectLocation + '/' + authorImageUploadPath + '/' + fileNewName;
                Path filePath = Paths.get(filePathName);

                Files.write(filePath, bytes);

                Map<String, String> pathMap = new HashMap<String, String>();
                pathMap.put("filePath", serverLocation + '/' + authorImageUploadPath + '/' + fileNewName);

                return pathMap;

            } catch (IOException e) {
                throw new FailedOperationException("Saving Image");
            }
        }
    }
}
