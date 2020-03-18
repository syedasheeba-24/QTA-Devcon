package com.project.dao.formactivation;

import com.project.model.FormActivation;

public interface FormActivationDao {

	public FormActivation addActivatedForm(FormActivation form);

	public FormActivation getActivatedForm();
	

}
