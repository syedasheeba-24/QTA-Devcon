package com.project.dao.formactivation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.dao.forms.FormDaoImpl;
import com.project.model.FormActivation;
import com.project.model.Field;
import com.project.model.Form;

@Service
public class FormActivationService {

	@Autowired
	FormActivationDaoImpl formActivationRepository;

	@Autowired
	FormDaoImpl formRepository;

	Logger logger = Logger.getAnonymousLogger();

	public FormActivation sendActivatedFormToDaoImpl(FormActivation form) {
		formActivationRepository.addActivatedForm(form);
		return form;
	}

	public Form getFormActivatedFromDaoImpl(String category) {
		Form form = new Form();
		int index;
		String[] listOfCategory;
		String[] listOfId;
		String formId;
		try {
			FormActivation formActivation = formActivationRepository.getActivatedForm();
			listOfCategory = formActivation.getCategories();
			index = Arrays.asList(listOfCategory).indexOf(category);
			listOfId = formActivation.getArrOfId();
			formId = listOfId[index];
			form = formRepository.findFormActivated(formId);
		} catch (Exception e) {
			logger.log(Level.SEVERE,
					"Cannot find activated form, please ensure the Id of form to be retreived is correct", e);
		}
		return form;
	}

	public List<Integer> findFieldPosOfMandatoryField(String category) throws NullPointerException {
		Form form = getFormActivatedFromDaoImpl(category);
		Field[] listOFields = form.getFields();
		List<Integer> listOfPositions = new ArrayList<Integer>();
		for (int index = 0; index < listOFields.length; index++) {
			if (listOFields[index].getIsMandatoryField().equals("yes")) {
				listOfPositions.add(index);
			}
		}
		return listOfPositions;
	}

	public String getIdOfFormActivated() {
		String activatedFormCollectionId = "";
		try {
			FormActivation formActivation = formActivationRepository.getActivatedForm();
			activatedFormCollectionId = formActivation.getId();

		} catch (Exception e) {
			logger.log(Level.SEVERE, "No document found, please ensure the Id of form to be retreived is correct", e);
		}
		return activatedFormCollectionId;
	}

	public String[] getIdsFromActivatedForm() {
		String[] listOfId = { "" };
		try {
			FormActivation formActivation = formActivationRepository.getActivatedForm();
			listOfId = formActivation.getArrOfId();
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No document found, please ensure the Id of form to be retreived is correct", e);
		}
		return listOfId;
	}
}
