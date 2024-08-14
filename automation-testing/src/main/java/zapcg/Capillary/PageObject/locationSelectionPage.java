package zapcg.Capillary.PageObject;

import java.time.Duration;
import org.openqa.selenium.JavascriptExecutor;
import java.util.List;
import java.util.NoSuchElementException;

import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class locationSelectionPage {
	
	
		WebDriver driver;
		
		@FindBy(id="LS011IN")
		WebElement lookupProperty;
		
		@FindBy(xpath = "//input[@id='LS011IN' and @value='HOTEL MYSTAYS Asakusa']")
	    WebElement lookuppropertyvalue;
		
		//locate the 1st drop down option
		 @FindBy(xpath = "//input[@id='LS011IN' and @value='HOTEL MYSTAYS Asakusa']")
		    List<WebElement> lookupPropertyOptions;
		
		//select dd element: //input[@id=':r5:' and @value='MyStays Akasaka']
		
		@FindBy(id="LS013IN")
		WebElement selectStore;
		
		//locate the 2nd drop down option
		 @FindBy(xpath = "//input[@id='LS013IN' and @value='Front Desk']")
		  WebElement selectStoreValue;
		
		
		//locate the 2nd drop down option
		 @FindBy(xpath = "//input[@id='LS013IN' and @value='Front Desk']")
		    List<WebElement> selectStoreOptions;
		
		@FindBy(xpath="//button[@id='LS014B']")
		WebElement chooseLocationBtn;
		
		// Store selected in location screen should be on the next page MemberLookup screen
	  

	    @FindBy(xpath="//button[@id='MSMENUI2']")
	    WebElement selectedSelectStore;
	    
	    
	    @FindBy(xpath="//button[@id='LSMENUI3']")
	    WebElement hamburgerIcon;
	    
	    
	    @FindBy(xpath="//ul/li/div[@id='MENMODHI0']")
	    WebElement hamburgerIconMemberLookupOption;
	    
	    @FindBy(xpath="//ul/li/div[@id='MENMODHI1']")
	    WebElement hamburgerIconLocationOption;
	    
	    @FindBy(xpath="//ul/li/div[@id='MENMODHI3']")
		WebElement logoutLocationScreen;
	    
	    @FindBy(xpath="//div[@id='MSCONT']")
	    WebElement navigatedToMemberLookupScreen;
	    
	    @FindBy(xpath="//div[@id='LSCONT']")
		 WebElement navigatedFromLocationToLocation;
	    
	    @FindBy(xpath="//div[@id='LSCONT']")
		 WebElement naviagtedToLoginPage;
	    
	    
	    
		//Initializing the Page Objects:
		public locationSelectionPage(WebDriver driver){
			this.driver=driver;
			PageFactory.initElements(driver, this);
		}
		
		
		  // Method to select an option from the first dropdown
	    public void lookupPropertyOptions(String optionText) {
	    	
	    	 WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

	         // Wait for the dropdown to be clickable and then click
	         wait.until(ExpectedConditions.elementToBeClickable(lookupProperty));
	         lookupProperty.click();

	         // Wait for the options to be visible
	         //wait.until(ExpectedConditions.visibilityOfAllElements(lookupPropertyOptions));

	         // Iterate through options and select the desired one
	         for (WebElement option : lookupPropertyOptions) {
	             if (option.getText().equals(optionText)) {
	                 // Wait for the option to be clickable and then click
	                 wait.until(ExpectedConditions.elementToBeClickable(option));
	                 option.click();
	                 break; // Exit loop once the option is found and clicked
	             }
	         }
	     }
	    	
	    	/*
	    	lookupProperty.click();
	        for (WebElement option : lookupPropertyOptions) {
	            if (option.getText().equals(optionText)) {
	                option.click();
	               
	            }
	        } 
	    }*/

	    // Method to select an option from the second dropdown
	    public String selectStoreOptions(String optionText) {
	    	selectStore.click();
	        for (WebElement option : selectStoreOptions) {
	            if (option.getText().equals(optionText)) {
	                option.click();
	               
	            }
	        }
			return optionText;
	    }
	    
	    public static boolean partialMatch(String first, String second) {
	        // Split the first string into parts
	        String[] parts = first.split(" - ");

	        // Check if each part is contained within the second string
	        for (String part : parts) {
	            if (!second.contains(part.trim())) {
	                return false; // If any part is not found, return false
	            }
	        }

	        return true; // All parts matched
	    }
	    
	    
	 // Method to select an option from the second dropdown and print the selected option
	    public void printStoreOptions(String optionText) {
	        selectStore.click();
	        for (WebElement option : selectStoreOptions) {
	            if (option.getText().equals(optionText)) {
	                option.click();
	                System.out.println("Selected option: " + option.getText());
	            }
	        }
	    }
	    
	 // Method to select an option from the second dropdown
	    public String showStoreOptions() {
	    	selectStore.click();
	    	return selectStoreValue.getText();
	    }

		
		public void chooseFromStore()
		{
			selectStore.click();
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

	        // Wait for the error message element to be visible
	        WebElement store = wait.until(ExpectedConditions.visibilityOf((WebElement) selectStoreOptions));

			store.click();
			System.out.println(store);
			
		}
		
		public void clickOnChooseLocationButton() {
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

	        int maxRetries = 3;
	        int retries = 0;
	        boolean success = false;

	        while (retries < maxRetries && !success) {
	            try {
	                // Wait for the element to be clickable
	                WebElement chooseLocationButton = wait.until(ExpectedConditions.elementToBeClickable(chooseLocationBtn));

	                // Scroll the element into view using JavaScript
	                ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", chooseLocationButton);

	                // Use JavaScript to click the element as an alternative
	                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", chooseLocationButton);
	                success = true;

	            } catch (ElementClickInterceptedException e) {
	                System.err.println("Element click intercepted. Retrying... (" + (retries + 1) + "/" + maxRetries + ")");
	                retries++;

	                // Optional: Add a short delay between retries
	                try {
	                    Thread.sleep(1000);
	                } catch (InterruptedException ie) {
	                    Thread.currentThread().interrupt();
	                    Assert.fail("Interrupted while waiting to retry element click.");
	                }

	                if (retries >= maxRetries) {
	                    Assert.fail("Failed to click on the element due to repeated ElementClickInterceptedException.");
	                }
	            }
	        }

	        if (!success) {
	            Assert.fail("Failed to click on the element due to repeated ElementClickInterceptedException.");
	        }
		}
		
		
		
		
		
		// Method to verify dropdown presence
	    public boolean areDropdownsPresent() {
	    	try {
	            return lookupProperty.isDisplayed() && selectStore.isDisplayed();
	        } catch (NoSuchElementException e) {
	            return false;
	        }
	    }
	

		    // Method to check if the navigate button is enabled
		    public boolean isNavigateButtonEnabled() {
		    	
		    	try {
		            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
		            WebElement enabledButton = wait.until(ExpectedConditions.elementToBeClickable(chooseLocationBtn));
		            return enabledButton.isEnabled();
		        } catch (NoSuchElementException e) {
		            return false;
		        } catch (Exception e) {
		            return false;
		        }
		    	
		    	
		    }
		    

		    
		 // Getter method to retrieve the selected option from the second dropdown i.e., store value
		    public String getSelectedSelectStoreOption() {
		        for (WebElement option : selectStoreOptions) {
		            if (option.isSelected()) {
		                return option.getText();
		            }
		        }
		        return null;
		    }
		    
		 
		    
		  //Getter method to retrieve the displayed selected option from the second dropdown on the next page
		    public String getDisplayedSelectedSelectStore() {
		       return selectedSelectStore.getText();
		    }
		    
		    
		    public void clickOnHamburgerIcon() {
		    	Wait<WebDriver> wait = new FluentWait<>(driver)
		                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
		                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
		                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

		            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIcon));
		            element.click();
		    	//hamburgerIcon.click();
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
		    
		    public void chooseLocationOption()
		    {	
		    	Wait<WebDriver> wait = new FluentWait<>(driver)
		                .withTimeout(Duration.ofSeconds(30))  // Maximum wait time
		                .pollingEvery(Duration.ofSeconds(2))  // Polling interval
		                .ignoring(NoSuchElementException.class);  // Exceptions to ignore

		            WebElement element = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconLocationOption));
		            element.click();
		    	//hamburgerIconLocationOption.click();
		    }
		    
		    public void chooseLogout() {
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
		    
		    
		    public void verifySuccessfullNavigationFromLocationToMemberLookupScreen(WebDriver driver) {
		    	try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			        // Wait for the URL to change to the expected URL: navigatedFromMemberLookupToMemeberLookup
			        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedToMemberLookupScreen));

			        if (pageLoaded != null && pageLoaded.isDisplayed()) {
			        	// Page is successfully loaded if the WebElement is visible
			            System.out.println("Successfully navigated to the member lookup screen");
			        } else {
			            System.out.println("The expected element did not become visible within the timeout period");
			            Assert.fail("Navigation from Location screen to Member lookup screen was not successful as the expected element did not become visible.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during navigation: " + e.getMessage());
			        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
			    }
				
			}

		    
		    public void verifySuccessfullNavigationFromLocationToLocationScreen(WebDriver driver) {
		    	try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			        // Wait for the URL to change to the expected URL//navigatedFromMemberLookupToLocation
			        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromLocationToLocation));

			        if (pageLoaded != null && pageLoaded.isDisplayed()) {
			        	// Page is successfully loaded if the WebElement is visible
			            System.out.println("Successfully navigated to the Location screen");
			        } else {
			            System.out.println("The expected element did not become visible within the timeout period");
			            Assert.fail("Navigation to Location screen was not successful as the expected element did not become visible.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during navigation: " + e.getMessage());
			        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
			    }
				
			}
		    
		    
		    
		    public void verifyLogoutOptionOnLocationScreen(WebDriver driver) {
		    	
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
			            Assert.fail("Navigation from Location screen to Login screen was not successful as the expected element did not become visible.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during navigation: " + e.getMessage());
			        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
			    }
		    	
				
		    	
		    	
		    }
		    // Method to click the navigate button
		    public void clickNavigateButton() {
		        if (isNavigateButtonEnabled()) {
		        	chooseLocationBtn.click();
		        }
		    }
		    
		    public void verifySuccessfullNavigationFromLocationTOMemberLookupPage(WebDriver driver) {
				try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			        // Wait for the URL to change to the expected URL
			        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedToMemberLookupScreen));

			        if (pageLoaded != null && pageLoaded.isDisplayed()) {
			        	// Page is successfully loaded if the WebElement is visible
			            System.out.println("Successfully navigated to the MemberLookup screen");
			        } else {
			            System.out.println("The expected element did not become visible within the timeout period");
			            Assert.fail("Navigation from location to member lookup screen was not successful as the expected element did not become visible.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during navigation: " + e.getMessage());
			        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
			    }
				
			}
			
			

			

}