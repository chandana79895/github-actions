package zapcg.Capillary.EarnPointPageTestCases;


import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.earnPointsPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberDetailsPage;
import zapcg.Capillary.PageObject.memberLookupPage;


@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			

public class GoToPassPointMoreThanAvailablePoint extends BaseTest{
	
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
	       Thread.sleep(1000); 
	     
	       lp = new loginPage(driver);
	       mlp = new memberLookupPage(driver);
	       mdp=new memberDetailsPage(driver);
	       epp=new earnPointsPage(driver);
	       
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
	       mlp.enterMemberId("GT000003673");
	       mlp.clickOnSearchButton();
	      int currentPoint= mdp.getTotalEarningPoints();
	      System.out.println("The current available points on Member details screen is: "+currentPoint);
	      mdp.clickOnEnterReceiptButton();
	      int transactionAmount = 20000; 
	       int goToPassPointUsed = currentPoint+1; 
	       epp.enterTransactionAmount(transactionAmount);
	       //int taxAssumedAmount=epp.calculateExpectedTaxAssumedAmount(transactionAmount);
	       epp.enterGoToPassPointsUsed(goToPassPointUsed);
	       epp.verifyValidationMessageIfGoToPassIsGreaterThanAvailablePoints("Insufficient valid points");
	       
	       
	   }
	 
	 @Test(priority=1, groups = "EarnPoint")
	 public void verify_ValidationMessage_If_GoToPass_Is_Greater_Than_AvailablePoints() {
		 
		 System.out.println("Tested Validation Message If GoToPassPoint Is Greater Than Available Points");
		
	 }


}
