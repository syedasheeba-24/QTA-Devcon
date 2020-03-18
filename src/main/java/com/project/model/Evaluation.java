package com.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "evaluation")
public class Evaluation {

	@Id
	String id;
	String nameOfEvaluator;
	Score[] listOfScore;

	public Evaluation() {
	}

	public Evaluation(String nameOfEvaluator,Score[] listOfScore) {
		this.nameOfEvaluator=nameOfEvaluator;
		this.listOfScore = listOfScore;

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getNameOfEvaluator() {
		return nameOfEvaluator;
	}

	public void setNameOfEvaluator(String nameOfEvaluator) {
		this.nameOfEvaluator = nameOfEvaluator;
	}

	public Score[] getListOfScore() {
		return listOfScore;
	}

	public void setListOfScore(Score[] listOfScore) {
		this.listOfScore = listOfScore;
	}

}
