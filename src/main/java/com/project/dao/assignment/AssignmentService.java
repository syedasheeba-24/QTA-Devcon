package com.project.dao.assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dao.assignment.AssignmentDaoImpl;
import com.project.model.Assignment;

@Service
public class AssignmentService {

	@Autowired
	AssignmentDaoImpl assignmentDaoImpl;

	public Assignment addAssignedPaperToAssignmentDaoImpl(Assignment assignment) {
		assignmentDaoImpl.assignPaper(assignment);
		return assignment;
	}
	
	public String[] getListOfPapers(String evaluatorID)
	{
		return assignmentDaoImpl.getPapers(evaluatorID);
	}
}
