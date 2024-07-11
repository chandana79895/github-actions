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


public class memberLookup_Invalid_TestCases extends BaseTest {
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
                lsp.lookupPropertyOptions("Akasaka");
                lsp.selectStoreOptions("HMH01101 - MyStays Akasaka2");  
                */
                //Click on scanQR code button
                mlp=new memberLookupPage(driver);
                
            
            }
        
  
		
		//memberID: starts with GT, length 11
		@Test(priority=1, groups = "MemberLookup")
		public void verify_Invalid_MemberID() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT0000898089");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId("The Member/Card Number was not found.");
			
			
			}
		
		@Test(priority=2, groups = "MemberLookup")
		public void verify_MemberId_Field_MaxLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT00000367323323211");
			mlp.clickOnSearchButton();
			mlp.verifyMaxLengthForMemberId("The Member/Card Number was not found.");
			
			
			}
		
		//valid card number:  7 to 11 characters.
		@Test(priority=3, groups = "MemberLookup")
		public void verify_Invalid_CardNumber_MinLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("123456");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId("The Member/Card Number was not found.");
			
			
			}
		
		//valid card number:  7 to 11 characters.
		@Test(priority=4, groups = "MemberLookup")
		public void verify_CardNumber_Field_MaxLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("123456789098");
			mlp.clickOnSearchButton();
			mlp.verifyMaxLengthForMemberId("The Member/Card Number was not found.");
			
			
			}
		
		
		@Test(priority=5, groups = "MemberLookup")
		public void verify_Empty_CardNumber_ButtonIsDisabled() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("");
			mlp.verifySearchButtonDisableForEmptyInput();
			
			
			
			}
		
	
	
	
	

}
