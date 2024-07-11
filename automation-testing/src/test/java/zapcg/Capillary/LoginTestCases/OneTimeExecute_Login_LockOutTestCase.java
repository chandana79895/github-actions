package zapcg.Capillary.LoginTestCases;

import org.openqa.selenium.Dimension;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;


@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			

public class OneTimeExecute_Login_LockOutTestCase extends BaseTest{
	
	public loginPage lp;
	 public String currentBrowser;
	 public Dimension currentDimension;
	 Dimension dimension=  new Dimension(768, 1024);
	
	@BeforeMethod
	@Parameters({"browser","deviceIndex"})
   public void initialize(String browser, String deviceIndex) throws InterruptedException {
		setUp(browser,deviceIndex); // Use the setup method to initialize the browser
       initialization(browser);
       driver.get(baseUrl);
       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests

       lp = new loginPage(driver);
       lp.changeDefaultLanguage();
       lp.chooseEnglishLanguage();
       

   }
		

   @Test(priority=1,groups = "OneTimeExecution")
	public void verify_ValidationMessage_For5Invalid_LoginAttempt() throws InterruptedException
		//after 5 invalid attempts user won't be able to login for 30min
	{	
       // Try logging in with invalid credentials 5 times
       for (int i = 0; i <= 5; i++) {
    	   lp = new loginPage(driver);   
    	   lp.loginLockOutCase("zapcom_tes", "12345678A@");
       
       	
       	if (i == 5) {
            // Verify lockout message
            lp.verifyLockOutMessage("Your account is locked. Ask your manager for unlock the account.");
            break; // Exit the loop after displaying the lockout message
       
             }
       
       
       // Verify lockout message
       lp.verifyLockOutMessage("Your account is locked. Ask your manager for unlock the account.");//enter the validation message here
       
       
       // Wait for 15 minutes (1800 seconds):: to cover one boundary value test cases
       Thread.sleep(900 * 1000);

       // Attempt to log in again and verify still locked out using valid credentials
       lp.login("zapcom_test2", "storeportal");
       lp.verifyLockOutMessage("Your account is locked. Ask your manager for unlock the account.");//enter the validation message here

		//try valid inputs after 15 minute means the lockout scenario completed 30min 
       Thread.sleep(900 * 1000);
       // Attempt to log in again and verify user should be able to login using valid credentials
       lp.login("zapcom_test2", "storeportal");
       //write down the steps to verify the login to the portal successfully
       lp.verifySuccessfullLogin(driver,"https://d1msv2sqknn4w4.cloudfront.net/location-search");

       
   }
   
   //(30 * 60 * 1000)= this is 30min
   //add one more test case
   //test case > login>> select the location > now logout> again login to same user> same location should be auto populated in location screen, user is not going to select the locatoion again

}
}


