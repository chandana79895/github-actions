package zapcg.Capillary.ListenersConfiguration;


import org.testng.ITestContext;

import org.testng.ITestListener;
import org.testng.ITestResult;



public class Listeners implements ITestListener {

	@Override
	public void onTestStart(ITestResult result) {
		 System.out.println(" Test case started: " +result.getName());
		// System.out.println("Exception: " + result.getThrowable().getMessage());

	}

	@Override
	public void onTestSuccess(ITestResult result) {
		
	    System.out.println("The name of the testcase passed is : "+result.getName());
	   // System.out.println("Exception: " + result.getThrowable().getMessage());

	}

	@Override
	public void onTestFailure(ITestResult result) {
	    System.out.println("The name of the testcase failed is : "+result.getName());
	    //System.out.println("Exception: " + result.getThrowable().getMessage());


	}

	@Override
	public void onTestSkipped(ITestResult result) {
	    System.out.println("The name of the testcase Skipped is : "+result.getName());
	    System.out.println("Exception: " + result.getThrowable().getMessage());


	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
		
	}

	@Override
	public void onTestFailedWithTimeout(ITestResult result) {
		  System.out.println("The name of the testcase Test Failed With Timeout is : "+result.getName());
		System.out.println("Exception: " + result.getThrowable().getMessage());

		
	}

	@Override
	public void onStart(ITestContext context) {
		
		//System.out.println("Exception: " + ((ITestResult) context).getThrowable().getMessage());

		
	}

	@Override
	public void onFinish(ITestContext context) {
		//System.out.println("Exception: " + ((ITestResult) context).getThrowable().getMessage());

		
	}
	
	
	
	
  
}
