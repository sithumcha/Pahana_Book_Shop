package com.Pahana_edu.Backend.repository;



import com.Pahana_edu.Backend.entity.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
}
