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
	{	 lp = new loginPage(driver);
	     lp.loginLockOutCase("zapcom_test2", "storeporta");
		
	   for (int i = 0; i < 6; i++) {
    	   Thread.sleep(3000);
    	   lp.clickOnLoginButton();
    	   lp.verifyInvalidUserNameError("Invalid username or password. Try again.");
	   
	   }
	
	  lp.verifyLockOutMessage("Your account is locked. Ask your manager to unlock the account.");
	
       
   }
   
  
}



