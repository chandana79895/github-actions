package zapcg.Capillary.EarnPointPageTestCases;


import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.earnPointsPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;

@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)	
public class SuccessMessage_CardNumber extends BaseTest{
	public loginPage lp=new loginPage(driver);
	 public String currentBrowser;
	 //memberDetailsPage	mdp=new memberDetailsPage(driver);
	 earnPointsPage epp=new earnPointsPage(driver);
	 memberLookupPage mlp=new memberLookupPage(driver);
	
	 @BeforeMethod
		@Parameters({"browser", "deviceName"})
	   public void initialize(String browser, String deviceName) throws InterruptedException {
		 	setUp(browser, deviceName); // Use the setup method to initialize the browser
	       initialization(browser);
	       driver.get(baseUrl);
	       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests
	     
	       lp = new loginPage(driver);
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
	       memberLookupPage mlp = new memberLookupPage(driver);
	       mlp.enterMemberId("97001848539");
			mlp.clickOnSearchButton();
			//add lines as per new changes , add radio selection lines, Choose valid radio option to navigates to Earn point screen
			
			
			
			
			epp=new earnPointsPage(driver);
		
	 }
	 
	 
	   
		 @Test(priority=1, groups = "EarnPoint")
		 public void verifySuccessMessageForOnlyTransactionAmountUsingCardNumber()
		 {
			 epp.enterTransactionAmount(10);
			 epp.clickOnSubmitButton();
			 epp.verifySuccessMessageForValidTxnAmount("transaction has been successfully submitted. They have earned");
		 }
	
}
