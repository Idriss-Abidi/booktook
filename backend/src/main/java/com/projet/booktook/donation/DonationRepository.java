package com.projet.booktook.donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByIsActiveTrue();
    List<Donation> findByCreatedById(Long userId);
    List<Donation> findByOrganizationNameContainingIgnoreCase(String organizationName);
    List<Donation> findByStartDateAfter(LocalDate date);
    List<Donation> findByEndDateBefore(LocalDate date);
    List<Donation> findByStartDateBetween(LocalDate start, LocalDate end);
}