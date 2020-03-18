package com.project.dao.devconscore;

import java.util.List;

import com.project.model.DevconScore;

public interface DevconScoreDao {

	public DevconScore addDevconScore(DevconScore devconScore);
	public List<DevconScore> getAllDevconScores();

}
