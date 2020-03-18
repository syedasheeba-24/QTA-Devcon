package com.project.dao.nomination;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.project.model.Nomination;

@Repository
public class NominationDaoImpl implements NominationDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public Nomination addNomination(Nomination nomination) {
		nomination = mongoTemplate.save(nomination);
		return nomination;
	}

	@Override
	public Nomination findNominationById(String id) throws NullPointerException {
		return mongoTemplate.findById(id, Nomination.class);
	}

	@Override
	public List<Nomination> findNominationByGroup(String idOfActivatedForm) throws NullPointerException {
		Query query = new Query();
		query.addCriteria(Criteria.where("idOfActivatedForm").is(idOfActivatedForm));
		return mongoTemplate.find(query, Nomination.class);
	}
	
}
