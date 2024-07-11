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


public class EarnPoint_Invalid_TestCases extends BaseTest{
	
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
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
	       memberLookupPage mlp = new memberLookupPage(driver);
	       mlp.enterMemberId("GT000003673");
			mlp.clickOnSearchButton();
			mdp=new memberDetailsPage(driver);
			mdp.clickOnEnterReceiptButton();
			epp=new earnPointsPage(driver);
		
	       

	   }
	 
	
	
	 @Test(priority=1, groups = "EarnPoint")
		public void verify_With_Empty_TransactionAmount() throws InterruptedException {
		 epp.clickOnSubmitButton();
		epp.txnFieldShouldNotBeEmpty(driver);
		 		
		
	}

	 @Test(priority=2, groups = "EarnPoint")
	 public void empty_TxnAmount_But_GoToPassPointValue()
	 {
		 epp.enterGoToPassPoint("12");
		 epp.clickOnSubmitButton();
		 epp.ifTxnFieldEmptyThanGoToPassPointShouldBeEmpty(driver);
		 
	 }
	 
	 @Test(priority=3, groups = "EarnPoint")
	 public void goTOPassPoint_More_Than_TransactionAmount()
	 {
		 // Perform transaction with Go To Pass points used exceeding transaction amount
	        int transactionAmount = 1;
	        int goToPassPointsUsed = 2; // Points used exceed transaction amount

	        epp.enterTransactionAmount(transactionAmount);
	        epp.enterGoToPassPointsUsed(goToPassPointsUsed);
	        //epp.clickOnSubmitButton();
	        epp.verifyValidationMessageIfGoToPassIsGreaterThanTxnAmt("Entered Go To Pass points used is more than the Transaction Amount");

	    }
		 
	 }
	 
	 



