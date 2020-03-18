package com.project.dao.nomination;

import java.util.List;

import com.project.model.Nomination;

public interface NominationDao {


	public Nomination addNomination(Nomination nomination);

	public Nomination findNominationById(String id);
	
	public List<Nomination> findNominationByGroup(String projectType);
	
}
