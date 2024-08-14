package zapcg.Capillary.EarnPointPageTestCases;

import static org.testng.Assert.assertEquals;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.earnPointsPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;

@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)	


public class TotalEarnPointAfterSubmission extends BaseTest {
	
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
	       mlp.enterMemberId("GT000003673");
			mlp.clickOnSearchButton();
			//add lines as per new changes , add radio selection lines, Choose valid radio option to navigates to Earn point screen
			
			
			
			
			epp=new earnPointsPage(driver);

}
	 
	 @Test(priority=1, groups = "EarnPoint")
	 public void verifyTotalPointsAfterSubmitTxnAmount()
	 {    mlp=new memberLookupPage(driver);
	     epp = new earnPointsPage(driver);

		 int BeforeSubmissionPoint= epp.getTotalEarningPoints();
	      System.out.println("Before submitting txn amount,the available points on Member details screen is: "+BeforeSubmissionPoint);
	      int transactionAmount = 200;
		 epp.enterTransactionAmount(transactionAmount);
		 epp.clickOnSubmitButton();
		 
		// Fetch the numeric value from the success message
		    String successMessage = epp.getSuccessMessage();
		    String earnedPointsStr = epp.extractNumericValue(successMessage);
		    int earnedPoints = Integer.parseInt(earnedPointsStr);
		    System.out.println("Earned points from the transaction: " + earnedPoints);

		 
	     epp.clickOnContinueSuccessButton();
	     mlp.enterMemberId("GT000003673");
	     mlp.clickOnSearchButton();
	     
	     int updatedPointsAfterSubmit = epp.getTotalEarningPoints2();
	        System.out.println("The updated available points on Member details screen is: " + updatedPointsAfterSubmit);

	     // Calculate expected points after deduction
	        int expectedPointsAfterAddition = BeforeSubmissionPoint + earnedPoints;
	        System.out.println("Expected points after adding earn point: " + expectedPointsAfterAddition);

	        // Compare actual and expected total earning points using if-else
	        if (updatedPointsAfterSubmit == expectedPointsAfterAddition) {
	            System.out.println("Test Passed: Actual Total Earning Points match the Expected Total Earning Points.");
	        } else {
	            System.out.println("Test Failed: Actual Total Earning Points do not match the Expected Total Earning Points.");
	        }

	        // Assert to ensure test fails in case of mismatch
	        assertEquals(updatedPointsAfterSubmit, expectedPointsAfterAddition);
	 }
	 
	 
	 
}
