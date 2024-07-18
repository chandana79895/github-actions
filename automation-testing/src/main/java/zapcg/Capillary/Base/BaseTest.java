package zapcg.Capillary.Base;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.Duration;

import javax.mail.MessagingException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;


import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import io.github.bonigarcia.wdm.WebDriverManager;
import zapcg.Capillary.utils.ConfigReader;
import zapcg.Capillary.utils.DeviceData;
import zapcg.Capillary.utils.ReportUploader;



public class BaseTest {
	public static WebDriver driver;
    public String baseUrl;
    public Dimension dimension;
    public String deviceName; 

    public void setUp(String browser, String deviceName) {
        ConfigReader configReader = new ConfigReader();
        baseUrl = configReader.getProperty("url");
        dimension = DeviceData.getDimension(deviceName);
        this.deviceName = deviceName;
    }
     

    public void initialization(String browser) {
    	try {
        if (browser.equalsIgnoreCase("chrome")) {
        	WebDriverManager.chromedriver().setup();
        	 ChromeOptions options = new ChromeOptions();
             options.addArguments("--remote-allow-origins=*");
          // Adding detach option
             options.setExperimentalOption("detach", true);
          driver = new ChromeDriver(options);
        
            
        } else if (browser.equalsIgnoreCase("firefox")) {
            WebDriverManager.firefoxdriver().setup();
            driver = new FirefoxDriver();
        }

        if (dimension != null) {
            driver.manage().window().setSize(dimension);    
            }
    	driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(60));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
    } catch (Exception e) {
        System.err.println("Error initializing WebDriver: " + e.getMessage());
        if (driver != null) {
            driver.quit();
        }
    }
    
}
    
    
    @AfterMethod
    public void tearDown() {
        try {
            if (driver != null) {
                String browserName = driver.getClass().getSimpleName();
                System.out.println("Test execution completed on " + browserName + " with device: " + deviceName);
            }
        } catch (Exception e) {
            System.err.println("Error during tearDown: " + e.getMessage());
        } finally {
            if (driver != null) {
                try {
            	driver.quit();
                }catch (Exception e) {
                    System.err.println("Error closing WebDriver session: " + e.getMessage());
                }
                
            }
        }
    }
    
    
   
    @AfterSuite
    public void afterSuite() {
        try {
            ReportUploader.sendTestNGReports();
        } catch (IOException | MessagingException e) {
            ((Throwable) e).printStackTrace();
        }
    }
    
    
    
    public String getScreenShotPath(String TestCaseName, WebDriver driver) throws IOException
    {
    	
    	TakesScreenshot ts=(TakesScreenshot)driver;
    	File source=ts.getScreenshotAs(OutputType.FILE);
    	String destPath=System.getProperty("user.dir")+"\\reports\\FailedTest"+TestCaseName+".png";
    	File file=new File(destPath);
    	FileUtils.copyFile(source, file);
    	return destPath;
    	
    }
}
