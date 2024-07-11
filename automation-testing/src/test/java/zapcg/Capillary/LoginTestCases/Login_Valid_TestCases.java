package zapcg.Capillary.LoginTestCases;
 
import java.time.Duration;
 
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
 
import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;
 
 
@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			
 
public class Login_Valid_TestCases extends BaseTest {
	 public loginPage lp;
	 //public String currentBrowser;

	 @BeforeMethod
		@Parameters({"browser", "deviceName"})
	   public void initialize(String browser, String deviceName) throws InterruptedException {
		 setUp(browser, deviceName); // Use the setup method to initialize the browser
	       initialization(browser);
	       driver.get(baseUrl);
	       System.out.println("Browser got opened");
	    // Print the current URL
           String currentUrl = driver.getCurrentUrl();
           System.out.println("Current URL: " + currentUrl);
        // Locate the element
           WebElement element = driver.findElement(By.xpath("//div[@id='root']")); // Replace with your target element's XPath
 
           // Retrieve and print the HTML source of the element
           String elementHtml = element.getAttribute("outerHTML");
           System.out.println("HTML Source of the element:");
           System.out.println(elementHtml);
        // Check for iframe
           if (isElementInIframe(driver, By.xpath("//h1[@id='LS008']"))) {
               // Switch to iframe if necessary
               driver.switchTo().frame(driver.findElement(By.tagName("iframe"))); 
           }
           // Locate the element using the XPath
           WebElement element2 = driver.findElement(By.xpath("//h1[@id='LS008']"));
 
           // Retrieve the text value of the element
           String textValue = element2.getText();
 
           // Print the text value
           System.out.println("Text value of the element: " + textValue);
 
      
	       Thread.sleep(10000); 
	       lp = new loginPage(driver);
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();

 
	   }

 
	private boolean isElementInIframe(WebDriver driver, By xpath) {
		 try {
	            driver.findElement(By.xpath("//h1[@id='LS008']"));
	            return false; // Element found, not in iframe
	        } catch (NoSuchElementException e) {
	            // Check in all iframes
	            for (WebElement iframe : driver.findElements(By.tagName("iframe"))) {
	                driver.switchTo().frame(iframe);
	                try {
	                    if (!driver.findElements(By.xpath("//h1[@id='LS008']")).isEmpty()) {
	                        return true; // Element found in this iframe
	                    }
	                } finally {
	                    driver.switchTo().defaultContent(); // Switch back to the main content
	                }
	            }
		return false;
	        }
	}
 
 
	@Test(priority = 1, groups = "Login")
    public void Valid_Login() throws InterruptedException {
	        lp.login("zapcom_test2", "storeportal");
	        lp.verifySuccessfullNavigationFromLogin(driver);
	        driver.close();

		}

}