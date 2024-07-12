package zapcg.Capillary.EarnPointPageTestCases;


import static org.testng.Assert.assertEquals;

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

public class OneTimeExecute_pointVerificationAfterRedeemingPoints extends BaseTest {
	
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
	      int currentPoint= mdp.getTotalEarningPoints();
	      System.out.println("The current available points on Member details screen is: "+currentPoint);
	      mdp.clickOnEnterReceiptButton();
	      int transactionAmount = 50; 
	       int goToPassPointUsed = 1; 
	       epp.enterTransactionAmount(transactionAmount);
	       //int taxAssumedAmount=epp.calculateExpectedTaxAssumedAmount(transactionAmount);
	       epp.enterGoToPassPointsUsed(goToPassPointUsed);
	       epp.clickOnSubmitButton();
	       epp.clickOnContinueSuccessButton();
	       mlp.enterMemberId("GT000003673");
	       mlp.clickOnSearchButton();
	       
	       int updatedPointsAfterSubmit = mdp.getTotalEarningPoints();
	        System.out.println("The updated available points on Member details screen is: " + updatedPointsAfterSubmit);

	        // Calculate expected points after deduction
	        int expectedPointsAfterDeduction = currentPoint - goToPassPointUsed;
	        System.out.println("Expected points after deduction: " + expectedPointsAfterDeduction);

	        // Compare actual and expected total earning points using if-else
	        if (updatedPointsAfterSubmit == expectedPointsAfterDeduction) {
	            System.out.println("Test Passed: Actual Total Earning Points match the Expected Total Earning Points.");
	        } else {
	            System.out.println("Test Failed: Actual Total Earning Points do not match the Expected Total Earning Points.");
	        }

	        // Assert to ensure test fails in case of mismatch
	        assertEquals(updatedPointsAfterSubmit, expectedPointsAfterDeduction);
	   }
	 
	 @Test(priority=1, groups = {"OneTimeExecution"})
	 public void verify_TotalPoints_Before_and_After() {
		 System.out.println("Able to verify the point before txn amlount submission and after txn amount submission");
		
	 }

}
