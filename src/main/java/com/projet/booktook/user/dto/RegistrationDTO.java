package com.projet.booktook.user.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationDTO {
    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String description;
}