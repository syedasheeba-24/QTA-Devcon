package com.project.dao.assignment;

import java.util.List;

import com.project.model.Assignment;

public interface AssignmentDao {
	
	public Assignment assignPaper(Assignment assignment);
	public String[] getPapers(String evaluatorID);
	
}
