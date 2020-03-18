package com.project.dao.formactivation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;
import com.project.model.FormActivation;

@Repository
public class FormActivationDaoImpl implements FormActivationDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public FormActivation addActivatedForm(FormActivation form) {
		form = mongoTemplate.save(form);
		return form;
	}

	@Override
	public FormActivation getActivatedForm() {
		List<FormActivation> formActivation = new ArrayList<FormActivation>();
		formActivation = mongoTemplate.findAll(FormActivation.class);
		return formActivation.get(0);
	}
}
