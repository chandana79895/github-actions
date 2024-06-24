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
		@Test(priority=1)
		public void verifyInvalidCardNumber() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT0000898089");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId("No User or Customer found");
			
			
			}
		
		@Test(priority=2)
		public void verifyCardNumberFieldMaxLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT00000367323323211");
			mlp.clickOnSearchButton();
			mlp.verifyMaxLengthForMemberId("Length validation should display");
			
			
			}
	
	
	
	

}
