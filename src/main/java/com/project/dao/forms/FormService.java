package com.project.dao.forms;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dao.formactivation.FormActivationDaoImpl;
import com.project.model.Form;
import com.project.model.FormActivation;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class FormService {

	@Autowired
	FormDaoImpl formRepository;
	
	@Autowired
	FormActivationDaoImpl formActivationRepository;

	Logger logger = Logger.getAnonymousLogger();

	public Form sendFormToDaoImpl(Form form) {
		formRepository.addForm(form);
		return form;
	}

	public List<String> getCategoriesFromDaoImpl() {
		List<String> listOfCategory = new ArrayList<String>();
		try {
			listOfCategory = formRepository.getCategory();
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No categories found");
		}
		return listOfCategory;
	}
	
	public List<String> getActivatedCategoriesFromDaoImpl() {
		List<String> listOfCategory = new ArrayList<String>();
		try {
			FormActivation formActivation = formActivationRepository.getActivatedForm();
			listOfCategory = formRepository.getActivatedCategory(formActivation);
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No activated categories found");
		}
		return listOfCategory;
	}
	

	public List<Form> getFormsByCategoryFromDaoImpl(String category) {
		List<Form> listOfForms = new ArrayList<Form>();
		try {
			listOfForms = formRepository.getFormsByCategory(category);
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No forms found");
		}
		return listOfForms;
	}

}
