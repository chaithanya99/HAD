package com.had.project5.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class Auth {
	private String purpose;
	private List<String> modes;
}
