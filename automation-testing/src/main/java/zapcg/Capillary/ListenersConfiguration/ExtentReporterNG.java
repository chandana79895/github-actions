package zapcg.Capillary.ListenersConfiguration;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import java.io.File;

public class ExtentReporterNG {
    
    // globally declare 
    static ExtentReports extent;

    public static ExtentReports extentReportGenerator() {

        // Create object for two classes ExtentReports, ExtentSparkReporter
        String path = System.getProperty("user.dir") + File.separator + "reports" + File.separator + "index.html";
        ExtentSparkReporter reporter = new ExtentSparkReporter(path);

        // Change the report name:
        reporter.config().setReportName("Frontend Web Automation Report");
        reporter.config().setDocumentTitle("Test Results");

        extent = new ExtentReports();
        extent.attachReporter(reporter);

        return extent;
    }
}
