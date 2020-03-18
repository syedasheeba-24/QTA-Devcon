package com.project.controller;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.dao.formactivation.FormActivationDaoImpl;
import com.project.dao.formactivation.FormActivationService;
import com.project.dao.forms.FormDaoImpl;
import com.project.dao.forms.FormService;
import com.project.dao.login.LoginDaoImpl;
import com.project.dao.login.LoginService;
import com.project.dao.nomination.NominationDaoImpl;
import com.project.dao.nomination.NominationService;
import com.project.model.Form;
import com.project.model.FormActivation;
import com.project.model.Login;
import com.project.model.Nomination;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FormControllerTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@Autowired
	FormService formService;

	@Autowired
	NominationService nominationService;

	@Autowired
	LoginService loginService;

	@Autowired
	FormActivationService formActivationService;

	String arrOfForms[] = { "project name", "project id" };
	String arrOfNominationData[] = { "Quality", "Development team", "5" };

	ObjectMapper objectMapper = new ObjectMapper();

	@MockBean
	FormDaoImpl formDaoImpl;

	@MockBean
	NominationDaoImpl nominationDaoImpl;

	@MockBean
	LoginDaoImpl loginDaoImpl;

	@MockBean
	FormActivationDaoImpl formActivationDaoImpl;

	Logger logger = Logger.getAnonymousLogger();

	@Before
	public void Setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}

	@Test
	public void addFormTest() throws Exception {
	//	Form form3 = new Form(arrOfForms, "form 2", "Quality");
		Form form = new Form();
		//form.setFields(arrOfForms);
		form.setFormName("form 2");
		form.setCategory("quality");
		String jsonRequest = objectMapper.writeValueAsString(form);
		MvcResult mvcResult = this.mockMvc
				.perform(post("/create-forms").content(jsonRequest).contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
		String resultContent = mvcResult.getResponse().getContentAsString();
		Form form2 = objectMapper.readValue(resultContent, Form.class);
		assertEquals("form 2", form2.getFormName());
	}

	@Test
	public void addNominationTest() throws Exception {
		Nomination nomination = new Nomination();
		Nomination nomination3 = new Nomination(arrOfNominationData, "Quality", "123", "Form 2", "development team");
		nomination.setProjectType("quality");
		nomination.setIdOfActivatedForm("123");
		nomination.setListOfNominations(arrOfNominationData);
		nomination.setTeamName("testing team");
		nomination.setParentFormName("form 2");
		String jsonRequest = objectMapper.writeValueAsString(nomination);
		MvcResult mvcResult = this.mockMvc
				.perform(post("/save-nomination").content(jsonRequest).contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
		String resultContent = mvcResult.getResponse().getContentAsString();
		Nomination nomination2 = objectMapper.readValue(resultContent, Nomination.class);
		assertEquals("quality", nomination2.getProjectType());
	}

	@Test
	public void addActivatedFormTest() throws Exception {
		FormActivation form = new FormActivation(arrOfNominationData, arrOfNominationData);
		FormActivation formActivation = new FormActivation();
		formActivation.setId("123");
		formActivation.setArrOfId(arrOfNominationData);
		formActivation.setCategories(arrOfForms);
		String jsonRequest = objectMapper.writeValueAsString(formActivation);
		MvcResult mvcResult = this.mockMvc
				.perform(post("/saveform").content(jsonRequest).contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
		String resultContent = mvcResult.getResponse().getContentAsString();
		FormActivation formActivation2 = objectMapper.readValue(resultContent, FormActivation.class);
		assertEquals("123", formActivation2.getId());
	}

	@Test
	public void getCategoriesTest() throws Exception {
		this.mockMvc.perform(get("/get-categories").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void getActivatedFormIdTest() throws Exception {
		this.mockMvc.perform(get("/get-activated-ids").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void getNominationByIDTest() throws Exception {
		this.mockMvc.perform(get("/get-nomination/{id}", 123).content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void getNominationByGroupTest() throws Exception {
		this.mockMvc.perform(
				get("/get-nomination-by-group/{projectType}", "quality").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void getFormByCategoryTest() throws Exception {
		this.mockMvc.perform(get("/get-forms/{category}", "quality").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void getActivatedFormById() throws Exception {
		this.mockMvc.perform(get("/get-id").content(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk())
				.andReturn();
	}

	@Test
	public void getActivatedCategoriesTest() throws Exception {
		this.mockMvc.perform(get("/get-activated-categories").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void getActivatedFormByCategoryTest() throws Exception {
		this.mockMvc.perform(get("/get-activated-form/{category}", "quality").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void isValidTest() throws Exception {
		Login login = new Login();
		Login login2 = new Login("user", "user", "user", "12");
		String usernameString = login2.getUsername();
		String password = login2.getPassword();
		String id = login2.getId();
		String role = login2.getRole();
		String score = login2.getScore();
		login.setUsername("user");
		login.setPassword("user");
		login.setId("123");
		login.setRole("user");
		login.setScore("12");
		this.mockMvc.perform(
				get("/auth/{username}/{password}", "user", "password").content(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn();
	}

	@Test
	public void testCategoriesNotFound() {
		List<String> categories;
		FormService formService = new FormService();
		categories = formService.getCategoriesFromDaoImpl();
		assertEquals(0, categories.size());
	}

	@Test
	public void testFormsByCategoryNotFound() {
		List<Form> forms;
		FormService formService = new FormService();
		forms = formService.getFormsByCategoryFromDaoImpl("abc");
		assertEquals(0, forms.size());
	}

	@Test
	public void testActivatedCategoriesNotFound() {
		List<String> activatedCategories;
		FormService formService = new FormService();
		activatedCategories = formService.getActivatedCategoriesFromDaoImpl();
		assertEquals(0, activatedCategories.size());
	}

	@Test
	public void testActivatedFormNotFound() {
		Form form;
		FormActivationService formActivationService = new FormActivationService();
		form = formActivationService.getFormActivatedFromDaoImpl("abc");
		assertEquals(null, form.getId());
	}

	@Test
	public void testNominationNotFound() {
		Nomination nomination;
		NominationService nominationService = new NominationService();
		nomination = nominationService.getNominationByIdFromDaoImpl("123");
		assertEquals(null, nomination.getId());
	}

	@Test
	public void testNominationByGroupNotFound() {
		List<Nomination> nomination;
		NominationService nominationService = new NominationService();
		nomination = nominationService.getNominationByGroupFromDaoImpl("abc");
		assertEquals(0, nomination.size());
	}

	@Test
	public void getIdOfActivatedFormThroughControllerTest() {
		FormActivation form = new FormActivation(arrOfNominationData, arrOfNominationData);
		Mockito.when(formActivationDaoImpl.getActivatedForm()).thenReturn(form);
		assertEquals(null, formActivationService.getIdOfFormActivated());
	}

	@Test
	public void getActivatedFormIdsThroughControllerTest() {
		FormActivation form = new FormActivation(arrOfNominationData, arrOfNominationData);
		Mockito.when(formActivationDaoImpl.getActivatedForm()).thenReturn(form);
		assertEquals(3, formActivationService.getIdsFromActivatedForm().length);
	}

	@Test
	public void getCategoryThroughControllerTest() {
		FormActivation form = new FormActivation(arrOfNominationData, arrOfNominationData);
		Mockito.when(formActivationDaoImpl.getActivatedForm()).thenReturn(form);
		assertEquals(null, formActivationService.getFormActivatedFromDaoImpl("Quality"));
	}

	@Test
	public void getFormThroughControllerTest() {
		FormDaoImpl formDaoImpl = new FormDaoImpl();
		try {
			Form form2 = formDaoImpl.findFormActivated("124");
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No form found");
		}
	}

	@Test
	public void getActivatedCategoryThroughControllerTest() {
		FormActivation form = new FormActivation(arrOfNominationData, arrOfNominationData);
		FormDaoImpl formDaoImpl = new FormDaoImpl();
		List<String> lists = new ArrayList<String>();
		try {
			lists = formDaoImpl.getActivatedCategory(form);
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No form found");
		}
		assertEquals(0, lists.size());
	}
	
	@Test
	public void getFormsCategoryThroughControllerTest() {
		FormDaoImpl formDaoImpl = new FormDaoImpl();
		try {
			List<Form> form2 = formDaoImpl.getFormsByCategory("abc");
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No form found");
		}
	}
	
	@Test
	public void getActivatedFormThroughControllerTest() {
		FormActivationDaoImpl formActivationDaoImpl = new FormActivationDaoImpl();
		try {
			FormActivation formActivation = formActivationDaoImpl.getActivatedForm();
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No forms found");
		}
	}
	
	@Test
	public void isValidControllerTest() {
		LoginDaoImpl loginDaoImpl = new LoginDaoImpl();
		try {
			int responseCode = loginDaoImpl.isValid("123", "123");
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No forms found");
		}
	}
	
	@Test
	public void findNominationThroughControllerTest() {
		NominationDaoImpl nominationDaoImpl = new NominationDaoImpl();
		try {
			List<Nomination> nominations = nominationDaoImpl.findNominationByGroup("abc");
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No form found");
		}
	}

}
