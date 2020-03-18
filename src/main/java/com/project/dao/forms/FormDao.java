package com.project.dao.forms;

import java.util.List;

import com.project.model.Form;
import com.project.model.FormActivation;

public interface FormDao {

	public Form addForm(Form form);

	public Form findFormActivated(String formId);

	public List<String> getCategory();
	
	public List<Form> getFormsByCategory(String category);
	
	public List<String> getActivatedCategory(FormActivation formActivation);
	
}
