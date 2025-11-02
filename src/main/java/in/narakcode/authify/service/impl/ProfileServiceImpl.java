package in.narakcode.authify.service.impl;

import in.narakcode.authify.dto.ProfileRequest;
import in.narakcode.authify.dto.ProfileResponse;
import in.narakcode.authify.entity.UserEntity;
import in.narakcode.authify.repository.UserRepository;
import in.narakcode.authify.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public ProfileResponse getProfile(String email) {
    UserEntity existingUser = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

    return convertToProfileResponse(existingUser);
  }

  @Transactional
  @Override
  public ProfileResponse createProfile(ProfileRequest request) {

    UserEntity newProfile = convertToUserEntity(request);

    if (!userRepository.existsByEmail(request.getEmail())) {
      newProfile = userRepository.save(newProfile);
      return convertToProfileResponse(newProfile);
    }
    throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
  }

  private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
    return ProfileResponse.builder().name(newProfile.getName()).email(newProfile.getEmail())
        .userId(newProfile.getUserId()).isAccountVerified(newProfile.isAccountVerified()).build();
  }

  private UserEntity convertToUserEntity(ProfileRequest request) {
    return UserEntity.builder().email(request.getEmail()).userId(UUID.randomUUID().toString())
        .name(request.getName()).password(passwordEncoder.encode(request.getPassword()))
        .isAccountVerified(true).resetOtpExpireAt(0L).verifyOtp(null).verifyOtpExpireAt(0L)
        .resetOtp(null).build();
  }

}
