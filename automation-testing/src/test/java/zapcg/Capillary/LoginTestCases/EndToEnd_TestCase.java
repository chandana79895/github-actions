package zapcg.Capillary.LoginTestCases;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.earnPointsPage;
import zapcg.Capillary.PageObject.locationSelectionPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberDetailsPage;
import zapcg.Capillary.PageObject.memberLookupPage;

@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)	

public class EndToEnd_TestCase extends BaseTest{
	

	public loginPage lp=new loginPage(driver);
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
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");

           locationSelectionPage locp = new locationSelectionPage(driver);
           
   
           String option1 = "Option 1";
           String option2 = "Option 2";
      

           try {
               // Select options from dropdowns
               locp.lookupPropertyOptions(option1);
               locp.selectStoreOptions(option2);
            
            // Somewhere else in your code where you call the method
               String selectedOption = locp.selectStoreOptions("Front Desk");
               if (selectedOption != null) {
                   System.out.println("Selected option: " + selectedOption);
               } else {
                   System.out.println("Option not found.");
               }}
               catch (Exception e) {
                   Assert.fail("An error occurred while verifying the dropdown selections: " + e.getMessage());
               }
           
           	
           
           
           
          // locp.clickNavigateButton();
           locp.verifySuccessfullNavigationFromLocationTOMemberLookupPage(driver);
           System.out.println("If not navigating to member lookup after Login then trying to save Property and store details in browser");
	       memberLookupPage mlp = new memberLookupPage(driver);
	       mlp.enterMemberId("GT000003673");
			mlp.clickOnSearchButton();
			
			epp=new earnPointsPage(driver);
		
	    
	
	
	
	
	
}
@Test(priority=1, groups = "EndToEnd")
public void verifySuccessMessageForOnlyTransactionAmount()
{
	 epp.enterTransactionAmount(10);
	 epp.clickOnSubmitButton();
	 epp.verifySuccessMessageForValidTxnAmount("transaction has been successfully submitted. They have earned");
}
}