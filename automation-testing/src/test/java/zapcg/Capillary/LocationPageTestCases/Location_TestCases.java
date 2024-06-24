package zapcg.Capillary.LocationPageTestCases;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.locationSelectionPage;
import zapcg.Capillary.PageObject.loginPage;



public class Location_TestCases extends BaseTest{
	public loginPage lp;
	public String currentBrowser;
	public locationSelectionPage locp;

	
		
			@BeforeMethod
			@Parameters({"browser", "deviceName"})
		   public void initialize(String browser, String deviceName) throws InterruptedException {
				setUp(browser, deviceName); // Use the setup method to initialize the browser
		       initialization(browser);
		       driver.get(baseUrl);
		       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests
		       lp = new loginPage(driver);
		       lp = new loginPage(driver);
		       lp.changeDefaultLanguage();
		       lp.chooseEnglishLanguage();
               lp.login("zapcom_test2", "storeportal");
                
			}
                
                
                @Test(priority = 1)
                public void chooseValidLocation() throws InterruptedException {
                	// Initialize LocationPage after successful login
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
                
                
                @Test(priority = 2)
                public void verifyDropDownAvailability() throws InterruptedException {
                	// Initialize LocationPage after successful login
                	locationSelectionPage locp = new locationSelectionPage(driver);
                	 // Verify that both dropdowns are present
                    Assert.assertTrue(locp.areDropdownsPresent(), "Dropdowns are not present on the screen.");
  
                }
                
                
                @Test(priority = 3 )
                public void verifyIfAbleToSelectOptionFromDropDown() throws InterruptedException {
                	// Initialize LocationPage after successful login
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
                
                @Test(priority = 4 )
                public void verifyChooseLocationButtonAvailability() throws InterruptedException {
                	// Initialize LocationPage after successful login
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

                
                

 }
        
    
	


