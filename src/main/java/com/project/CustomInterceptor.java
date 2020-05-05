package com.project;

import java.security.AccessController;
import java.util.Set;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.cerner.cloud.idm.idp.rp.UserPrincipal;

@Component
public class CustomInterceptor extends HandlerInterceptorAdapter {

	public static String associateID;

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		String username;

		Subject subj = Subject.getSubject(AccessController.getContext());
		if (subj != null) {
			Set s = subj.getPrincipals();
			if (s.size() > 0) {
				UserPrincipal up = (UserPrincipal) s.toArray()[0];
				username = up.getName();
				associateID = username.substring(username.lastIndexOf("/") + 1);
				request.getSession().setAttribute("associateId", associateID);
			}
		}
		return true;
	}

}
