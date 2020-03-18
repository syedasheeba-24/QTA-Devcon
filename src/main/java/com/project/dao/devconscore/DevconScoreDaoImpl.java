package com.project.dao.devconscore;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;


import com.project.model.DevconScore;

@Repository
public class DevconScoreDaoImpl implements DevconScoreDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public DevconScore addDevconScore(DevconScore devconScore) {
		DevconScore devconScore2 = new DevconScore();
		Query query = new Query();
		query.addCriteria(Criteria.where("evaluatorName").is(devconScore.getEvaluatorName()));
		query.addCriteria(Criteria.where("paperName").is(devconScore.getPaperName()));
		devconScore2 = mongoTemplate.findOne(query, DevconScore.class);
		if (devconScore2 != null) {
			devconScore2.setScore(devconScore.getScore());
			devconScore2.setComments(devconScore.getComments());
			devconScore2.setFinalWeightedScore(devconScore.getFinalWeightedScore());
			devconScore2.setTotalWeightage(devconScore.getTotalWeightage());
			mongoTemplate.save(devconScore2);
		} else {
			mongoTemplate.save(devconScore);
		}
		return devconScore;

	}

	@Override
	public List<DevconScore> getAllDevconScores() {
		Query query = new Query();
		query.with(new Sort(Sort.Direction.ASC, "paperName"));
		List<DevconScore> listOfDevconScores = new ArrayList<DevconScore>();
		listOfDevconScores = mongoTemplate.find(query, DevconScore.class);
		return listOfDevconScores;
	}
	

}
