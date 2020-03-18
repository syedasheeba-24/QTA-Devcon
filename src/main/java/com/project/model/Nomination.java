package com.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "nomination")
public class Nomination {
	@Id
	String id;
	String listOfNominations[];
	String projectType;
	String idOfActivatedForm;
	String parentFormName;
	String teamName;

	public Nomination(String listOfNominations[], String projectType, String idOfActivatedForm, String parentFormName,String teamName) {
		this.listOfNominations = listOfNominations;
		this.projectType = projectType;
		this.idOfActivatedForm = idOfActivatedForm;
		this.parentFormName = parentFormName;
		this.teamName=teamName;
	}

	public Nomination() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String[] getListOfNominations() {
		return listOfNominations;
	}

	public void setListOfNominations(String[] listOfNominations) {
		this.listOfNominations = listOfNominations;
	}

	public String getProjectType() {
		return projectType;
	}

	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}

	public String getIdOfActivatedForm() {
		return idOfActivatedForm;
	}

	public void setIdOfActivatedForm(String idOfActivatedForm) {
		this.idOfActivatedForm = idOfActivatedForm;
	}

	public String getParentFormName() {
		return parentFormName;
	}

	public void setParentFormName(String parentFormName) {
		this.parentFormName = parentFormName;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	

}
