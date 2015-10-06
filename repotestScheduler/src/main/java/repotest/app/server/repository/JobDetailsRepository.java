package repotest.app.server.repository;
import repotest.app.shared.jobs.JobDetails;

import java.util.List;


import com.athena.framework.server.exception.repository.SpartanPersistenceException;

public interface JobDetailsRepository {

	public abstract List<JobDetails> getAllJobs() throws SpartanPersistenceException;

	public abstract void updateJobDetails(JobDetails jobDetails) throws SpartanPersistenceException;
	
	public abstract List<JobDetails> getJobByBeanName(String beanName) throws SpartanPersistenceException;


}
