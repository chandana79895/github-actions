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

public class MemberLookup_Valid_TestCases extends BaseTest {
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
    

	
	
		
		@Test(priority=1,groups = {"MemberLookup"})
		public void verifyScanButtonAvailability() {
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.verifyScanButtonEnabled();
				
			}
	
		@Test(priority=2, groups = {"MemberLookup"})
		public void enter_Valid_MemberId() {
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.enterMemberId("GT000003673");
				mlp.clickOnSearchButton();
				mlp.verifySuccessfullNavigationFromMemberLookupToEarnPointPage(driver);
		
			}
	
		@Test(priority=3, groups = {"MemberLookup"})
		public void verify_Header_Hyperlink() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.clickOnHyperlink();
			mlp.headerHyperlinkVerification(driver);
			}
		
	
		@Test(priority = 4, groups = {"MemberLookup"} )
        public void hamburgerIcon_MemberLookup_Navigation_From_MemberLookup() throws InterruptedException {
        	
			memberLookupPage mlp = new memberLookupPage(driver);
        	
        	mlp.clickOnHamburgerIcon();
        	mlp.chooseMemberLookupOption();
        	mlp.verifySuccessfullNavigationFromMemberLookupToMemberLookupScreen(driver );
        	System.out.println("Navigation from Hamburger icon on member lookup screen working fine for 'Member Lookup Screen'");
        	
		}
		

		@Test(priority = 5, groups = {"MemberLookup"})
        public void hamburgerIcon_Location_Navigation_From_MemberLookup() throws InterruptedException {
        	
			memberLookupPage mlp = new memberLookupPage(driver);
        	
        	mlp.clickOnHamburgerIcon();
        	mlp.chooseLocationFromHamburger();
        	mlp.verifySuccessfullNavigationFromMemberLookupToLocationScreen(driver );
        	System.out.println("Navigation from Hamburger icon on Location screen working fine for 'Location option'");
        	
		}
	
		@Test(priority = 6, groups = {"MemberLookup"})
        public void hamburgerIcon_Logout_From_MemberLookup() throws InterruptedException {
        	
			memberLookupPage mlp = new memberLookupPage(driver);
        	mlp.clickOnHamburgerIcon();
        	mlp.chooseLogout();
        	mlp.verifyLogoutOptionOnMemberLookupScreen(driver);
        	System.out.println("Logout option under Hamburger icon on Location screen working fine");
        	
		}
		

		@Test(priority=7, groups = {"MemberLookup"})
		public void enter_Valid_CardNumber_11Length() {
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.enterMemberId("97001848539");
				mlp.clickOnSearchButton();
				mlp.verifySuccessfullNavigationFromMemberLookupToEarnPointPage(driver);
		
			}
	
		
		@Test(priority=8, groups = {"MemberLookup"})
		public void enter_Valid_CardNumber_10Length() {
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.enterMemberId("2234578005");
				mlp.clickOnSearchButton();
				mlp.verifySuccessfullNavigationFromMemberLookupToEarnPointPage(driver);
		
			}
		
		@Test(priority=9, groups = {"MemberLookup"})
		public void enter_Valid_CardNumber_For_KamenoiOption() {
			 String cardNumber = "1234567";
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.enterCardNumber("1234567");
				mlp.clickOnSearchButton();
				mlp.selectKamenoiOption();
				mlp.clickPopupContinueButton(driver);
				mlp.verifySuccessfullNavigationFromMemberLookupToEarnPointPage(driver);
				// Verify card number on Earn Point page
    			mlp.verifyCardNumberOnEarnPointPage(cardNumber);
		
			}
		
		@Test(priority=10, groups = {"MemberLookup"})
		public void enter_Valid_CardNumber_For_AccordiaOption() {
				memberLookupPage mlp = new memberLookupPage(driver);
				 String cardNumber = "1234567";
				mlp.enterCardNumber("1234567");
				mlp.clickOnSearchButton();
				mlp.selectAccordiaOption();
				mlp.clickPopupContinueButton(driver);
				mlp.verifySuccessfullNavigationFromMemberLookupToEarnPointPage(driver);

			    // Verify card number on Earn Point page with '0000' appended
				 mlp.verifyCardNumberOnEarnPointPage(cardNumber, true);// true indicates Accordia option selected
		
			}
	

		
		
		
}
