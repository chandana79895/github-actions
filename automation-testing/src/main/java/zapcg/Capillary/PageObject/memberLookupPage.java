package zapcg.Capillary.PageObject;

import static org.testng.Assert.assertEquals;

import java.time.Duration;
import java.util.NoSuchElementException;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import zapcg.Capillary.Base.BaseTest;

public class memberLookupPage extends BaseTest {
	public WebDriver driver;
	
	@FindBy(xpath="//button[@id='MSMENUI2']")
	WebElement locationHeader;
	
	
	@FindBy(xpath="//button[@id='MS020B']")
	WebElement scanQRButton;
	

	@FindBy(id="MS016IN")
	WebElement enterCardIDorMemberId;
	
	@FindBy(xpath="//button[@id='MS018B']")
	WebElement searchButton;
	
	@FindBy(xpath="//p[contains(text(),'No User or Customer found')]")
	WebElement errormsgforinvalidmemberId;
	
	@FindBy(xpath="")
	WebElement errormsgformaxlengthmemberid;
	
	
	@FindBy(xpath="//button[@id='B']")
	WebElement tryAgainButton;
	
	
	@FindBy(xpath="//button[@id='MSMENUI3']")
	WebElement hamburgerIconMemberOnLookupPage;
	
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI0']")
	    WebElement hamburgerIconMemberLookupOption;
	    
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI1']")
	    WebElement hamburgerIconLocationOption;
	    
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI3']")
		WebElement logoutLocationScreen;
	    

	
	
	
	//Initializing the Page Objects:
		public memberLookupPage(WebDriver driver){
			this.driver=driver;
			PageFactory.initElements(driver, this);
		}
		


	    public String getHeaderText() {
	        return locationHeader.getText();
	    }
	    
	    public void clickOnHyperlink() {
	    	locationHeader.click();
	    	
	    }
	    
	    public void enterMemberId(String memberId) {
	    	enterCardIDorMemberId.sendKeys(memberId);
	    }
	    
	    
	    public void clickOnScanQRCodeButton()
	    {
	    	
	    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
	        WebElement scanQRCodeButton = wait.until(ExpectedConditions.visibilityOf(scanQRButton));
	        scanQRCodeButton.click();
	    
	    }
	    
	    public void clickOnSearchButton()
	    {
	    	
	    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
	        WebElement searchBtn = wait.until(ExpectedConditions.visibilityOf(searchButton));
	        searchBtn.click();
	    
	    }
	    
	    public void verifySuccessfullNavigationToMemberDetailsPage(WebDriver driver, String expectedUrl) {
			try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

		        // Wait for the URL to change to the expected URL
		        boolean isUrlChanged = wait.until(ExpectedConditions.urlToBe("https://d1msv2sqknn4w4.cloudfront.net/member-details"));

		        if (isUrlChanged) {
		            String currentUrl = driver.getCurrentUrl();
		            System.out.println("For valid memberId or cardnumber, navigated to the Member details screen: " + currentUrl);
		            String expectedUrl1 = "https://d1msv2sqknn4w4.cloudfront.net/member-details";
		            Assert.assertEquals(currentUrl, expectedUrl1, "The URL incorrect for member details screen");
		        } else {
		            System.out.println("The URL did not change to the expected URL within the timeout period.i.e, no success login,");
		            Assert.fail("Navigation was not successful as the URL did not change to the expected URL.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during navigation to member details page: " + e.getMessage());
		        Assert.fail("An error occurred during navigation to member details page: " + e.getMessage());
		    
			}
			
		}
	    
	    
	    public void headerHyperlinkVerification(WebDriver driver, String expectedUrl) {
	    	
	    	try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

		        // Wait for the URL to change to the expected URL
		        boolean isUrlChanged = wait.until(ExpectedConditions.urlToBe("https://d1msv2sqknn4w4.cloudfront.net/location-search"));

		        if (isUrlChanged) {
		            String currentUrl = driver.getCurrentUrl();
		            System.out.println("After clicking on Header-Hyperlink, Navigated to Location screen: " + currentUrl);
		            String expectedUrl1 = "https://d1msv2sqknn4w4.cloudfront.net/location-search";
		            Assert.assertEquals(currentUrl, expectedUrl1, "The URL incorrect for location screen");
		        } else {
		            System.out.println("The URL did not change to the expected URL within the timeout period.i.e, no success navigation");
		            Assert.fail("Navigation was not successful as the URL did not change to the expected URL.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during navigation to location page: " + e.getMessage());
		        Assert.fail("An error occurred during navigation to location page: " + e.getMessage());
		    
			}
	    	
	    	
	    	
	    }
	    
	    public void verifyMaxLengthForMemberId(String expectedErrorMessage) {
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(errormsgformaxlengthmemberid));

		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message for max length username:" +actualErrorMessage);
		        
		        // Assert that the error message is displayed
		        if (errorMsgElement.isDisplayed()) {
		            System.out.println("The error message is displayed.");
		        } else {
		            System.out.println("The error message is NOT displayed.");
		        }
		        // Assert that the error message is displayed
		        Assert.assertTrue(errorMsgElement.isDisplayed());

		        // Compare the actual error message with the expected error message
		        assertEquals(actualErrorMessage, expectedErrorMessage, "The validation message not displaying for Invalid inputs");
		  		
			}
			
			catch(NoSuchElementException e) {
				 System.out.println("The error message element was not found on the page.");
			        Assert.fail("The error message element was not found on the page.");

			}
	    }
		
	    
	    
	    public void verifyScanButtonEnabled() {
			
			
			try {

	            // Create an instance of WebDriverWait with a timeout of 10 seconds
	            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

	            // Wait for the login button to be clickable (enabled)
	            WebElement enabledScanQRButton = wait.until(ExpectedConditions.elementToBeClickable(scanQRButton));

	            // Assert that the login button is enabled
	            if (enabledScanQRButton.isEnabled()) {
	                System.out.println("The scan QR button is enabled.");
	            } else {
	                System.out.println("The Scan QR button is NOT enabled.");
	            }
	            Assert.assertTrue(enabledScanQRButton.isEnabled(), "The Scan QR button is not enabled.");

	        } catch (NoSuchElementException e) {
	            System.out.println("The Scan QR button element was not found on the page.");
	            Assert.fail("The Sacn QR button element was not found on the page.");
	        } catch (Exception e) {
	            System.out.println("An unexpected error occurred: " + e.getMessage());
	            Assert.fail("An unexpected error occurred: " + e.getMessage());
	        }
	   }
	    
	    
	    public void verifyValidationMessageForInvalidMemberId(String expectedErrorMessage) {
	    	try {
				 // Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(errormsgforinvalidmemberId));

		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message for Invalid length of memberid:" +actualErrorMessage);
		        
		        
		        // Assert that the error message is displayed
		        if (errorMsgElement.isDisplayed()) {
		            System.out.println("The error message is displayed.");
		        } else {
		            System.out.println("The error message is NOT displayed.");
		        }
		        // Assert that the error message is displayed
		        Assert.assertTrue(errorMsgElement.isDisplayed());

		        // Compare the actual error message with the expected error message
		        assertEquals(actualErrorMessage, expectedErrorMessage, "The validation message not displaying for Invalid lmemberId");
		    } catch (NoSuchElementException e) {
		        System.out.println("The error message element was not found on the page.");
		        Assert.fail("The error message element was not found on the page.");
		    }
	    	
	    }
	  
	    
	    
	    
	    
	    public void verifySearchButtonDisableForEmptyInput() {
			try {
			     
	            Assert.assertFalse(searchButton.isEnabled(), "The search button should be disabled when the input is empty.");
	            System.out.println("Search button is disabled when cardNumber or MemberId is empty: " + !searchButton.isEnabled());

	            
	        } catch (NoSuchElementException e) {
	            System.out.println("One of the elements was not found on the page.");
	            Assert.fail("One of the elements was not found on the page.");
	        } catch (Exception e) {
	            System.out.println("An unexpected error occurred: " + e.getMessage());
	            Assert.fail("An unexpected error occurred: " + e.getMessage());
	        }
			
		}
	    
	    
	    
	    
	    
	    public void clickOnTryAgainButton()
	    {
	    	tryAgainButton.click();
	    }
	    
	    
	    
	    
	    public void clickOnHamburgerIcon()
	    {
	    	
	    	hamburgerIconMemberOnLookupPage.click();
	    
	    }
	    
	    public void chooseMemberLookupOption() {
	    	hamburgerIconMemberLookupOption.click();
	    	
	    }
	    
	    public void chooseLocationFromHamburger() {
	    	hamburgerIconLocationOption.click();
	    	
	    }

	    public void verifySuccessfullNavigationFromMemberLookupToMemberLookupScreen(WebDriver driver, String expectedUrl) {
			try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

		        // Wait for the URL to change to the expected URL
		        boolean isUrlChanged = wait.until(ExpectedConditions.urlToBe("https://d1msv2sqknn4w4.cloudfront.net/member-search"));

		        if (isUrlChanged) {
		            String currentUrl = driver.getCurrentUrl();
		            System.out.println("Using hamburgurIcon, choose Member lookup option,and successfully navigated to the Member Lookup screen: " + currentUrl);
		            String expectedUrl1 = "https://d1msv2sqknn4w4.cloudfront.net/member-search";
		            Assert.assertEquals(currentUrl, expectedUrl1, "The URL of member lookup screen is incorrect. Navigation not successful.");
		        } else {
		            System.out.println("The URL did not change to the expected URL within the timeout period.i.e, no success navigation from location to member lookup screen,");
		            Assert.fail("Navigation was not successful as the URL did not change to the expected URL.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during login verification: " + e.getMessage());
		        Assert.fail("An error occurred during page verification: " + e.getMessage());
		    
			}
			
		}
	    
	    public void verifySuccessfullNavigationFromMemberLookupToLocationScreen(WebDriver driver, String expectedUrl) {
			try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

		        // Wait for the URL to change to the expected URL
		        boolean isUrlChanged = wait.until(ExpectedConditions.urlToBe("https://d1msv2sqknn4w4.cloudfront.net/location-search"));

		        if (isUrlChanged) {
		            String currentUrl = driver.getCurrentUrl();
		            System.out.println("Using hamburgurIcon, choose Location option,and successfully navigated to the Location screen: " + currentUrl);
		            String expectedUrl1 = "https://d1msv2sqknn4w4.cloudfront.net/location-search";
		            Assert.assertEquals(currentUrl, expectedUrl1, "The URL of location screen is incorrect. Navigation not successful.");
		        } else {
		            System.out.println("The URL did not change to the expected URL within the timeout period.i.e, no success navigation from location to member lookup screen,");
		            Assert.fail("Navigation was not successful as the URL did not change to the expected URL.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during login verification: " + e.getMessage());
		        Assert.fail("An error occurred during page verification: " + e.getMessage());
		    
			}
	    }
			
				public void verifyLogoutOptionOnMemberLookupScreen(WebDriver driver, String expectedUrl) {
		    	
		    	try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

			        // Wait for the URL to change to the expected URL
			        boolean isUrlChanged = wait.until(ExpectedConditions.urlToBe("https://d1msv2sqknn4w4.cloudfront.net/login"));

			        if (isUrlChanged) {
			            String currentUrl = driver.getCurrentUrl();
			            System.out.println("Using hamburgurIcon, choose Logout,and successfully navigated to the Login screen: " + currentUrl);
			            String expectedUrl1 = "https://d1msv2sqknn4w4.cloudfront.net/login";
			            Assert.assertEquals(currentUrl, expectedUrl1, "The URL of login screen is incorrect. Navigation not successful.");
			        } else {
			            System.out.println("The URL did not change to the expected URL within the timeout period.i.e, no success navigation from location to member lookup screen,");
			            Assert.fail("Navigation was not successful as the URL did not change to the expected URL.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during login verification: " + e.getMessage());
			        Assert.fail("An error occurred during page verification: " + e.getMessage());
			    
				}
				
		    	
		    	
		    }
				
				public void chooseLogout()
				{
					logoutLocationScreen.click();
				}
			
			
			
		}
	
	


