package zapcg.Capillary.ListenersConfiguration;


import java.io.IOException;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.ITestContext;

import org.testng.ITestListener;
import org.testng.ITestResult;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;

import zapcg.Capillary.Base.BaseTest;



public class Listeners extends BaseTest implements ITestListener {
	
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
		 extentTest.get().fail(result.getThrowable());
		 
		// Capture screenshot
	        try {
	            WebDriver driver = (WebDriver) result.getTestClass().getRealClass().getDeclaredField("driver").get(result.getInstance());
	            String screenshotPath = getScreenShotPath(result.getMethod().getMethodName(), driver);
	            extentTest.get().addScreenCaptureFromPath(screenshotPath, result.getMethod().getMethodName());
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		/*WebDriver driver=null;
		
		 Object testObject=result.getInstance();
		Class clazz= result.getTestClass().getRealClass();
		try {
			driver=(WebDriver)clazz.getDeclaredField("driver").get(testObject) ;
		} catch (IllegalArgumentException | IllegalAccessException | NoSuchFieldException | SecurityException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}*/
		 
		 
		 
		// System.out.println("The name of the testcase failed is : "+result.getName());


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
	
	
	
	
  
}
