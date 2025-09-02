package com.Pahana_edu.Backend.repository;

import com.Pahana_edu.Backend.entity.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {


    List<Book> findByCategory(String category);


    List<Book> findByTitleContainingIgnoreCase(String title);


    List<Book> findByAuthor(String author);
}
