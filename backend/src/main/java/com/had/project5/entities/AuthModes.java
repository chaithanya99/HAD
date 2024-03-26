package com.had.project5.entities;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class AuthModes {
	private String requestId;
	private String timestamp;
	private Auth auth;
	private Resp resp;
}
