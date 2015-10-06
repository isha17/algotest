package repotest.app.server.businessservice;
import repotest.app.server.repository.JobDetailsRepository;

import repotest.app.shared.jobs.JobDetails;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.athena.framework.server.exception.repository.SpartanPersistenceException;

@Component("jobInitiator")
public class JobInitiator {

	@Autowired
	private ApplicationContext context;



	@Autowired
	JobDetailsRepository jobDetailsRepository;
	
	@Autowired
	jobListeners joblistener;
	
	

	@Async
	public void runJob(JobDetails jobDetails, Scheduler scheduler) throws JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException,
			JobParametersInvalidException, SpartanPersistenceException, SchedulerException, ClassNotFoundException {
		//Job job = context.getBean(jobDetails.getBeanName(), Job.class);
		// JobParameters jobParams = new JobParameters();
		// if (jobDetails.getJobParams() != null) {
		// Map<String, JobParameter> jobMapParams = new HashMap<String,
		// JobParameter>();
		// Iterator iterator = jobDetails.getJobParams().entrySet().iterator();
		// while (iterator.hasNext()) {
		// Map.Entry<String, Object> mapEntry = (Map.Entry<String, Object>)
		// iterator.next();
		// JobParameter param = null;
		// switch (mapEntry.getValue().getClass().getName()) {
		// case "String":
		// param = new JobParameter((String) mapEntry.getValue());
		// break;
		// case "Integer":
		// case "Long":
		// param = new JobParameter((Long) mapEntry.getValue());
		// break;
		// case "Double":
		// case "Float":
		// param = new JobParameter((Double) mapEntry.getValue());
		// break;
		// case "Date":
		// case "Timestamp":
		// param = new JobParameter((Date) mapEntry.getValue());
		// default:
		// break;
		// }
		// if (param != null) {
		// jobMapParams.put(mapEntry.getKey().toString(), param);
		// }
		// }
		// jobParams = new JobParameters(jobMapParams);
		// }

		Map<String, JobParameter> jobMapParams = new HashMap<String, JobParameter>();
		JobParameter paramMonth = new JobParameter(1l);
		jobMapParams.put("salForMonth", paramMonth);

		JobParameter paramDateTime = new JobParameter(new Date(System.currentTimeMillis()));
		jobMapParams.put("myCurrentTime", paramDateTime);

		JobParameters defaultParams = new JobParameters(jobMapParams);

		

		JobDataMap newJobData=new JobDataMap(jobMapParams);
		
		//Creating Job and link to our Job class
		Class jobClass=Class.forName(jobDetails.getBeanName());
		List<String> listOfJob=scheduler.getJobGroupNames();
		if(listOfJob.size()==0)
		{
			schdeuleJob(jobClass, scheduler, jobDetails, newJobData);
		}
		else
		{
		for (String groupName : scheduler.getJobGroupNames()) {
			 
		     for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
		 
			  String jobName = jobKey.getName();
			  String jobGroup = jobKey.getGroup();
		 
			  //get job's trigger
			  List<Trigger> triggers = (List<Trigger>) scheduler.getTriggersOfJob(jobKey);
			  CronTrigger nextFireTime = (CronTrigger) triggers.get(0); 
			  if(jobDetails.getJobName().equalsIgnoreCase(jobName) && !jobDetails.getScheduler().getSchedulerExpression().equalsIgnoreCase(nextFireTime.getCronExpression()))
			  {
				  scheduler.deleteJob(jobKey);
				  schdeuleJob(jobClass, scheduler, jobDetails, newJobData);
			  }
			  else if(listOfJob.contains(jobDetails.getJobName()))
			  {
				
			  }
			  else
			  {
				  schdeuleJob(jobClass, scheduler, jobDetails, newJobData);
			  }
		 
				System.out.println("[jobName] : " + jobName + " [groupName] : "
					+ jobGroup + " - " + nextFireTime);
		 
			  }
		 
		    }
		}
	}
	public void schdeuleJob(Class jobClass,Scheduler scheduler,JobDetails jobDetails,JobDataMap newJobData) throws SchedulerException
	{
		JobDetail jobdetail = JobBuilder.newJob(jobClass).usingJobData(newJobData)
				.withIdentity(jobDetails.getJobName(), jobDetails.getJobName()).build();
		Trigger trigger = TriggerBuilder
				.newTrigger()
				.withIdentity(jobDetails.getJobName(),jobDetails.getJobName())
				.withSchedule(
					CronScheduleBuilder.cronSchedule(""+jobDetails.getScheduler().getSchedulerExpression()+""))
				.build();
        scheduler.getListenerManager().addJobListener(joblistener);
		scheduler.start();
		scheduler.scheduleJob(jobdetail,trigger);
	}
}
