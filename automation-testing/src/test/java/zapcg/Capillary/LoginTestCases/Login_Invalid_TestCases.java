package zapcg.Capillary.LoginTestCases;


import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;


@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			

public class Login_Invalid_TestCases extends BaseTest{
	
	public loginPage lp;
	 public String currentBrowser;
	
	
	@BeforeMethod
	@Parameters({"browser", "deviceName"})
   public void initialize(String browser,String deviceName) throws InterruptedException {
		setUp(browser, deviceName); // Use the setup method to initialize the browser
       initialization(browser);
       driver.get(baseUrl);
       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests

       lp = new loginPage(driver);
       lp.changeDefaultLanguage();
       lp.chooseEnglishLanguage();
       

   }
	
	@Test(priority = 1,groups = "Login")
   public void test_Invalid_Username() throws InterruptedException {
       
       lp.login("zapcotest", "storeportal");
       lp.verifyInvalidUserNameError("Invalid username or password. Try again.");
	}


   @Test(priority = 2, groups = "Login")
   public void test_Invalid_Password() throws InterruptedException {
   	
   	lp.login("zapcom_test2", "testtest");
       lp.verifyInvalidPasswordError("Invalid username or password. Try again."); 
   }

   @Test(priority = 3,groups = "Login")
   public void test_TooLong_Username() throws InterruptedException {
  
   	lp.login("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz", "testtest22");
      lp.verifyMaxLengthForUserName("Username must be less than 50 characters");
   }

   @Test(priority = 4,groups = "Login")
   public void test_MinLength_Password() throws InterruptedException {
 
   	lp.login("zapcom_test2", "testte");
       lp.verifyMinLengthForPassword("Password must be at least 8 characters"); 
   }

   @Test(priority = 5,groups = "Login")
   public void test_Username_WithSpaces() throws InterruptedException {
 
   	lp.login("zapcom test2", "testtest1");
      lp.verifySpaceNotAllowedUserName("Username must not contain any spaces"); 
   }

   @Test(priority = 6,groups = "Login")
   public void verify_Enabled_LoginButton() throws InterruptedException {
   	
   	lp.login("testiuytree", "testtests");
      lp.verifyLoginButtonEnabled();
   }
  
   
   @Test(priority = 7,groups = "Login")
   public void verify_Disabled_LoginButton_EmptyUsername() throws InterruptedException {
   
   	lp.loginDisabledVerification("", "12345678");
     lp.verifyLoginButtonDisabled_EmptyUsername();
   }
   
   
   @Test(priority = 8,groups = "Login")
   public void verify_Disabled_LoginButton_EmptyPassword() throws InterruptedException {
  
   	lp.loginDisabledVerification("testEmptyPassword", "");
   	lp.verifyLoginButtonDisabled_EmptyPassword();
   }
   
   @Test(priority = 9,groups = "Login")
   public void verify_Disabled_LoginButton_EmptyUsernamePassword_TestCase10() throws InterruptedException {
   
   	lp.loginDisabledVerification("", "");
      lp.verifyLoginButtonDisabled_BlankInput();
   }
   
	
	
}

