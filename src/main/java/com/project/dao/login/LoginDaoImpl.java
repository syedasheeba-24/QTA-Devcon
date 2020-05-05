package com.project.dao.login;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.project.CustomInterceptor;
import com.project.model.Login;

@Repository
public class LoginDaoImpl implements LoginDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public int isValid() {

		Query query = new Query();
		List<Login> listOfEvents;
		// CustomInterceptor customInterceptor=new CustomInterceptor();
		String username = getUsername();
		query.addCriteria(Criteria.where("username").is(username));
		listOfEvents = mongoTemplate.find(query, Login.class);
		if (listOfEvents.size() >= 1) {
			if (listOfEvents.size() > 1 && listOfEvents.get(0).getRole().equals("evaluator")) {
				return 3;
			} else if (listOfEvents.size() > 1 || listOfEvents.get(0).getRole().equals("admin")) {
				return 0;
			} else if (listOfEvents.size() == 1 && listOfEvents.get(0).getRole().equals("evaluator")) {
				if (listOfEvents.get(0).getEvent().equals("devcon")) {
					return 1;
				} else
					return 2;
			} else
				return -1;
		} else
			return -1;
	}

	@Override
	public Login assignOrUpdateRole(Login login) {
		List<Login> listOfRoles;
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(login.getUsername()));
		listOfRoles = mongoTemplate.find(query, Login.class);
		if (!listOfRoles.isEmpty()) {
			if (listOfRoles.get(0).getRole().equals(login.getRole())) {
				if (!(listOfRoles.get(0).getEvent().equals(login.getEvent()))) {
					mongoTemplate.save(login);
				}
			} else {
				for (Login login2 : listOfRoles) {
					mongoTemplate.remove(login2);
				}
				mongoTemplate.save(login);
			}
		} else
			mongoTemplate.save(login);
		return login;
	}

	@Override
	public List<String> getAllDevconEvaluators() {
		String eventName = "devcon";
		String role = "evaluator";
		List<Login> listOfEvaluators;
		List<String> finalListOfEvaluators = new ArrayList<String>();
		Query query = new Query();
		query.addCriteria(Criteria.where("event").is(eventName));
		query.addCriteria(Criteria.where("role").is(role));
		listOfEvaluators = mongoTemplate.find(query, Login.class);
		if (!listOfEvaluators.isEmpty()) {
			for (Login login : listOfEvaluators) {
				finalListOfEvaluators.add(login.getAssociateName());
			}
		}
		return finalListOfEvaluators;
	}

	@Override
	public List<String> getIdOfDevconEvaluators() {
		String eventName = "devcon";
		String role = "evaluator";
		List<Login> listOfEvaluators;
		List<String> finalListOfEvaluatorsIds = new ArrayList<String>();
		Query query = new Query();
		query.addCriteria(Criteria.where("event").is(eventName));
		query.addCriteria(Criteria.where("role").is(role));
		listOfEvaluators = mongoTemplate.find(query, Login.class);
		if (!listOfEvaluators.isEmpty()) {
			for (Login login : listOfEvaluators) {
				finalListOfEvaluatorsIds.add(login.getUsername());
			}
		}
		return finalListOfEvaluatorsIds;
	}

	public String getUsername() {
		CustomInterceptor customInterceptor = new CustomInterceptor();
		return customInterceptor.associateID;
	}

}
