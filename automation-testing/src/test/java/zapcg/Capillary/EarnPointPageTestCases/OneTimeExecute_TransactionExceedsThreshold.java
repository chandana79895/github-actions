package zapcg.Capillary.EarnPointPageTestCases;

import static org.testng.Assert.assertTrue;

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

public class OneTimeExecute_TransactionExceedsThreshold extends BaseTest {
	
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
	      int transactionAmount = 200001; 
	       epp.enterTransactionAmount(transactionAmount);
	       epp.clickOnSubmitButton();
	      
	    // Verify if the threshold message is displayed only if the amount exceeds the threshold
	        if (transactionAmount > 200001) {
	            String expectedMessage = "Customer/Member transaction exceeds threshold. The transaction has been submitted for approval";
	            boolean isMessageDisplayed = epp.isThresholdMessageDisplayed(expectedMessage);

	            // Print the result
	            if (isMessageDisplayed) {
	                System.out.println("Test Passed: Threshold message is displayed correctly.");
	            } else {
	                System.out.println("Test Failed: Threshold message is not displayed.");
	            }

	            // Assert to ensure test fails in case the message is not displayed
	            assertTrue(isMessageDisplayed, "Expected threshold message was not displayed.");
	        } else {
	            System.out.println("Transaction amount is within the threshold limit. No message should be displayed.");
	        }
	       
	       
	       
	   }
	 
	 @Test(priority=1, groups="OneTimeExecution")
	 public void testing() {
		
	 }

}
