package com.project.dao.nomination;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.Nomination;

@Service
public class NominationService {

	@Autowired
	NominationDaoImpl nominationRepository;

	Logger logger = Logger.getAnonymousLogger();

	public Nomination sendNominationToDaoImpl(Nomination nomination) {
		nominationRepository.addNomination(nomination);
		return nomination;
	}

	public Nomination getNominationByIdFromDaoImpl(String id) {
		Nomination nomination = new Nomination();
		try {
			nomination = nominationRepository.findNominationById(id);
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No matching document found,please ensure id entered is correct");
		}
		return nomination;
	}

	public List<Nomination> getNominationByGroupFromDaoImpl(String idOfActivatedForm) {
		List<Nomination> nominations = new ArrayList<Nomination>();
		try {
			nominations = nominationRepository.findNominationByGroup(idOfActivatedForm);
		} catch (Exception e) {
			logger.log(Level.SEVERE, "No matching document found");
		}
		return nominations;
	}
}
