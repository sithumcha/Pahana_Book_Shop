package com.Pahana_edu.Backend.service;

import com.Pahana_edu.Backend.entity.Book;
import com.Pahana_edu.Backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Add a new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Get all books
    public Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Update a book
    public Book updateBook(String id, Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublisher(bookDetails.getPublisher());
            book.setLanguage(bookDetails.getLanguage());
            book.setPrice(bookDetails.getPrice());
            book.setImageUrl(bookDetails.getImageUrl());
            book.setPages(bookDetails.getPages());
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    // Delete a book
    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }
}
