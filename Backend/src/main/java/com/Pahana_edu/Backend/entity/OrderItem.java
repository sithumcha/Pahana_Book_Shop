package com.Pahana_edu.Backend.entity;



import java.math.BigDecimal;

public class OrderItem {

    private String bookId;
    private String bookTitle;
    private String bookImage;
    private BigDecimal bookPrice;
    private int quantity;
    private BigDecimal lineTotal;

    // Getters and Setters
    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }

    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }

    public String getBookImage() { return bookImage; }
    public void setBookImage(String bookImage) { this.bookImage = bookImage; }

    public BigDecimal getBookPrice() { return bookPrice; }
    public void setBookPrice(BigDecimal bookPrice) { this.bookPrice = bookPrice; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public BigDecimal getLineTotal() { return lineTotal; }
    public void setLineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; }
}
