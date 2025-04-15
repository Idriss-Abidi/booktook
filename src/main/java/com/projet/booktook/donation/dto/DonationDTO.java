package com.projet.booktook.donation.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DonationDTO {
    private Long id;
    private String title;
    private String description;
    private String organizationName;
    private String contactPerson;
    private String phone;
    private String email;
    private String website;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isActive;
    private Long createdById;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}