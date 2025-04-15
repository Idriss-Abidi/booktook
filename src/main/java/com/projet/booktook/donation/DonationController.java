package com.projet.booktook.donation;

import com.projet.booktook.donation.dto.DonationDTO;
import com.projet.booktook.user.UserService;
import com.projet.booktook.user.config.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {
    private final DonationService donationService;
    private final UserService userService;


    @PostMapping
    public ResponseEntity<DonationDTO> createDonation(@RequestBody DonationDTO donationDTO) {
        CustomUserDetails userDetails = userService.auth();
        return ResponseEntity.ok(donationService.createDonation(donationDTO, userDetails.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationDTO> getDonationById(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.getDonationById(id));
    }

    @GetMapping("/active")
    public ResponseEntity<List<DonationDTO>> getAllActiveDonations() {
        return ResponseEntity.ok(donationService.getAllActiveDonations());
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<DonationDTO>> getUpcomingDonations() {
        return ResponseEntity.ok(donationService.getUpcomingDonations());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationDTO> updateDonation(
            @PathVariable Long id,
            @RequestBody DonationDTO donationDTO) {
        return ResponseEntity.ok(donationService.updateDonation(id, donationDTO));
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<DonationDTO> toggleDonationStatus(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.toggleDonationStatus(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DonationDTO>> getDonationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(donationService.getDonationsByUser(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}