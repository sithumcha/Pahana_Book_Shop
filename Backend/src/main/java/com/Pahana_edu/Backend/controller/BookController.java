package com.Pahana_edu.Backend.controller;


import com.Pahana_edu.Backend.entity.Book;
import com.Pahana_edu.Backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
@RestController
@RequestMapping("/api/books")
public class BookController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private BookService bookService;

    // POST: Add a new book
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestParam("title") String title,
                                        @RequestParam("author") String author,
                                        @RequestParam("publisher") String publisher,
                                        @RequestParam("language") String language,
                                        @RequestParam("price") double price,
                                        @RequestParam("pages") int pages,
                                        @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = saveImage(image);  // Save the image and get the URL
            Book book = new Book(title, author, publisher, language, price, imageUrl, pages);
            Book savedBook = bookService.addBook(book);
            return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET: Get all books
    @GetMapping
    public ResponseEntity<Iterable<Book>> getAllBooks() {
        try {
            Iterable<Book> books = bookService.getAllBooks();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // PUT: Update a book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book bookDetails) {
        try {
            Book updatedBook = bookService.updateBook(id, bookDetails);
            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE: Remove a book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        try {
            bookService.deleteBook(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Save image to the server
    private String saveImage(MultipartFile image) throws IOException {
        // Clean the original file name to avoid malicious characters
        String imageName = StringUtils.cleanPath(image.getOriginalFilename());

        // Check if file already exists and append a timestamp or random number to make it unique
        Path imagePath = Paths.get(UPLOAD_DIR + imageName);
        if (Files.exists(imagePath)) {
            // Append timestamp to the filename to make it unique
            String timestamp = String.valueOf(System.currentTimeMillis());
            imageName = timestamp + "_" + imageName;
            imagePath = Paths.get(UPLOAD_DIR + imageName);
        }

        // Save the file
        Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        return imagePath.toString();
    }
}
