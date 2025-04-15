package com.projet.booktook.user;

import com.projet.booktook.exception.EmailTakenException;
import com.projet.booktook.exception.UserNotFoundException;
import com.projet.booktook.user.config.CustomUserDetails;
import com.projet.booktook.user.dto.LoginDTO;
import com.projet.booktook.user.dto.RegistrationDTO;
import com.projet.booktook.user.dto.UserDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.projet.booktook.utils.JwtTokenProvider;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    protected final JwtTokenProvider jwtTokenProvider;

    public CustomUserDetails auth() {
        return (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    @Transactional
    public void registerUser(RegistrationDTO registrationDTO) throws EmailTakenException, IllegalStateException {

        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new EmailTakenException();
        }

        User newUser = new User();
        newUser.setUsername(registrationDTO.getUsername());
        newUser.setEmail(registrationDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        newUser.setAdmin(false);
        newUser.setDescription(registrationDTO.getDescription());
        userRepository.save(newUser);
    }

    public String login(LoginDTO loginDTO) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Load user details
        return jwtTokenProvider.generateToken(authentication);
    }

    private boolean isTokenExpired(Timestamp tokenExpiry) {
        return tokenExpiry.before(new Timestamp(System.currentTimeMillis()));
    }

    public User findUser(long id) {
        return userRepository.getReferenceById(id);
    }

    @Transactional(readOnly = true)
    public UserDTO getAllUserInfo(User user) {
        return mapEntityToDTO(user);
    }

    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByPhone(userDTO.getPhone())) {
            throw new IllegalArgumentException("Phone number already in use");
        }

        User user = new User();
        mapDTOToEntity(userDTO, user);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User savedUser = userRepository.save(user);
        return mapEntityToDTO(savedUser);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return mapEntityToDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!existingUser.getEmail().equals(userDTO.getEmail()) &&
                userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (!existingUser.getPhone().equals(userDTO.getPhone()) &&
                userRepository.existsByPhone(userDTO.getPhone())) {
            throw new IllegalArgumentException("Phone number already in use");
        }

        mapDTOToEntity(userDTO, existingUser);
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        User updatedUser = userRepository.save(existingUser);
        return mapEntityToDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }


    private UserDTO mapEntityToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        userDTO.setEmail(user.getEmail());
        userDTO.setDescription(user.getDescription());
        userDTO.setPhone(user.getPhone());
        userDTO.setAddress(user.getAddress());
        userDTO.setCity(user.getCity());
        userDTO.setState(user.getState());
        userDTO.setProfilePictureUrl(user.getProfilePictureUrl());
        userDTO.setAdmin(user.isAdmin());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        return userDTO;
    }

    private void mapDTOToEntity(UserDTO userDTO, User user) {
        user.setUsername(userDTO.getUsername());
        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setEmail(userDTO.getEmail());
        user.setDescription(userDTO.getDescription());
        user.setPhone(userDTO.getPhone());
        user.setAddress(userDTO.getAddress());
        user.setCity(userDTO.getCity());
        user.setState(userDTO.getState());
        user.setProfilePictureUrl(userDTO.getProfilePictureUrl());
        user.setAdmin(userDTO.isAdmin());
    }


    @Transactional
    public void makeUserAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        if(user.isAdmin()) {
            throw new IllegalStateException("User is already an admin");
        }

        user.setAdmin(true);
        userRepository.save(user);
    }
}