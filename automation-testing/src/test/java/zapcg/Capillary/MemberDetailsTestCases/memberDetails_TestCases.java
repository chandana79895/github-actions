package zapcg.Capillary.MemberDetailsTestCases;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberDetailsPage;
import zapcg.Capillary.PageObject.memberLookupPage;


@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			

public class memberDetails_TestCases extends BaseTest{
	
	public loginPage lp;
	 public String currentBrowser;
	 memberDetailsPage	mdp=new memberDetailsPage(driver);
	
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
			mdp=new memberDetailsPage(driver);
			
	       

	   }
	 
	 

	 
	 @Test(priority=1, groups = {"MemberDetails"})
		public void verify_MemberDetails_Navigation_From_MeberLookupScreen_To_MemberDetailsPage() {
		
		 mdp.verifySuccessfullNavigationFromMemberLookupToMemberDetailsPage(driver);
				
		
	}
	 
	 
	 @Test(priority=2, groups = {"MemberDetails"})
		public void verify_MemberDetails_Displaying() {
		
		 mdp.verifyMemberDetailsDisplaying(driver);
				
		
	}
	 
	 
	 //Verify all the member details and print if the details are available on the screen
	 @Test(priority=3, groups = {"MemberDetails"})
		public void verify_MemberDetails_ContentDisplaying() {
		 mdp.verifyTheMemberDetailsContentDisplaying(driver);
				
		
	}
	 
	 @Test(priority=4, groups = {"MemberDetails"})
		public void verify_Enabled_EnterReceiptDetails_Button() {
		mdp.verifyEnterReceiptButtonEnabled(); 
				
		
	}
	 
	 @Test(priority=5, groups = {"MemberDetails"})
		public void verify_Header_MemberDetailsScreen() {
		 mdp.clickOnHyperlink();
		mdp.headerHyperlinkVerificationOnMemberDetailsScreen(driver); 
				
		
	}
	 /*
	 //Expected behavior not yet decided.
	 @Test(priority=6, groups = "MemberDetails")
		public void verifyExpiryDateEqualToSystemDateThenNoRedeem() {
		 		
		
	}*/
	 
	 @Test(priority=7, groups = {"MemberDetails"})
		public void verify_Hamburger_MemberLookup_Option_on_MemberDetails() throws InterruptedException {
	
		 mdp.clickOnHamburgerIcon();
		 mdp.chooseMemberLookupOption();
		 Thread.sleep(1000);
		 mdp.verifySuccessfullNavigationFromMemberDetailsToMemberLookupScreen(driver);
		 		
		
	}
	 
	 @Test(priority=8, groups = {"MemberDetails"})
		public void verify_Hamburger_LocationOption_On_MemberDetails() throws InterruptedException {
		
		 mdp.clickOnHamburgerIcon();
		 mdp.chooseLocationFromHamburger();
		 Thread.sleep(1000);
		 mdp.verifySuccessfullNavigationFromMemberDetailsToLocationScreen(driver);
		
	}
	 
	 @Test(priority=9, groups = {"MemberDetails"})
		public void verify_Hamburger_LogoutOption_On_MemberDetails() throws InterruptedException {
		 
		 mdp.clickOnHamburgerIcon();
		 mdp.chooseLogout();
		 Thread.sleep(1000);
		mdp.verifyLogoutOptionOnMemberDetailsScreen(driver);
	}
	 
	 
	 @Test(priority=10, groups = {"MemberDetails"})
		public void verify_BackButton_On_MemberDetails_Screen() throws InterruptedException {
		 
		 mdp.clickOnBackButton();
		 Thread.sleep(1000);
		mdp.verifySuccessfullNavigationForBackButton(driver);
	}
	 

	 
	 
	 

}
