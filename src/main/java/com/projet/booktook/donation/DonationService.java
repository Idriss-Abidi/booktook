package com.projet.booktook.donation;

import com.projet.booktook.donation.dto.DonationDTO;
import com.projet.booktook.user.User;
import com.projet.booktook.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonationService {
    private final DonationRepository donationRepository;
    private final UserRepository userRepository;

    public DonationDTO createDonation(DonationDTO donationDTO,  Long userId) {
        User createdBy = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Donation donation = new Donation();
        donation.setTitle(donationDTO.getTitle());
        donation.setDescription(donationDTO.getDescription());
        donation.setOrganizationName(donationDTO.getOrganizationName());
        donation.setContactPerson(donationDTO.getContactPerson());
        donation.setPhone(donationDTO.getPhone());
        donation.setEmail(donationDTO.getEmail());
        donation.setWebsite(donationDTO.getWebsite());
        donation.setStartDate(donationDTO.getStartDate());
        donation.setEndDate(donationDTO.getEndDate());
        donation.setActive(donationDTO.isActive());
        donation.setCreatedBy(createdBy);

        Donation savedDonation = donationRepository.save(donation);
        return mapToDTO(savedDonation);
    }

    public DonationDTO getDonationById(Long id) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));
        return mapToDTO(donation);
    }

    public List<DonationDTO> getAllActiveDonations() {
        return donationRepository.findByIsActiveTrue().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public DonationDTO updateDonation(Long id, DonationDTO donationDTO) {
        Donation existingDonation = donationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));

        existingDonation.setTitle(donationDTO.getTitle());
        existingDonation.setDescription(donationDTO.getDescription());
        existingDonation.setOrganizationName(donationDTO.getOrganizationName());
        existingDonation.setContactPerson(donationDTO.getContactPerson());
        existingDonation.setPhone(donationDTO.getPhone());
        existingDonation.setEmail(donationDTO.getEmail());
        existingDonation.setWebsite(donationDTO.getWebsite());
        existingDonation.setStartDate(donationDTO.getStartDate());
        existingDonation.setEndDate(donationDTO.getEndDate());
        existingDonation.setActive(donationDTO.isActive());

        Donation updatedDonation = donationRepository.save(existingDonation);
        return mapToDTO(updatedDonation);
    }

    public DonationDTO toggleDonationStatus(Long id) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));
        donation.setActive(!donation.isActive());
        Donation updatedDonation = donationRepository.save(donation);
        return mapToDTO(updatedDonation);
    }

    public void deleteDonation(Long id) {
        if (!donationRepository.existsById(id)) {
            throw new EntityNotFoundException("Donation not found");
        }
        donationRepository.deleteById(id);
    }

    public List<DonationDTO> getDonationsByUser(Long userId) {
        return donationRepository.findByCreatedById(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<DonationDTO> getUpcomingDonations() {
        return donationRepository.findByStartDateAfter(LocalDate.now()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private DonationDTO mapToDTO(Donation donation) {
        DonationDTO dto = new DonationDTO();
        dto.setId(donation.getId());
        dto.setTitle(donation.getTitle());
        dto.setDescription(donation.getDescription());
        dto.setOrganizationName(donation.getOrganizationName());
        dto.setContactPerson(donation.getContactPerson());
        dto.setPhone(donation.getPhone());
        dto.setEmail(donation.getEmail());
        dto.setWebsite(donation.getWebsite());
        dto.setStartDate(donation.getStartDate());
        dto.setEndDate(donation.getEndDate());
        dto.setActive(donation.isActive());
        dto.setCreatedById(donation.getCreatedBy().getId());
        dto.setCreatedAt(donation.getCreatedAt());
        dto.setUpdatedAt(donation.getUpdatedAt());
        return dto;
    }
}