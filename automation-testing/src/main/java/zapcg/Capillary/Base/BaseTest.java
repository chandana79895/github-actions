package zapcg.Capillary.Base;

import java.io.File;
import java.io.IOException;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
import org.apache.commons.mail.Email;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;


import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;

import cn.t.util.email.EmailClientUtil;
import io.github.bonigarcia.wdm.WebDriverManager;
import zapcg.Capillary.utils.ConfigReader;
import zapcg.Capillary.utils.DeviceData;




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
                // WebDriverManager.chromedriver().setup(); // Use WebDriverManager for managing ChromeDriver versions dynamically
                System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--remote-allow-origins=*");
                options.addArguments("--headless"); // Enable headless mode
                options.addArguments("--no-sandbox");
                options.setExperimentalOption("detach", true);
                options.setAcceptInsecureCerts(true);
        
            
        } else if (browser.equalsIgnoreCase("firefox")) {
                // WebDriverManager.firefoxdriver().setup(); // Use WebDriverManager for managing GeckoDriver versions dynamically
                System.setProperty("webdriver.gecko.driver", "/usr/local/bin/geckodriver"); // Adjust path as necessary
                FirefoxOptions options = new FirefoxOptions();
                options.addArguments("--no-sandbox");
                options.setAcceptInsecureCerts(true);
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
