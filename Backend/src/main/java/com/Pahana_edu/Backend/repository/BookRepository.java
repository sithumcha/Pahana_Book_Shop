//package com.Pahana_edu.Backend.repository;
//
//
//
//import com.Pahana_edu.Backend.entity.Book;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//public interface BookRepository extends MongoRepository<Book, String> {
//}


package com.Pahana_edu.Backend.repository;

import com.Pahana_edu.Backend.entity.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    // Custom query to find books by category
    List<Book> findByCategory(String category);

    // Custom query to find books by title
    List<Book> findByTitleContainingIgnoreCase(String title);

    // Custom query to find books by author
    List<Book> findByAuthor(String author);
}
