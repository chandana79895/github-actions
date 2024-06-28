package zapcg.Capillary.MemberLookupTestCases;


import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.locationSelectionPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;


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
             
	       
                //Click on scanQR code button
                mlp=new memberLookupPage(driver);
                
            
            }
        
  
		
		//memberID: starts with GT, length 11
		@Test(priority=25)
		public void verifyInvalidMemberID() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT0000898089");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId("No User or Customer found");
			
			
			}
		
		@Test(priority=26)
		public void verifyMemberIdFieldMaxLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT00000367323323211");
			mlp.clickOnSearchButton();
			mlp.verifyMaxLengthForMemberId("Length validation should display");
			
			
			}
		
		//valid card number:  7 to 11 characters.
		@Test(priority=27)
		public void verifyInvalidCardNumberMinLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("123456");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId("No User or Customer found");
			
			
			}
		
		//valid card number:  7 to 11 characters.
		@Test(priority=28)
		public void verifyCardNumberFieldMaxLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("123456789098");
			mlp.clickOnSearchButton();
			mlp.verifyMaxLengthForMemberId("Length validation should display");
			
			
			}
		
		
		@Test(priority=29)
		public void verifyForEmptyCardNumberButtonIsDisabled() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("");
			mlp.verifySearchButtonDisableForEmptyInput();
			
			
			
			}
	
	
	

}
