package zapcg.Capillary.LoginTestCases;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;


public class Login_Valid_TestCases extends BaseTest {
	
	 public loginPage lp;
	 public String currentBrowser;
	
	 @BeforeMethod
		@Parameters({"browser", "deviceName"})
	   public void initialize(String browser, String deviceName) throws InterruptedException {
		 	setUp(browser, deviceName); // Use the setup method to initialize the browser
	       initialization(browser);
	       driver.get(baseUrl);
	       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests
	       lp = new loginPage(driver);
	       lp = new loginPage(driver);
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       

	   }
	
	

	@Test(priority = 1)
    public void testValidLogin_TestCase1() throws InterruptedException {
	        lp.login("zapcom_test2", "storeportal");
	        lp.verifySuccessfullLogin(driver,"https://d1msv2sqknn4w4.cloudfront.net/member-search");
	        driver.close();
		
        
		}
	
	
	
}
	
	

