package com.project.dao.login;

import java.util.List;

import com.project.model.Login;

public interface LoginDao {

	public int isValid();

	public Login assignOrUpdateRole(Login login);

	public List<String> getAllDevconEvaluators();

	public List<String> getIdOfDevconEvaluators();
}
