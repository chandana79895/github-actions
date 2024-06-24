package zapcg.Capillary.MemberDetailsTestCases;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;

public class memberDetails_TestCases extends BaseTest{
	
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
	       lp.login("zapcom_test2", "storeportal");
	       memberLookupPage mlp = new memberLookupPage(driver);
	       mlp.enterMemberId("GT000003673");
			mlp.clickOnSearchButton();
	       

	   }
	 
	 
	 
	 
	 @Test(priority=1)
		public void verifyMemberDetails() {
		 		
				
		
	}

}
