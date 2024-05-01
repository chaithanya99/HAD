package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FetchAuthInit {
    private String requestId;
	private String timestamp;
    private Query query;
}
