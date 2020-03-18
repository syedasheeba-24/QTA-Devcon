package com.project.dao.evaluation;

import java.util.List;

import com.project.model.Evaluation;

public interface EvaluationDao {

	public Evaluation addScore(Evaluation evaluation);
	public List<Evaluation> getEvaluations(String category);

}
