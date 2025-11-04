package in.narakcode.authify.service;


import in.narakcode.authify.dto.ProfileRequest;
import in.narakcode.authify.dto.ProfileResponse;

public interface ProfileService {

    ProfileResponse getProfile(String email);

    ProfileResponse createProfile(ProfileRequest request);

    void sendResetOtp(String email);

    void resetPassword(String email, String otp, String newPassword);

    void sendOtp(String email);

    void verifyOtp(String email, String otp);

    String getLoggedInUserId(String email);

}
