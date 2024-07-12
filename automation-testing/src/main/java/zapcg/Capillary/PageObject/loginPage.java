package zapcg.Capillary.PageObject;

import static org.testng.Assert.assertEquals;


import java.time.Duration;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;

import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;

import org.testng.Assert;



public class loginPage{
	public WebDriver driver;


	@FindBy(css = "div#LGMENUI0.button")
	WebElement defaultLanguageChange;
	//LGMENUI0
	//@FindBy(xpath="//div[@id='LGMENUI0']")
	//WebElement defaultLanguageChange;
	
	@FindBy(xpath="//p[contains(text(),'English')]")
	WebElement chooseEnglish;
	
	@FindBy(xpath="//input[@placeholder='Enter Employee ID']")
	WebElement username;
	
	@FindBy(xpath="//input[@placeholder='Enter Password']")
	WebElement password;
	
	@FindBy(xpath="//button[@id='LS004B']")
	WebElement loginBtn;
	
	@FindBy(xpath="//img[@alt=\"Logo\" and @src=\"/assets/goToPass-B2w-ePiW.svg\"]")
	WebElement storePortalLogo;
	
	@FindBy(xpath="//h6[contains(text(),'Invalid username or password. Try again.')]")  //@id='LSERRM' and
	WebElement errormsgforinvalidusername;  
	
	@FindBy(xpath="//h6[@id='LSERRM' and contains(text(),'Invalid username or password. Try again.')]")
	WebElement errormsgforinvalidpassword;
	
	@FindBy(xpath="//h6[@id='LSERRM' and contains(text(),\"Username must be less than 50 characters\")]")
	WebElement errormsgforexceedingusernamelength;
	
	@FindBy(xpath="//h6[@id='LSERRM' and contains(text(),\"Password must be at least 8 characters\")]")
	WebElement errormsgforminpasswordlength;
	
	@FindBy(xpath="//div/h6[@id='LSERRM' and contains(text(),\"Username must not contain any spaces\")]")
	WebElement spacenotallowedinusername;
	
	@FindBy(xpath="//div/h6[@id='LSERRM' and contains(text(),\"Your account is locked. Ask your manager for unlock the account.\")]")//xpath for lockout message
	WebElement lockoutmsg;
	
	@FindBy(xpath="//div[@id='LSCONT']")
	WebElement locationPageFromLoginPage;
	
	@FindBy(xpath="//div[@id='MSCONT']")
	WebElement memberLookupPageFromLoginPage;
	
	
	//Initializing the Page Objects:
		public loginPage(WebDriver driver){
			this.driver=driver;
			PageFactory.initElements(driver, this);
			
		}
		
		public void changeDefaultLanguage()
		{ 
			  System.out.println("Now we will try to change the default language to English language");
			 WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));

			    try {
			        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(defaultLanguageChange));
			        element.click();
			        System.out.println("Clicked on default language change element.");

			    } catch (Exception e) {
			        System.err.println("Error clicking on default language change element: " + e.getMessage());
			        Assert.fail("Failed to click on default language change element.");
			    }
			    System.out.println("Able to change the default language to English language");
			
			/*
			int maxRetries = 3; // Maximum number of retries for handling stale element
	        int retries = 0;
	        boolean success = false;

	        while (retries < maxRetries && !success) {
	            try {
	                // Configure FluentWait
	                Wait<WebDriver> wait = new FluentWait<>(driver)
	                        .withTimeout(Duration.ofSeconds(40))  // Maximum wait time
	                        .pollingEvery(Duration.ofSeconds(5))  // Polling interval
	                        .ignoring(NoSuchElementException.class) // Ignoring NoSuchElementException
	                        .ignoring(StaleElementReferenceException.class); // Ignoring StaleElementReferenceException

	                // Wait for the element to be clickable
	                WebElement element = wait.until(ExpectedConditions.elementToBeClickable(defaultLanguageChange));

	                // Perform action on the element
	                element.click();
	                success = true; // If execution reaches here, it means the operation was successful

	            } catch (StaleElementReferenceException e) {
	                System.err.println("Encountered StaleElementReferenceException. Retrying... (" + (retries + 1) + "/" + maxRetries + ")");
	                retries++;
	                if (retries >= maxRetries) {
	                    Assert.fail("Failed due to repeated StaleElementReferenceException.");
	                }
	            } catch (NoSuchElementException e) {
	                System.err.println("The default language change element was not found: " + e.getMessage());
	                Assert.fail("The default language change element was not found.");
	                
	            } catch (Exception e) {
	                System.err.println("An unexpected error occurred: " + e.getMessage());
	                Assert.fail("An unexpected error occurred.");
	            }
	        }*/
		}
		
		public void chooseEnglishLanguage()
		{
			FluentWait<WebDriver> wait = new FluentWait<>(driver)
		            .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
		            .pollingEvery(Duration.ofSeconds(2))  // Polling interval
		            .ignoring(NoSuchElementException.class);  // Exceptions to ignore

		        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(chooseEnglish));
		        element.click();
			
		}
		
		public void login(String user, String pass) {
			try {
		        username.sendKeys(user);
		        password.sendKeys(pass);
		        loginBtn.click();
		    } catch (NoSuchElementException e) {
		        throw new RuntimeException("One of the elements (username, password, or login button) could not be found. Please check the xpaths.", e);
		    } catch (Exception e) {
		    
		        throw new RuntimeException("An unexpected error occurred during the login process.", e);
		    }
		   
	    }
		
		public void loginLockOutCase(String user, String pass)
		{
			try {
		        username.sendKeys(user);
		        password.sendKeys(pass);
		       
		        for(int j=0;j<6;j++) {
		         Thread.sleep(3000);
		        loginBtn.click();
		        }
		    } catch (NoSuchElementException e) {
		        throw new RuntimeException("One of the elements (username, password, or login button) could not be found. Please check the xpaths.", e);
		    } catch (Exception e) {
		    
		        throw new RuntimeException("Something wrong", e);
		    }
		}
		
		
		
		public void loginDisabledVerification(String user, String pass)
		{
			try {
		        username.sendKeys(user);
		        password.sendKeys(pass);
		        
		    } catch (NoSuchElementException e) {
		        throw new RuntimeException("One of the elements (username, password, or login button) could not be found. Please check the xpaths.", e);
		    } catch (Exception e) {
		    
		        throw new RuntimeException("Something wrong", e);
		    }
		}
		
		public void verifySuccessfullLogin(WebDriver driver, String expectedUrl) {
			try {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
		        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the URL to change to the expected URL
		        boolean isUrlChanged = wait.until(ExpectedConditions.urlToBe("https://d3che4praaad7h.cloudfront.net/member-search"));

		        if (isUrlChanged) {
		            String currentUrl = driver.getCurrentUrl();
		            System.out.println("After successful login, navigated to the Location screen: " + currentUrl);
		            String expectedUrl1 = "https://d3che4praaad7h.cloudfront.net/member-search";
		            Assert.assertEquals(currentUrl, expectedUrl1, "The URL after login is incorrect. Login not successful.");
		        } else {
		            System.out.println("The URL did not change to the expected URL within the timeout period.i.e, no success login,");
		            Assert.fail("Login was not successful as the URL did not change to the expected URL.");
		        }
		    } catch (Exception e) {
		        System.out.println("An error occurred during login verification: " + e.getMessage());
		        Assert.fail("An error occurred during login verification: " + e.getMessage());
		    
			}
			
		}
		
		public void verifyInvalidUserNameError(String expectedErrorMessage) {
			
			try {
				
				FluentWait<WebDriver> wait = new FluentWait<>(driver)
					    .withTimeout(Duration.ofSeconds(30))
					    .pollingEvery(Duration.ofSeconds(1))
					    .ignoring(NoSuchElementException.class);
				

				// Define the locator for the error message
				By errormsgforinvalidusername = By.id("LSERRM"); // Replace with your actual locator

				// Wait for the error message element to be visible
				WebElement errorMsgElement = wait.until(ExpectedConditions.presenceOfElementLocated(errormsgforinvalidusername));
				boolean isErrorDisplayed = errorMsgElement.isDisplayed();
				if (isErrorDisplayed) {
		            System.out.println("Error message is displayed.");
		        } else {
		            System.out.println("Error message is not displayed.");
		        }
				
		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message for Invalid Username:" +actualErrorMessage);
		        
		        
		    } catch (NoSuchElementException e) {
		        System.out.println("The error message element was not found on the page.");
		        Assert.fail("The error message element was not found on the page.");
		    }
	        
	    }

		public void verifyInvalidPasswordError(String expectedErrorMessage) {
			
			try {
				FluentWait<WebDriver> wait = new FluentWait<>(driver)
					    .withTimeout(Duration.ofSeconds(30))
					    .pollingEvery(Duration.ofSeconds(1))
					    .ignoring(NoSuchElementException.class);
				

				// Define the locator for the error message
				By errormsgforinvalidpassword = By.id("LSERRM"); // Replace with your actual locator

				// Wait for the error message element to be visible
				WebElement errorMsgElement = wait.until(ExpectedConditions.presenceOfElementLocated(errormsgforinvalidpassword));
				boolean isErrorDisplayed = errorMsgElement.isDisplayed();
				if (isErrorDisplayed) {
		            System.out.println("Error message is displayed.");
		        } else {
		            System.out.println("Error message is not displayed.");
		        }
		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message for Invalid Password:" +actualErrorMessage);
		        
		        	
			}
			
			catch(NoSuchElementException e) {
				 System.out.println("The error message element was not found on the page.");
			        Assert.fail("The error message element was not found on the page.");

			}
	
	    }
		
		
		
		
		public void verifyMaxLengthForUserName(String expectedErrorMessage) {
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(errormsgforexceedingusernamelength));

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
		
		public void verifyMinLengthForPassword(String expectedErrorMessage) {
			
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(errormsgforminpasswordlength));

		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message for min password length:" +actualErrorMessage);
		        
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
		
		public void verifySpaceNotAllowedUserName(String expectedErrorMessage) {
			
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(spacenotallowedinusername));

		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message for space not allowed in username:" +actualErrorMessage);
		        
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
		
		
		public void verifyLoginButtonEnabled() {
			
			
			try {

	            // Create an instance of WebDriverWait with a timeout of 10 seconds
	            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

	            // Wait for the login button to be clickable (enabled)
	            WebElement enabledLoginButton = wait.until(ExpectedConditions.elementToBeClickable(loginBtn));

	            // Assert that the login button is enabled
	            if (enabledLoginButton.isEnabled()) {
	                System.out.println("The login button is enabled.");
	            } else {
	                System.out.println("The login button is NOT enabled.");
	            }
	            Assert.assertTrue(enabledLoginButton.isEnabled(), "The login button is not enabled.");

	        } catch (NoSuchElementException e) {
	            System.out.println("The login button element was not found on the page.");
	            Assert.fail("The login button element was not found on the page.");
	        } catch (Exception e) {
	            System.out.println("An unexpected error occurred: " + e.getMessage());
	            Assert.fail("An unexpected error occurred: " + e.getMessage());
	        }
	   }
		
		
		public void verifyLoginButtonDisabled_EmptyUsername() {
		
			try {
					boolean actualValue = loginBtn.isEnabled();
				if (!actualValue)
				       System.out.println("Button is disabled");
				else
				       System.out.println("Button is enabled");
				      
			
	            Assert.assertFalse(actualValue, "The login button should be disabled when the password is empty.");

				}
			
			
				catch(NoSuchElementException e){
				       System.out.println("Exception " + e.getMessage());
				       Assert.fail("Exception: " + e.getMessage());      
				}
			catch (Exception e) {
	            System.out.println("An unexpected error occurred: " + e.getMessage());
	          
	            Assert.fail("An unexpected error occurred: " + e.getMessage());
	        }

            		
}
		
		
		public void verifyLoginButtonDisabled_EmptyPassword() {
			try {
			     
	            Assert.assertFalse(loginBtn.isEnabled(), "The login button should be disabled when the password is empty.");
	            System.out.println("Login button is disabled when username is empty: " + !loginBtn.isEnabled());

	            
	        } catch (NoSuchElementException e) {
	            System.out.println("One of the elements was not found on the page.");
	            Assert.fail("One of the elements was not found on the page.");
	        } catch (Exception e) {
	            System.out.println("An unexpected error occurred: " + e.getMessage());
	            Assert.fail("An unexpected error occurred: " + e.getMessage());
	        }
			
		}
		
		public void verifyLoginButtonDisabled_BlankInput() {
			try {
			     
	            
	            Assert.assertFalse(loginBtn.isEnabled(), "The login button should be disabled when the username and password are empty.");
	            System.out.println("Login button is disabled when username is empty: " + !loginBtn.isEnabled());

	           
	        } catch (NoSuchElementException e) {
	            System.out.println("One of the elements was not found on the page.");
	            Assert.fail("One of the elements was not found on the page.");
	        } catch (Exception e) {
	            System.out.println("An unexpected error occurred: " + e.getMessage());
	            Assert.fail("An unexpected error occurred: " + e.getMessage());
	        }
			
			
		}
		
		
		public void verifyLockOutMessage(String expectedErrorMessage) {
			
			try {
				WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		        // Wait for the error message element to be visible
		        WebElement errorMsgElement = wait.until(ExpectedConditions.visibilityOf(lockoutmsg));

		        // Get the text of the error message and trim it
		        String actualErrorMessage = errorMsgElement.getText().trim();
		        System.out.println("Actual error message LockoutCase: " +actualErrorMessage);
		        
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
		
		
		public boolean validateFortressStorePortalLogo(){
			return storePortalLogo.isDisplayed();
		}
		
		public void enterUserName(String un) {
			username.sendKeys(un);
			}
		
		public void enterPassword(String pwd) {
			password.sendKeys(pwd);
			}
		
		public void clickOnLoginButton() {
			FluentWait<WebDriver> wait = new FluentWait<>(driver)
		            .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
		            .pollingEvery(Duration.ofSeconds(2))  // Polling interval
		            .ignoring(NoSuchElementException.class);  // Exceptions to ignore

		        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(loginBtn));
		        element.click();
			
			
			//loginBtn.click();
			}
	
		public void verifySuccessfullNavigationFromLogin(WebDriver driver) {
			  try {
			        // Create an instance of WebDriverWait with a timeout of 20 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			        // Wait for either locationPageFromLoginPage or memberLookupPageFromLoginPage to be visible
			        boolean locationPageVisible = wait.until(ExpectedConditions.visibilityOf(locationPageFromLoginPage)).isDisplayed();
			        boolean memberLookupPageVisible = wait.until(ExpectedConditions.visibilityOf(memberLookupPageFromLoginPage)).isDisplayed();

			        // Determine which page is visible
			        if (locationPageVisible) {
			            System.out.println("Successfully navigated to the Location screen");
			        } else if (memberLookupPageVisible) {
			            System.out.println("Successfully navigated to the Member Lookup screen");
			        } else {
			            System.out.println("Neither locationPage nor memberLookupPage became visible within the timeout period");
			            Assert.fail("Navigation from login screen was not successful as neither expected element became visible.");
			        }
			    } catch (TimeoutException e) {
			        System.out.println("Timeout waiting for either page to become visible: " + e.getMessage());
			        Assert.fail("Timeout waiting for either page to become visible: " + e.getMessage());
			    } catch (Exception e) {
			        System.out.println("An error occurred during login: " + e.getMessage());
			        Assert.fail("An error occurred during login verification: " + e.getMessage());
			    }
		}

}
