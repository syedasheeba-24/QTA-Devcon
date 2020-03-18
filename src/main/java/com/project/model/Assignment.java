package com.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "assignment")
public class Assignment {

	@Id
	String id;
	String evaluatorName;
	String evaluatorID;
	String[] papersAssigned;

	public Assignment(String id, String evaluatorName, String evaluatorID, String[] papersAssigned) {
		super();
		this.id = id;
		this.evaluatorName = evaluatorName;
		this.evaluatorID = evaluatorID;
		this.papersAssigned = papersAssigned;
	}

	public Assignment() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEvaluatorName() {
		return evaluatorName;
	}

	public void setEvaluatorName(String evaluatorName) {
		this.evaluatorName = evaluatorName;
	}

	public String getEvaluatorID() {
		return evaluatorID;
	}

	public void setEvaluatorID(String evaluatorID) {
		this.evaluatorID = evaluatorID;
	}

	public String[] getPapersAssigned() {
		return papersAssigned;
	}

	public void setPapersAssigned(String[] papersAssigned) {
		this.papersAssigned = papersAssigned;
	}

}
