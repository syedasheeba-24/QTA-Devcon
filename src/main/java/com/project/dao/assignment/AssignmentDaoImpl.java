package com.project.dao.assignment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import com.project.model.Assignment;

@Repository
public class AssignmentDaoImpl implements AssignmentDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public Assignment assignPaper(Assignment assignment) {
		Assignment assignment2 = new Assignment();
		Query query = new Query();
		query.addCriteria(Criteria.where("evaluatorID").is(assignment.getEvaluatorID()));
		assignment2 = mongoTemplate.findOne(query, Assignment.class);
		if (assignment2 != null) {
			assignment2.setPapersAssigned(assignment.getPapersAssigned());
			mongoTemplate.save(assignment2);
		} else {
			mongoTemplate.save(assignment);
		}
		return assignment;
	}

	@Override
	public String[] getPapers(String evaluatorID) {
		String[] listOfPapers= {""};
		Assignment assignment = new Assignment();
		Query query = new Query();
		query.addCriteria(Criteria.where("evaluatorID").is(evaluatorID));
		assignment = mongoTemplate.findOne(query, Assignment.class);
		if(assignment!=null) {
		listOfPapers = assignment.getPapersAssigned();
		}
		return listOfPapers;
	}
}
