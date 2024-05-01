package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class fetchAuthModes {
    private String requestId;
	private String timestamp;
    private fetchQuery query;
}
