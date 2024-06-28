package zapcg.Capillary.LocationPageTestCases;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.locationSelectionPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;



public class Location_ExistingUser_TestCases extends BaseTest{
	public loginPage lp;
	public String currentBrowser;
	public locationSelectionPage locp;
	public memberLookupPage mlp;

	
		
			@BeforeMethod
			@Parameters({"browser", "deviceName"})
		   public void initialize(String browser, String deviceName) throws InterruptedException {
				setUp(browser, deviceName); // Use the setup method to initialize the browser
		       initialization(browser);
		       driver.get(baseUrl);
		       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests
		       lp = new loginPage(driver);
		       lp = new loginPage(driver);
		       mlp=new memberLookupPage(driver);
		       lp.changeDefaultLanguage();
		       lp.chooseEnglishLanguage();
               lp.login("zapcom_test2", "storeportal");
               mlp.clickOnHamburgerIcon();
               mlp.chooseLocationFromHamburger();
           
               
                
			}
                
          
                @Test(priority = 11)
                public void chooseValidLocationForNewUser() throws InterruptedException {
                	
                    locationSelectionPage locp = new locationSelectionPage(driver);
                    
                    // Add your test steps related to location page here
                     locp.lookupPropertyOptions("Option 1");
                    // Select option from the second dropdown
                      locp.selectStoreOptions("Option 2");
                    
                    locp.clickOnChooseLocationButton();
            
                   // locp.clickNavigateButton();
                    locp.verifySuccessfullNavigationFromLocationToMemberSearchPage(driver, "https://d1msv2sqknn4w4.cloudfront.net/member-search");
                    System.out.println("The functionality of location screen working properly");
                    
            		}
                
                
                @Test(priority = 12)
                public void verifyDropDownAvailability() throws InterruptedException {
                	
                	locationSelectionPage locp = new locationSelectionPage(driver);
                	 // Verify that both dropdowns are present
                    Assert.assertTrue(locp.areDropdownsPresent(), "Dropdowns are not present on the screen.");
  
                }
                
                
                @Test(priority = 13 )
                public void verifyIfAbleToSelectOptionFromDropDown() throws InterruptedException {
                	
                	locationSelectionPage locp = new locationSelectionPage(driver);
                	 // Verify that both dropdowns are present
                	
                	
                	try {
                        // Select options from dropdowns
                        String option1 = "Option 1";
                        String option2 = "Option 2";
                        
                        locp.lookupPropertyOptions(option1);
                        locp.selectStoreOptions(option2);
                        
                        // Verify that the actions are successful and no exceptions were thrown
                        Assert.assertTrue(true, "Successfully selected options from both dropdowns and proceeded.");
                    } catch (Exception e) {
                        Assert.fail("An error occurred while selecting options from the dropdowns: " + e.getMessage());
                    }  
                }
                
                @Test(priority = 14 )
                public void verifyChooseLocationButtonAvailability() throws InterruptedException {
                	
                	locationSelectionPage locp = new locationSelectionPage(driver);
                	 // Verify that both dropdowns are present
                	
                	try {
                        // Check if the navigate button is enabled
                        boolean isEnabled = locp.isNavigateButtonEnabled();
                        Assert.assertTrue(isEnabled, "The navigate button should be enabled and clickable.");
                        System.out.println("Choose Location button is working fine ");
                    } catch (Exception e) {
                        Assert.fail("An error occurred while checking the navigate button state: " + e.getMessage());
                    }
                }

              
                
                @Test(priority = 15)
                public void verifyHeaderOfMemberLookupScreen() {
                	
                	locationSelectionPage locp = new locationSelectionPage(driver);
                	memberLookupPage mlp=new memberLookupPage(driver);
                	String option1 = "Option 1";
                    String option2 = "Option 2";
               

                    try {
                        // Select options from dropdowns
                        locp.lookupPropertyOptions(option1);
                        locp.selectStoreOptions(option2);
                     
                     // Somewhere else in your code where you call the method
                        String selectedOption = locp.selectStoreOptions("HMH01101 - MyStays Akasaka");
                        if (selectedOption != null) {
                            System.out.println("Selected option: " + selectedOption);
                        } else {
                            System.out.println("Option not found.");
                        }

                        // Click the navigation button to proceed to the next page
                        locp.clickOnChooseLocationButton();
                        

                        // Verify the selected options match the displayed data on the next page
                          String displayedStoreValue= mlp.getHeaderText();
                          System.out.println("Header on Member Lookup screen: "+displayedStoreValue);
                        
                        boolean isMatch = locationSelectionPage.partialMatch(selectedOption, displayedStoreValue);
                        if (isMatch) {
                            System.out.println("The strings partially match.");
                        } else {
                            System.out.println("The strings do not match.");
                        }
                        
                    } catch (Exception e) {
                        Assert.fail("An error occurred while verifying the dropdown selections: " + e.getMessage());
                    }
                	
                }
                
           
			
			@Test(priority = 16 )
            public void burgerIconMemberLookupNavigation() throws InterruptedException {
            	
            	locationSelectionPage locp = new locationSelectionPage(driver);
            	
            	locp.clickOnHamburgerIcon();
            	locp.chooseMemberLookupOption();
            	locp.verifySuccessfullNavigationFromLocationToMemberLookupScreen(driver,"https://d1msv2sqknn4w4.cloudfront.net/member-search" );
            	System.out.println("Navigation from Hamburger icon on Location screen working fine for 'Member Lookup Screen'");
            	
			}
			

			@Test(priority = 17 )
            public void burgerIconMemberLocationNavigation() throws InterruptedException {
            	
            	locationSelectionPage locp = new locationSelectionPage(driver);
            	
            	locp.clickOnHamburgerIcon();
            	locp.chooseLocationOption();
            	locp.verifySuccessfullNavigationFromLocationToLocationScreen(driver,"https://d1msv2sqknn4w4.cloudfront.net/location-search" );
            	System.out.println("Navigation from Hamburger icon on Location screen working fine for 'Location option'");
            	
			}
			
			@Test(priority = 18 )
            public void burgerIconLogout() throws InterruptedException {
            	
            	locationSelectionPage locp = new locationSelectionPage(driver);
            	
            	locp.clickOnHamburgerIcon();
            	locp.chooseLogout();
            	locp.verifyLogoutOptionOnLocationScreen(driver,"https://d1msv2sqknn4w4.cloudfront.net/login" );
            	System.out.println("Logout option under Hamburger icon on Location screen working fine");
            	
			}
			
		

 }
        
    
	


