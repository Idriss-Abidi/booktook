package com.projet.booktook.user.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password; // Only for create/update, not returned in responses
    private String description;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String profilePictureUrl;
    private boolean isAdmin;
    private int ratingCount;
    private int averageRating;
    private int rating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}