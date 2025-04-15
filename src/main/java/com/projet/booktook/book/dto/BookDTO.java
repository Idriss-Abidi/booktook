package com.projet.booktook.book.dto;

import com.projet.booktook.book.BookCondition;
import com.projet.booktook.book.BookType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String description;
    private BookType type;
    private String category;
    private int price;
    private BookCondition condition;
    private Long userId;
    private boolean isAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
