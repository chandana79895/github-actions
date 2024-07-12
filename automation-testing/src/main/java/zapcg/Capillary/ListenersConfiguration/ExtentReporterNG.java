package zapcg.Capillary.ListenersConfiguration;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

public class ExtentReporterNG {
	
	//globally declare 
	static ExtentReports extent;

	public static ExtentReports extentReportGeneratore(){

	//need to create object for two classes ExtentReports, ExtentSparkReporter

	String path=System.getProperty("user.dir")+"\\reports\\index.html"; //reports is made under any folder under
	ExtentSparkReporter reporter=new ExtentSparkReporter(path);

	//change the report name:
	reporter.config().setReportName("Frontend Web Automation Report");
	reporter.config().setDocumentTitle("Test Results");


	 extent=new ExtentReports();
	extent.attachReporter(reporter);
	

	return extent;
	 
	}



}
