package com.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "formactivation")
public class FormActivation {

	@Id
	String id;
	String[] arrOfId;
	String[] categories;

	public FormActivation(String[] arrOfId, String[] categories) {
		this.arrOfId = arrOfId;
		this.categories = categories;
	}

	public FormActivation() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String[] getArrOfId() {
		return arrOfId;
	}

	public void setArrOfId(String[] arrOfId) {
		this.arrOfId = arrOfId;
	}

	public String[] getCategories() {
		return categories;
	}

	public void setCategories(String[] categories) {
		this.categories = categories;
	}

}
