package zapcg.Capillary.LoginTestCases;


import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;


@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			

public class OneTimeExecute_Login_LockOutTestCase extends BaseTest{
	
	public loginPage lp;
	 String errorMessageText = "Invalid username or password. Try again.";
	 String lockoutMessageText = "Your account is locked. Ask your manager for unlock the account.";

	
	
	 @BeforeMethod
		@Parameters({"browser", "deviceName"})
	   public void initialize(String browser, String deviceName) throws InterruptedException {
		
		 setUp(browser, deviceName); // Use the setup method to initialize the browser
	       initialization(browser);
	       driver.get(baseUrl);
	       Thread.sleep(3000); // For demonstration purposes, avoid using Thread.sleep in real tests
	     
       lp = new loginPage(driver);
       lp.changeDefaultLanguage();
       lp.chooseEnglishLanguage();
       

   }
		

   @Test(priority=1,groups = {"OneTimeExecution"})
	public void verify_ValidationMessage_For5Invalid_LoginAttempt() throws InterruptedException
	{
		//after 5 invalid attempts user won't be able to login for 30min
	// Attempt 5 invalid login attempts
	 lp = new loginPage(driver); 
    for (int i = 0; i < 5; i++) {
    	  lp.loginLockOutCase("zapcom_test", "storeporta");
        //Assert.assertTrue(lp.isErrorMessageDisplayed(), "Error message not displayed for attempt " + (i + 1));
    	  Assert.assertFalse(lp.isLockoutMessageDisplayed(), "Lockout message displayed prematurely" + (i + 1));
    	  
        Assert.assertEquals(lp.getInvalidErrorMessage(), errorMessageText, "Incorrect error message displayed");
    }

    // After 5 attempts, verify no lockout message should be displayed
    Assert.assertFalse(lp.isLockoutMessageDisplayed(), "Lockout message displayed prematurely");

    // Attempt 6th invalid login  
    lp.loginLockOutCase("zapcom_test", "storeporta");
    // Verify lockout message after 6th attempt
    Assert.assertTrue(lp.isLockoutMessageDisplayed(), "Lockout message not displayed after 6 attempts");
    Assert.assertEquals(lp.getLockoutErrorMessage(), lockoutMessageText, "Incorrect lockout message displayed");

	   
	   
	   
	   
	   /*
       // Try logging in with invalid credentials 5 times
       for (int i = 0; i <= 5; i++) {
    	   lp = new loginPage(driver);   
    	   lp.loginLockOutCase("zapcom_test", "storeporta");
       
       	
       	if (i == 5) {
            // Verify lockout message
            lp.verifyLockOutMessage("Your account is locked. Ask your manager for unlock the account.");
             // Exit the loop after displaying the lockout message
       
             }
       
       
       // Verify lockout message
       lp.verifyLockOutMessage("Your account is locked. Ask your manager for unlock the account.");//enter the validation message here
       /*
       
       // Wait for 15 minutes (1800 seconds):: to cover one boundary value test cases
       Thread.sleep(900 * 1000);

       // Attempt to log in again and verify still locked out using valid credentials
       lp.login("zapcom_test2", "storeportal");
       lp.verifyLockOutMessage("Your account is locked. Ask your manager for unlock the account.");//enter the validation message here

		//try valid inputs after 15 minute means the lockout scenario completed 30min 
       Thread.sleep(900 * 1000);
       // Attempt to log in again and verify user should be able to login using valid credentials
       lp.login("zapcom_test2", "storeportal");
       System.out.println("Logged In successfully after lock out duration");
       
 
*/
       
   }
   
  
}



