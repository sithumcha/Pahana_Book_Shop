//package com.Pahana_edu.Backend.entity;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//@Document(collection = "books")
//public class Book {
//
//    @Id
//    private String id;
//    private String title;
//    private String author;
//    private String publisher;
//    private String language;
//    private double price;
//    private String imageUrl;  // URL to the book image
//    private int pages;
//    private String category;  // New field for book category
//
//    // Default constructor
//    public Book() {}
//
//    // Full constructor
//    public Book(String title, String author, String publisher, String language, double price, String imageUrl, int pages, String category) {
//        this.title = title;
//        this.author = author;
//        this.publisher = publisher;
//        this.language = language;
//        this.price = price;
//        this.imageUrl = imageUrl;
//        this.pages = pages;
//        this.category = category;
//    }
//
//    // Getters and Setters
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getAuthor() {
//        return author;
//    }
//
//    public void setAuthor(String author) {
//        this.author = author;
//    }
//
//    public String getPublisher() {
//        return publisher;
//    }
//
//    public void setPublisher(String publisher) {
//        this.publisher = publisher;
//    }
//
//    public String getLanguage() {
//        return language;
//    }
//
//    public void setLanguage(String language) {
//        this.language = language;
//    }
//
//    public double getPrice() {
//        return price;
//    }
//
//    public void setPrice(double price) {
//        this.price = price;
//    }
//
//    public String getImageUrl() {
//        return imageUrl;
//    }
//
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }
//
//    public int getPages() {
//        return pages;
//    }
//
//    public void setPages(int pages) {
//        this.pages = pages;
//    }
//
//    // Getter and Setter for category
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//}




package com.Pahana_edu.Backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "books")
public class Book {

    @Id
    private String id;
    private String title;
    private String author;
    private String language;
    private double price;
    private String imageUrl;  // URL to the book image
    private int pages;
    private String category;  // Field for book category
    private String description;  // New field for book description

    // Default constructor
    public Book() {}

    // Full constructor
    public Book(String title, String author, String language, double price, String imageUrl, int pages, String category, String description) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.price = price;
        this.imageUrl = imageUrl;
        this.pages = pages;
        this.category = category;
        this.description = description;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Getter and Setter for description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
