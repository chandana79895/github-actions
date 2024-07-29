package zapcg.Capillary.ListenersConfiguration;

import java.io.File;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

public class ExtentReporterNG {
	
	//globally declare 
	static ExtentReports extent;

	public static ExtentReports extentReportGeneratore(){

	//need to create object for two classes ExtentReports, ExtentSparkReporter

	
		//String path=System.getProperty("user.dir")+"\\Reports\\Index.html"; //reports is made under any folder under
	
        String path = System.getProperty("user.dir") + File.separator + "reports" + File.separator + "index.html";

		ExtentSparkReporter reporter=new ExtentSparkReporter(path);

	//change the report name:
	reporter.config().setReportName("Frontend Fortress Web Automation Report");
	reporter.config().setDocumentTitle("Automation Test Results");


	 extent=new ExtentReports();
	extent.attachReporter(reporter);
	

	return extent;
	 
	}



}
