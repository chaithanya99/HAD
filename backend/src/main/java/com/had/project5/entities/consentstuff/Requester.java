package com.had.project5.entities.consentstuff;

public class Requester {

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Identifier getIdentifier() {
		return identifier;
	}

	public void setIdentifier(Identifier identifier) {
		this.identifier = identifier;
	}

	private String name;
	
	private Identifier identifier;
}
