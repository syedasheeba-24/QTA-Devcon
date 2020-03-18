package com.project.dao.forms;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.project.model.FormActivation;
import com.project.model.Form;

@Repository
public class FormDaoImpl implements FormDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public Form addForm(Form form) {
		form = mongoTemplate.save(form);
		return form;
	}

	@Override
	public Form findFormActivated(String formId) throws NullPointerException {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(formId));
		return mongoTemplate.findOne(query, Form.class);
	}

	@Override
	public List<String> getCategory() throws NullPointerException {
		return mongoTemplate.findDistinct("category", Form.class, String.class);
	}

	@Override
	public List<String> getActivatedCategory(FormActivation formActivation) throws NullPointerException {
		String listOfActivatedId[];
		listOfActivatedId = formActivation.getArrOfId();
		Query[] queries = new Query[listOfActivatedId.length];
		Form form = new Form();
		List<String> listOfActivatedCategory = new ArrayList<String>();

		for (int index = 0; index < listOfActivatedId.length; index++) {
			queries[index] = new Query();
			if (listOfActivatedId[index] != null) {
				queries[index].addCriteria(Criteria.where("id").is(listOfActivatedId[index]));
				form = mongoTemplate.findOne(queries[index], Form.class);
				listOfActivatedCategory.add(form.getCategory());
			}
		}
		return listOfActivatedCategory;
	}

	@Override
	public List<Form> getFormsByCategory(String category) throws NullPointerException {
		Query query = new Query();
		query.addCriteria(Criteria.where("category").is(category));
		return mongoTemplate.find(query, Form.class);
	}

}
