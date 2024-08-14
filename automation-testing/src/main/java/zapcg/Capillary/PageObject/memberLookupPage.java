package zapcg.Capillary.PageObject;

import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.testng.Assert.assertEquals;

import java.time.Duration;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
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
	
	@FindBy(xpath="//h5[@id='MS058MSG']")
	WebElement errormsgforinvalidmemberId;
	
	@FindBy(xpath="//p[@id='MS016-helper-text']")
	WebElement errormsgforinvalidmemberId1;
	
	
	@FindBy(xpath="//p[@id='MS016-helper-text']")
	WebElement errormsgforinvalidCardNumber;
	
	@FindBy(xpath="//p[@id='MS016-helper-text']")
	WebElement errormsgformaxlengthmemberid;
	
	
	@FindBy(xpath="//button[@id='B']")
	WebElement tryAgainButton;
	
	
	@FindBy(xpath="//button[@id='MS058B']")
	WebElement tryAgainButtonCardNumberInvalid;
	
	@FindBy(xpath="//button[@id='MSMENUI3']")
	WebElement hamburgerIconMemberOnLookupPage;
	
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI0']")
	    WebElement hamburgerIconMemberLookupOption;
	    
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI1']")
	    WebElement hamburgerIconLocationOption;
	    
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI3']")
		WebElement logoutLocationScreen;
	    
	 @FindBy(xpath="//div[@id='MDCONT']")
	 WebElement navigatedFromMemberLookupToMemberDetails;
	 
	 //EPCONT
	 @FindBy(xpath="//div[@id='EPCONT']")
	 WebElement navigatedFromMemberLookupToEarnPoint;
	 
	 @FindBy(xpath="//div[@id='LSCONT']")
	 WebElement navigatedFromMemberLookupToLocation;
	 
	 @FindBy(xpath="//div[@id='MSCONT']")
	 WebElement navigatedFromMemberLookupToMemeberLookup;
	 
	 @FindBy(xpath="//div[@id='LSCONT']")
	 WebElement naviagtedToLoginPage;
	 
	 @FindBy(xpath="//div[@id='EPCONT']")
	 WebElement navigatedToEarnPoint;
	 
	 @FindBy(xpath="//div[@id='MS082']")
	 WebElement cardTypePopUp;
	 
	 @FindBy(xpath="//li[@id='MS0820']")
	 //      //input[@id='kamenoi' and @type='radio']
	 WebElement kamenoiOption;
	 
	 @FindBy(xpath="//li[@id='MS0821']") 
	 WebElement accordiaOption;
	 
	 @FindBy(xpath="//button[@id='MS082B']")
	 WebElement popupContinueButton;
	 
	
	
	//Initializing the Page Objects:
		public memberLookupPage(WebDriver driver){
			this.driver=driver;
			PageFactory.initElements(driver, this);
		}
		


	    public String getHeaderText() {
	        return locationHeader.getText();
	    }
	    
	    public void clickOnHyperlink() {
	    	FluentWait<WebDriver> wait = new FluentWait<>(driver)
	                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
	                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
	                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

	            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locationHeader));
	            element.click();
	    	//locationHeader.click();
	    	
	    }
	    
	    public void enterMemberId(String memberId) {
	    	try {
	            // Wait until the enterCardIDorMemberId element is visible and clickable
	            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
	            wait.until(ExpectedConditions.visibilityOf(enterCardIDorMemberId));
	            wait.until(ExpectedConditions.elementToBeClickable(enterCardIDorMemberId));

	            // Enter the member ID
	            enterCardIDorMemberId.sendKeys(memberId);

	            System.out.println("MemberId entered successfully.");
	        } catch (Exception e) {
	            System.out.println("An error occurred while entering the memberId : " + e.getMessage());
	            Assert.fail("An error occurred while entering the memberID: " + e.getMessage());
	        }
	    	//enterCardIDorMemberId.sendKeys(memberId);
	    }
	    
	    
	    public void enterCardNumber(String cardNumber) {
	        try {
	            // Wait until the enterCardIDorMemberId element is visible and clickable
	            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
	            wait.until(ExpectedConditions.visibilityOf(enterCardIDorMemberId));
	            wait.until(ExpectedConditions.elementToBeClickable(enterCardIDorMemberId));

	            // Enter the member ID
	            enterCardIDorMemberId.sendKeys(cardNumber);

	            System.out.println("Card number entered successfully.");
	        } catch (Exception e) {
	            System.out.println("An error occurred while entering the card number: " + e.getMessage());
	            Assert.fail("An error occurred while entering the card number: " + e.getMessage());
	        }
	    }

	    
	    public void clickOnScanQRCodeButton()
	    {
	    	
	    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
	        WebElement scanQRCodeButton = wait.until(ExpectedConditions.visibilityOf(scanQRButton));
	        scanQRCodeButton.click();
	    
	    }
	    
	    public void clickOnSearchButton()
	    {
	    	
	    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
	        WebElement searchBtn = wait.until(ExpectedConditions.visibilityOf(searchButton));
	        searchBtn.click();
	    
	    }
	    

	    
	    public void headerHyperlinkVerification(WebDriver driver) {
	    	
	    	try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the URL to change to the expected URL
		        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberLookupToLocation));

		        if (pageLoaded != null && pageLoaded.isDisplayed()) {
		        	// Page is successfully loaded if the WebElement is visible
		            System.out.println("Successfully navigated to the Location screen");
		        } else {
		            System.out.println("The expected element did not become visible within the timeout period");
		            Assert.fail("Navigation from member lookup screen to Location screen was not successful as the expected element did not become visible.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during navigation: " + e.getMessage());
		        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
		    }
	    	
	    	
	    }
	    
	    public void verifyMaxLengthForMemberId(String expectedErrorMessage) {
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

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
	            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

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
	    
	    public void verifyValidationMessageForInvalidMemberId1(String expectedErrorMessage) {
	    	try {
				 // Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(errormsgforinvalidmemberId1));

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
	    	Wait<WebDriver> wait = new FluentWait<>(driver)
	                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
	                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
	                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

	            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(tryAgainButton));
	            element.click();
	    	//tryAgainButton.click();
	    }
	    
	    
	    
	    
	    public void clickOnHamburgerIcon()
	    {	
	    	Wait<WebDriver> wait = new FluentWait<>(driver)
	                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
	                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
	                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

	            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconMemberOnLookupPage));
	            element.click();
	    	
	    	//hamburgerIconMemberOnLookupPage.click();
	    
	    }
	    
	    public void chooseMemberLookupOption() {
	    	
	    	Wait<WebDriver> wait = new FluentWait<>(driver)
	                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
	                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
	                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

	            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconMemberLookupOption));
	            element.click();
	    	//hamburgerIconMemberLookupOption.click();
	    	
	    }
	    
	    public void chooseLocationFromHamburger() {
	    	Wait<WebDriver> wait = new FluentWait<>(driver)
	                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
	                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
	                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

	            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconLocationOption));
	            element.click();
	    	//hamburgerIconLocationOption.click();
	    	
	    }

	    public void verifySuccessfullNavigationFromMemberLookupToMemberLookupScreen(WebDriver driver) {
	    	try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the URL to change to the expected URL: navigatedFromMemberLookupToMemeberLookup
		        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberLookupToMemeberLookup));

		        if (pageLoaded != null && pageLoaded.isDisplayed()) {
		        	// Page is successfully loaded if the WebElement is visible
		            System.out.println("Successfully navigated to the member lookup screen");
		        } else {
		            System.out.println("The expected element did not become visible within the timeout period");
		            Assert.fail("Navigation from member lookup screen to Member lookup screen was not successful as the expected element did not become visible.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during navigation: " + e.getMessage());
		        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
		    }
			
		}
	    
	    public void verifySuccessfullNavigationFromMemberLookupToLocationScreen(WebDriver driver) {
	    	try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the URL to change to the expected URL//navigatedFromMemberLookupToLocation
		        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberLookupToLocation));

		        if (pageLoaded != null && pageLoaded.isDisplayed()) {
		        	// Page is successfully loaded if the WebElement is visible
		            System.out.println("Successfully navigated to the Location screen");
		        } else {
		            System.out.println("The expected element did not become visible within the timeout period");
		            Assert.fail("Navigation from member lookup screen to Location screen was not successful as the expected element did not become visible.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during navigation: " + e.getMessage());
		        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
		    }
	    }
			
				public void verifyLogoutOptionOnMemberLookupScreen(WebDriver driver) {
		    	
					try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(naviagtedToLoginPage));

				        if (pageLoaded != null && pageLoaded.isDisplayed()) {
				        	// Page is successfully loaded if the WebElement is visible
				            System.out.println("Successfully navigated to the Login screen");
				        } else {
				            System.out.println("The expected element did not become visible within the timeout period");
				            Assert.fail("Navigation from member lookup screen to Login screen was not successful as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during navigation: " + e.getMessage());
				        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
				    }
				
		    	
		    	
		    }
				
				public void chooseLogout()
				
				
				{
					Wait<WebDriver> wait = new FluentWait<>(driver)
			                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
			                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
			                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

			            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(logoutLocationScreen));
			            // Scroll the element into view
			            ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
			            
			            // Additional check to ensure the element is visible
			            wait.until(ExpectedConditions.visibilityOf(element));
			            element.click();
					
					//logoutLocationScreen.click();
				}
			
				public void verifySuccessfullNavigationFromMemberLookupToEarnPointPage(WebDriver driver) {
					try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberLookupToEarnPoint));

				        if (pageLoaded != null && pageLoaded.isDisplayed()) {
				        	// Page is successfully loaded if the WebElement is visible
				            System.out.println("Successfully navigated to the Earn Point page ");
				        } else {
				            System.out.println("The expected element did not become visible within the timeout period");
				            Assert.fail("Navigation from member dedtails screen to earn point screen was not successful as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during navigation: " + e.getMessage());
				        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
				    }
					
				}
				
				
				public void navigateToNextScreen()
				{
					try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedToEarnPoint));

				        if (pageLoaded != null && pageLoaded.isDisplayed()) {
				        	// Page is successfully loaded if the WebElement is visible
				            System.out.println("Successfully navigated to the Earn Point page ");
				        } else {
				            System.out.println("The expected element did not become visible within the timeout period");
				            Assert.fail("Navigation from member dedtails screen to earn point screen was not successful as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during navigation: " + e.getMessage());
				        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
				    }
					
				}
				
				
				
			

				public void verifyCardTypePopUpVisibility(WebDriver driver) {
				    try {
				        // Create an instance of WebDriverWait with a timeout of 30 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the cardTypePopUp element to become visible
				        WebElement popUpVisible = wait.until(ExpectedConditions.visibilityOf(cardTypePopUp));

				        if (popUpVisible != null && popUpVisible.isDisplayed()) {
				            // The pop-up is successfully visible if the WebElement is visible
				            System.out.println("Card Type Pop-up is successfully visible");
				        } else {
				            System.out.println("The Card Type Pop-up did not become visible within the timeout period");
				            Assert.fail("Card Type Pop-up visibility verification failed as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during Card Type Pop-up visibility verification: " + e.getMessage());
				        Assert.fail("An error occurred during Card Type Pop-up visibility verification: " + e.getMessage());
				    }
				}

				
				public void selectKamenoiOption() {
					try {
				        // Create an instance of FluentWait with a timeout of 20 seconds and polling interval of 1 second
				        FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
				                .withTimeout(Duration.ofSeconds(20))
				                .pollingEvery(Duration.ofSeconds(1))
				                .ignoring(Exception.class);

				        // Wait for the pop-up to be visible (replace 'popupSelector' with the actual locator for the pop-up)
				        WebElement popup = fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                return driver.findElement(By.xpath("//div[@id='MS082']"));
				            }
				        });

				        // Wait for the checkbox element to be present and visible within the pop-up
				        WebElement kamenoiElement = fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                WebElement element = driver.findElement(By.xpath("//li[@id='MS0820']"));
				                if (element.isDisplayed()) {
				                    return element;
				                } else {
				                    return null;
				                }
				            }
				        });

				        // Scroll the checkbox into view using JavaScript
				        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", kamenoiElement);

				        // Wait until the checkbox is clickable
				        fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                if (kamenoiElement.isEnabled() && kamenoiElement.isDisplayed()) {
				                    return kamenoiElement;
				                } else {
				                    return null;
				                }
				            }
				        });

				        // Click on the checkbox
				        kamenoiElement.click();

				        System.out.println("Kamenoi checkbox option selected successfully.");
				    } catch (Exception e) {
				        System.out.println("An error occurred while selecting the Kamenoi checkbox option: " + e.getMessage());
				        Assert.fail("An error occurred while selecting the Kamenoi checkbox option: " + e.getMessage());
				    }
					
					
				}
				
			
				public void selectAccordiaOption() {
				   
					try {
				        // Create an instance of FluentWait with a timeout of 20 seconds and polling interval of 1 second
				        FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
				                .withTimeout(Duration.ofSeconds(20))
				                .pollingEvery(Duration.ofSeconds(1))
				                .ignoring(Exception.class);

				        // Wait for the pop-up to be visible (replace 'popupSelector' with the actual locator for the pop-up)
				        WebElement popup = fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                return driver.findElement(By.xpath("//div[@id='MS082']"));
				            }
				        });

				        // Wait for the checkbox element to be present and visible within the pop-up
				        WebElement accordiaElement = fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                WebElement element = driver.findElement(By.xpath("//li[@id='MS0821']"));
				                if (element.isDisplayed()) {
				                    return element;
				                } else {
				                    return null;
				                }
				            }
				        });

				        // Scroll the checkbox into view using JavaScript
				        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", accordiaElement);

				        // Wait until the checkbox is clickable
				        fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                if (accordiaElement.isEnabled() && accordiaElement.isDisplayed()) {
				                    return accordiaElement;
				                } else {
				                    return null;
				                }
				            }
				        });

				        // Click on the checkbox
				        accordiaElement.click();

				        System.out.println("Accordia checkbox option selected successfully.");
				    } catch (Exception e) {
				        System.out.println("An error occurred while selecting the Accordia checkbox option: " + e.getMessage());
				        Assert.fail("An error occurred while selecting the Accordia checkbox option: " + e.getMessage());
				    }
					
					
					
					
					
					
					
					
					/*try {
				    
				        if (accordiaOption != null && accordiaOption.isDisplayed() && accordiaOption.isEnabled()) {
				        	accordiaOption.click();
				            System.out.println("Accordia radio button option is selected.");
				        } else {
				            System.out.println("Accordia radio button option is not available for selection.");
				            Assert.fail("Accordia radio button option is not available for selection.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred while selecting the Accordia radio button option: " + e.getMessage());
				        Assert.fail("An error occurred while selecting the Accordia radio button option: " + e.getMessage());
				    }*/
				}
				
				
				public void clickPopupContinueButton(WebDriver driver) {
				    try {
				        // Create an instance of FluentWait with a timeout of 20 seconds and polling interval of 1 second
				        FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
				                .withTimeout(Duration.ofSeconds(20))
				                .pollingEvery(Duration.ofSeconds(1))
				                .ignoring(Exception.class);

				        // Wait for the popupContinueButton element to be present and visible
				        WebElement continueButton = fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                WebElement element = driver.findElement(By.xpath("//button[@id='MS082B']"));
				                if (element.isDisplayed()) {
				                    return element;
				                } else {
				                    return null;
				                }
				            }
				        });

				        // Scroll the button into view using JavaScript
				        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", continueButton);

				        // Wait until the button is clickable
				        fluentWait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                if (continueButton.isEnabled() && continueButton.isDisplayed()) {
				                    return continueButton;
				                } else {
				                    return null;
				                }
				            }
				        });

				        // Click on the button
				        continueButton.click();

				        System.out.println("Popup continue button clicked successfully.");
				    } catch (Exception e) {
				        System.out.println("An error occurred while clicking the popup continue button: " + e.getMessage());
				        Assert.fail("An error occurred while clicking the popup continue button: " + e.getMessage());
				    }
				}
		
				public void verifyCardNumberOnEarnPointPage(String expectedCardNumber) {
					
					try {
				        // Assuming you have a locator for the card number on the Earn Point page
				        WebElement cardNumberOnEarnPoint = new WebDriverWait(driver, Duration.ofSeconds(30))
				                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h6[@id='EPMBRCCNS']")));

				        // Get the card number(s) text
				        String cardNumberText = cardNumberOnEarnPoint.getText().trim();

				        // Split the card numbers by comma if there are multiple card numbers
				        String[] cardNumbers = cardNumberText.split(",");

				        // Verify if the expected card number is in the list of card numbers
				        boolean isCardNumberFound = false;
				        for (String cardNumber : cardNumbers) {
				            if (cardNumber.trim().equals(expectedCardNumber)) {
				                isCardNumberFound = true;
				                break;
				            }
				        }

				        if (isCardNumberFound) {
				            System.out.println("Card number on the Earn Point page matches the expected value.");
				        } else {
				            System.err.println("Card number mismatch: Expected " + expectedCardNumber + " but found " + cardNumberText);
				            Assert.fail("Card number mismatch: Expected " + expectedCardNumber + " but found " + cardNumberText);
				        }
				    } catch (TimeoutException e) {
				        System.err.println("Timeout waiting for card number element on Earn Point page: " + e.getMessage());
				        Assert.fail("An error occurred during card number verification on Earn Point page: Timeout waiting for element.");
				    } catch (Exception e) {
				        System.err.println("An error occurred during card number verification on Earn Point page: " + e.getMessage());
				        Assert.fail("An unexpected error occurred during card number verification on Earn Point page: " + e.getMessage());
				    }
					
					
					//this code is, if single card number displaying
				   /* try {
				        // Assuming you have a locator for the card number on the Earn Point page
				        WebElement cardNumberOnEarnPoint = new WebDriverWait(driver, Duration.ofSeconds(30))
				                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h6[@id='EPMBRCCNS']")));

				        // Verify card number length and value
				        String cardNumberText = cardNumberOnEarnPoint.getText();
				        if (cardNumberText.length() == 7) {
				            System.out.println("Card number length is 7 digits.");

				            if (cardNumberText.equals(expectedCardNumber)) {
				                System.out.println("Card number on the Earn Point page matches the expected value.");
				            } else {
				                System.out.println("Card number on the Earn Point page does not match the expected value.");
				                Assert.fail("Card number mismatch: Expected " + expectedCardNumber + " but found " + cardNumberText);
				            }
				        } else {
				            System.out.println("Card number length is not 7 digits on Earn point screen");
				            Assert.fail("Card number length is not 7 digits.");
				        }
				    } catch (TimeoutException e) {
				        System.err.println("Timeout waiting for card number element on Earn Point page: " + e.getMessage());
				        Assert.fail("An error occurred during card number verification on Earn Point page: Timeout waiting for element.");
				    } catch (Exception e) {
				        System.err.println("An error occurred during card number verification on Earn Point page: " + e.getMessage());
				        Assert.fail("An unexpected error occurred during card number verification on Earn Point page: " + e.getMessage());
				    }
				    */
				    
				}    
				    
				    
				    
				    
				// In your memberLookupPage class, update the verification method

				   
				
				public void verifyCardNumberOnEarnPointPage(String originalCardNumber, boolean isAccordiaSelected) {
				    FluentWait<WebDriver> wait = new FluentWait<>(driver)
				            .withTimeout(Duration.ofSeconds(60))
				            .pollingEvery(Duration.ofMillis(1000))
				            .ignoring(NoSuchElementException.class)
				            .ignoring(StaleElementReferenceException.class);

				    try {
				        WebElement cardNumberElement = wait.until(new Function<WebDriver, WebElement>() {
				            public WebElement apply(WebDriver driver) {
				                return driver.findElement(By.xpath("//h6[@id='EPMBRCCNS']"));
				            }
				        });

				        // Construct the expected card number
				        String expectedCardNumber = isAccordiaSelected ? originalCardNumber + "0000" : originalCardNumber;

				        // Get the actual text of the card number element
				        String actualCardNumberText = cardNumberElement.getText().trim();
				        
				        // Extract the first card number from the text
				        String actualCardNumber = extractFirstCardNumber(actualCardNumberText);

				        if (expectedCardNumber.equals(actualCardNumber)) {
				            System.out.println("Card number matches: " + actualCardNumber);
				        } else {
				            System.err.println("Card number mismatch: Expected " + expectedCardNumber + " but found " + actualCardNumber);
				            Assert.fail("Card number mismatch: Expected " + expectedCardNumber + " but found " + actualCardNumber);
				        }
				    } catch (TimeoutException e) {
				        System.err.println("Timeout waiting for card number element: " + e.getMessage());
				        Assert.fail("An error occurred during card number verification: Timeout waiting for element.");
				    } catch (Exception e) {
				        System.err.println("An error occurred during card number verification: " + e.getMessage());
				        Assert.fail("An unexpected error occurred during card number verification: " + e.getMessage());
				    }
				}

				private String extractFirstCardNumber(String text) {
				    // Find the first sequence of digits in the text
				    Matcher matcher = Pattern.compile("\\d+").matcher(text);
				    if (matcher.find()) {
				        return matcher.group();
				    }
				    return ""; // Return empty if no digits found
				}


				 public void enterInvalidCardNumber(String cardNumber) {
					 enterCardIDorMemberId.clear();
					 enterCardIDorMemberId.sendKeys(cardNumber);
				    }

				    public void clickOnTryAgainButtonForInvalidCardNumber()
				    {
				    	 Wait<WebDriver> wait = new FluentWait<>(driver)
				    	            .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
				    	            .pollingEvery(Duration.ofSeconds(2))  // Polling interval
				    	            .ignoring(NoSuchElementException.class);  // Exceptions to ignore

				    	    try {
				    	        // Wait until the element is clickable
				    	        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(tryAgainButtonCardNumberInvalid));

				    	        // Scroll the element into view using JavaScript
				    	        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);

				    	        // Click the element
				    	        element.click();
				    	        System.out.println("Clicked on Try Again button successfully.");
				    	    } catch (Exception e) {
				    	        System.err.println("An error occurred while clicking on the Try Again button: " + e.getMessage());
				    	        Assert.fail("An error occurred while clicking on the Try Again button: " + e.getMessage());
				    	    }
				    }
				    

				public void verifyErrorMessage(String expectedErrorMessage) {
					
				        FluentWait<WebDriver> wait = new FluentWait<>(driver)
				                .withTimeout(Duration.ofSeconds(30))
				                .pollingEvery(Duration.ofMillis(500))
				                .ignoring(NoSuchElementException.class)
				                .ignoring(StaleElementReferenceException.class);

				        try {
				            WebElement errorElement = wait.until(new Function<WebDriver, WebElement>() {
				                public WebElement apply(WebDriver driver) {
				                    return errormsgforinvalidCardNumber;
				                }
				            });

				            String actualErrorMessage = errorElement.getText().trim();
				            Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "Error message mismatch");
				            System.out.println("Error message matches: " + actualErrorMessage);
				        } catch (TimeoutException e) {
				            System.err.println("Timeout waiting for error message element: " + e.getMessage());
				            Assert.fail("An error occurred during error message verification: Timeout waiting for element.");
				        } catch (Exception e) {
				            System.err.println("An error occurred during error message verification: " + e.getMessage());
				            Assert.fail("An unexpected error occurred during error message verification: " + e.getMessage());
				        }
				    }
				
				
					
				}
				    
				
				
				
		
	
	


