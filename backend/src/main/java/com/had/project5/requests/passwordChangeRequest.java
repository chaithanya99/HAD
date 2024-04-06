package com.had.project5.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class passwordChangeRequest {
    private String currentPassword;
    private String newPassword;
    private String newConfirmPassword;
}
