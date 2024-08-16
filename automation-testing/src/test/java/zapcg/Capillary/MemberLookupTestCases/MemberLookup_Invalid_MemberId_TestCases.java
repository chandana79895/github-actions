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


public class MemberLookup_Invalid_MemberId_TestCases extends BaseTest {
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
       
  
		
		//memberID: starts with GT, length 11
		@Test(priority=1, groups = {"MemberLookup"})
		public void verify_Invalid_MemberID() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT000089808");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId("The Member/Card Number was not found.");
			
			
			}
		
		@Test(priority=2, groups = {"MemberLookup"})
		public void verify_MemberId_Field_MaxLength() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT000003673233");
			mlp.clickOnSearchButton();
			mlp.verifyMaxLengthForMemberId("Card number/member Id should not be more than 11 digits");
			
			
			}
		
		
		@Test(priority=3, groups = {"MemberLookup"})
		public void verify_Invalid_MemberID_MinLength_LessThan7() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("GT3456");
			mlp.clickOnSearchButton();
			mlp.verifyValidationMessageForInvalidMemberId1("The Member/Card Number was not found.");
			
			
			}
		
		
		
		
		@Test(priority=4, groups = {"MemberLookup"})
		public void verify_Empty_MemberId_CardNumber_ButtonIsDisabled() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.enterMemberId("");
			mlp.verifySearchButtonDisableForEmptyInput();
			
			
			
			}
			
		@Test(priority=5, groups = {"MemberLookup"})
		public void enter_Invalid_MemberId8Length() throws InterruptedException {
		    memberLookupPage mlp = new memberLookupPage(driver);
		    String invalidCardNumbers = "GT345678";
		  
		        mlp.enterCardNumber(invalidCardNumbers);
		        mlp.clickOnSearchButton();
		        mlp.verifyValidationMessageForInvalidMemberId1("The Member/Card Number was not found.");
		       
		        
		    
		}
	
		@Test(priority=6, groups = {"MemberLookup"})
		public void enter_Invalid_MemberId9Length() throws InterruptedException {
		    memberLookupPage mlp = new memberLookupPage(driver);
		    String invalidCardNumbers = "GT3456789";
		  
		        mlp.enterCardNumber(invalidCardNumbers);
		        mlp.clickOnSearchButton();
		        mlp.verifyValidationMessageForInvalidMemberId1("The Member/Card Number was not found.");
		       
		       
		    
		}
		
		@Test(priority=7, groups = {"MemberLookup"})
		public void enter_Invalid_MemberId10Length() throws InterruptedException {
		    memberLookupPage mlp = new memberLookupPage(driver);
		    String invalidCardNumbers = "GT34567890";
		  
		        mlp.enterCardNumber(invalidCardNumbers);
		        mlp.clickOnSearchButton();
		        mlp.verifyValidationMessageForInvalidMemberId("The Member/Card Number was not found.");
		       
		       
		    
		}
	
		
		@Test(priority=8, groups = {"MemberLookup"})
		public void enter_Invalid_MemberId7Length() throws InterruptedException {
		    memberLookupPage mlp = new memberLookupPage(driver);
		    String invalidCardNumbers = "GT34588";
		  
		        mlp.enterCardNumber(invalidCardNumbers);
		        mlp.clickOnSearchButton();
		        mlp.selectKamenoiOption();
				mlp.clickPopupContinueButton(driver);
		        mlp.verifyValidationMessageForInvalidMemberId("The Member/Card Number was not found.");
		       
		       
		    
		}
		
	
	

}
