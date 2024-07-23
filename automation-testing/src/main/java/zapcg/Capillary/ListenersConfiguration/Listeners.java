package zapcg.Capillary.ListenersConfiguration;

import java.util.Arrays;
import java.util.List;

import org.testng.IExecutionListener;
import zapcg.Capillary.utils.EmailClientUtil;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;

import zapcg.Capillary.Base.BaseTest;



public class Listeners extends BaseTest implements ITestListener, IExecutionListener {
	
	ExtentReports extent=ExtentReporterNG.extentReportGenerator();
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
		 
		/*
		WebDriver driver=null;
		
		 Object testObject=result.getInstance();
		Class clazz= result.getTestClass().getRealClass();
		try {
			driver=(WebDriver)clazz.getDeclaredField("driver").get(testObject) ;
		} catch (IllegalArgumentException | IllegalAccessException | NoSuchFieldException | SecurityException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		 
		 */
		 


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
	
	 @Override
	    public void onExecutionFinish() {
	        // Path to the TestNG report
	        String reportPath = "test-output\\emailable-report.html";

	        // Email details
	        String smtpHost = "smtp.gmail.com";
	        String smtpPort = "587";    //SMTP Port: 587 (TLS)-outlook; Custom SMTP Server: 25, 587, and 465.
	        String fromEmail = "manichandana7989@gmail.com";
	        String emailPassword = "Chandu@123";
	        	

	        // List of recipients
	        List<String> toEmails = Arrays.asList("kajal.sharma@capillarytech.com", "mani.chandana@capillarytech.com");
	        String subject = "TestNG Report";
	        String body = "Please find the attached TestNG report.";

	        // Create EmailClientUtil instance and send email
	        EmailClientUtil emailClient = new EmailClientUtil(smtpHost, smtpPort, fromEmail, emailPassword);
	        emailClient.sendEmail(toEmails, subject, body, reportPath);
	    }
	
	
	
  
}
