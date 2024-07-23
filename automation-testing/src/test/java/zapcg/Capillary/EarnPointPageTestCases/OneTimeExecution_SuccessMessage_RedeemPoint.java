package zapcg.Capillary.EarnPointPageTestCases;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.earnPointsPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberDetailsPage;
import zapcg.Capillary.PageObject.memberLookupPage;

public class OneTimeExecution_SuccessMessage_RedeemPoint extends BaseTest {

	public loginPage lp;
	 public String currentBrowser;
	 memberDetailsPage	mdp=new memberDetailsPage(driver);
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
	       mlp = new memberLookupPage(driver);
	       mdp=new memberDetailsPage(driver);
	       epp=new earnPointsPage(driver);
	       
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
	       mlp.enterMemberId("GT000003673");
	       mlp.clickOnSearchButton();
			mdp=new memberDetailsPage(driver);
			mdp.clickOnEnterReceiptButton();
			epp=new earnPointsPage(driver);
		
	
	
	 }
	
	
	 @Test(priority=17, groups = "EarnPoint")
	 public void verify_SuccessMessage_For_RedeemPoint()
	 {
		 epp.enterTransactionAmount(50);
		 epp.enterGoToPassPoint("1");
		 
		 epp.clickOnSubmitButton();
		 epp.verifySuccessMessageIfRedeemingPoints("transaction has been successfully submitted.");
	 }
}
