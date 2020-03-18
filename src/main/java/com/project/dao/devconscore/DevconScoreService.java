package com.project.dao.devconscore;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.DevconScore;

@Service
public class DevconScoreService {

	@Autowired
	DevconScoreDaoImpl devconScoreDaoImpl;

	public DevconScore addScoresToDevconScoreDaoImpl(DevconScore devconScore) {
		devconScoreDaoImpl.addDevconScore(devconScore);
		return devconScore;
	}

	public List<DevconScore> getScoresFromDevconScoreDaoImpl() {
		return devconScoreDaoImpl.getAllDevconScores();
	}

}
