package zapcg.Capillary.MemberLookupTestCases;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.locationSelectionPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;

@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)

public class MemberLookup_Invalid_CardNumber_TestCases extends BaseTest{
	
	
	public loginPage lp;
	 public locationSelectionPage lsp;
	 public memberLookupPage mlp;
	

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
            
	       /*
             
               //Choose location details
               lsp=new locationSelectionPage(driver);
               lsp.lookupPropertyOptions("HOTEL MYSTAYS Asakusa");
               lsp.selectStoreOptions("Front Desk");  
               */
               //Click on scanQR code button
               mlp=new memberLookupPage(driver);

}
		
		
		
		
		
				@Test(priority=1, groups = {"MemberLookup"})
				public void verify_CardNumber_Field_MoreThan11() {
					memberLookupPage mlp = new memberLookupPage(driver);
					mlp.enterMemberId("123456789098");
					mlp.clickOnSearchButton();
					mlp.verifyMaxLengthForMemberId("Card number/member Id should not be more than 11 digits");
					
					
					}
				
				@Test(priority=2, groups = {"MemberLookup"})
				public void enter_Invalid_CardNumbers8Length() throws InterruptedException {
				    memberLookupPage mlp = new memberLookupPage(driver);
				    String invalidCardNumbers = "12345678";
				  
				        mlp.enterCardNumber(invalidCardNumbers);
				        mlp.clickOnSearchButton();
				        mlp.verifyErrorMessage("The Member/Card Number was not found.");
				       
				        
				    
				}
			
				@Test(priority=3, groups = {"MemberLookup"})
				public void enter_Invalid_CardNumbers9Length() throws InterruptedException {
				    memberLookupPage mlp = new memberLookupPage(driver);
				    String invalidCardNumbers = "123456789";
				  
				        mlp.enterCardNumber(invalidCardNumbers);
				        mlp.clickOnSearchButton();
				        mlp.verifyErrorMessage("The Member/Card Number was not found.");
				       
				       
				    
				}
				
				@Test(priority=4, groups = {"MemberLookup"})
				public void enter_Invalid_CardNumbers_LessThan7() throws InterruptedException {
				    memberLookupPage mlp = new memberLookupPage(driver);
				    String invalidCardNumbers = "123456";
				  
				        mlp.enterCardNumber(invalidCardNumbers);
				        mlp.clickOnSearchButton();
				        mlp.verifyErrorMessage("The Member/Card Number was not found.");
				       
				       
				    
				}
			
				
				
				
				
				
				
}
