package in.narakcode.authify.controller;

import in.narakcode.authify.dto.ProfileRequest;
import in.narakcode.authify.dto.ProfileResponse;
import in.narakcode.authify.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request) {
        ProfileResponse response = profileService.createProfile(request);

        // TODO: Send welcome email

        return response;
    }

}
