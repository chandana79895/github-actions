package zapcg.Capillary.ListenersConfiguration;

import org.testng.IExecutionListener;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;

import zapcg.Capillary.Base.BaseTest;



public class Listeners extends BaseTest implements ITestListener, IExecutionListener {
	
	ExtentReports extent=ExtentReporterNG.extentReportGeneratore();
	ExtentTest test;
	private static ThreadLocal<ExtentTest> extentTest=new ThreadLocal<ExtentTest>(); 
	@Override
	public void onTestStart(ITestResult result) {
		 test=extent.createTest(result.getMethod().getMethodName());
		 extentTest.set(test);

		 System.out.println(" Test case started: " +result.getName());

	}

	@Override
	public void onTestSuccess(ITestResult result) {
		 extentTest.get().log(Status.PASS, "Successful");
	    System.out.println("The name of the testcase passed is : "+result.getName());

	}

	@Override
	public void onTestFailure(ITestResult result) {
		String testName=result.getName();
		System.out.println("The name of the testcase failed is : "+testName);

		extentTest.get().fail(result.getThrowable());
	
		 


	}

	@Override
	public void onTestSkipped(ITestResult result) {
		test.skip(result.getThrowable());
	    System.out.println("The name of the testcase Skipped is : "+result.getName());
	    System.out.println("Exception: " + result.getThrowable().getMessage());


	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
		
	}

	@Override
	public void onTestFailedWithTimeout(ITestResult result) {
		test.fail(result.getThrowable());
		  System.out.println("The name of the testcase Test Failed With Timeout is : "+result.getName());
		System.out.println("Exception: " + result.getThrowable().getMessage());

		
	}

	@Override
	public void onStart(ITestContext context) {
		

		
	}

	@Override
	public void onFinish(ITestContext context) {
		extent.flush();
		
		
	}
	/*
	 @Override
	    public void onExecutionFinish() {
	        // Path to the TestNG report
	        String reportPath = "Reports\\Index.html";

	        // Email details
	        String smtpHost = "smtp.gmail.com";
	        String smtpPort = "587";    //SMTP Port: 587 (TLS)-outlook; Custom SMTP Server: 25, 587, and 465.
	        String fromEmail = "kajalsharmamca@gmail.com";
	        String emailPassword = "kjkm fpwb pgrl gvuj";
	        	

	        // List of recipients
	        List<String> toEmails = Arrays.asList("lovelysharmacool@gmail.com");// "snehareddymagutam@gmail.com", "manichandana7989@gmail.com");
	        String subject = "TestNG Report";
	        String body = "Please find the attached TestNG report.";

	        // Create EmailClientUtil instance and send email
	        EmailClientUtil emailClient = new EmailClientUtil(smtpHost, smtpPort, fromEmail, emailPassword);
	        emailClient.sendEmail(toEmails, subject, body, reportPath);
	    }
	
	*/
	
  
}
