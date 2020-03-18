package com.project.dao.login;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.Login;

@Service
public class LoginService {

	@Autowired
	LoginDaoImpl loginRepository;

	public int isLoginSuccessful(String username, String password) {
		return loginRepository.isValid(username, password);
	}

	public Login registerRole(Login login) {
		return loginRepository.assignOrUpdateRole(login);
	}

	public List<String> getDevconEvaluatorsFromLoginRepo() {
		return loginRepository.getAllDevconEvaluators();
	}

	public List<String> getIdOfDevconEvaluatorsFromLoginRepo() {
		return loginRepository.getIdOfDevconEvaluators();
	}
}
