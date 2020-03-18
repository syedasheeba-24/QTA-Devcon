package com.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "devconscore")
public class DevconScore {

	@Id
	String id;
	String paperName, evaluatorName;
	String[] criteria, weightage, score, comments, totalWeightage;
	String finalWeightedScore;

	public DevconScore(String id, String paperName, String evaluatorName, String[] criteria, String[] weightage,
			String[] score, String[] comments, String finalWeightedScore, String[] totalWeightage) {
		super();
		this.id = id;
		this.paperName = paperName;
		this.evaluatorName = evaluatorName;
		this.criteria = criteria;
		this.weightage = weightage;
		this.score = score;
		this.comments = comments;
		this.finalWeightedScore = finalWeightedScore;
		this.totalWeightage = totalWeightage;
	}

	public DevconScore() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPaperName() {
		return paperName;
	}

	public void setPaperName(String paperName) {
		this.paperName = paperName;
	}

	public String getEvaluatorName() {
		return evaluatorName;
	}

	public void setEvaluatorName(String evaluatorName) {
		this.evaluatorName = evaluatorName;
	}

	public String[] getCriteria() {
		return criteria;
	}

	public void setCriteria(String[] criteria) {
		this.criteria = criteria;
	}

	public String[] getWeightage() {
		return weightage;
	}

	public void setWeightage(String[] weightage) {
		this.weightage = weightage;
	}

	public String[] getScore() {
		return score;
	}

	public void setScore(String[] score) {
		this.score = score;
	}

	public String[] getComments() {
		return comments;
	}

	public void setComments(String[] comments) {
		this.comments = comments;
	}

	public String getFinalWeightedScore() {
		return finalWeightedScore;
	}

	public void setFinalWeightedScore(String finalWeightedScore) {
		this.finalWeightedScore = finalWeightedScore;
	}

	public String[] getTotalWeightage() {
		return totalWeightage;
	}

	public void setTotalWeightage(String[] totalWeightage) {
		this.totalWeightage = totalWeightage;
	}

}
