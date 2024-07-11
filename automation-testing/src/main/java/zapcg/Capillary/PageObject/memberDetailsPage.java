package zapcg.Capillary.PageObject;

import java.time.Duration;
import java.util.function.Function;


import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class memberDetailsPage {
	
	
	
	
public WebDriver driver;

	
	@FindBy(xpath="//div[@id='MDCONT']")
	WebElement memberDetailsPageContainer;
	
	@FindBy(xpath="//div[@id='MDMBRC']")
	WebElement memberDetailsSection;
	
	@FindBy(xpath="//h2[@id='MDMBRCNM']")
	WebElement memberName;
	
	@FindBy(xpath="//h3[@id='MDMBRCPT']")
	WebElement availablePoints;
	
	@FindBy(xpath="//h6[@id='MDMBRCMID']")
	WebElement membershipId;
	
	@FindBy(xpath="//h6[@id='MDMBRCPEX']")
	WebElement pointsExpiryDate;
	
	@FindBy(xpath="//button[@id='MD025B']")
	WebElement enterReceiptDetailsButton;
	
	@FindBy(xpath="//button[@id='MDMENUI2']")
	WebElement hyperlinkbutton;
	
	@FindBy(xpath="//button[@id='MDMENUI3']")
	WebElement hamburgerIconMemberOnMemberDetailsPage;
	
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI0']")
	  WebElement hamburgerIconMemberLookupOption;
	    
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI1']")
	 WebElement hamburgerIconLocationOption;
	 
	 @FindBy(xpath="//div[@id='MENMODHI2']")
	 WebElement hamburgerLanguagePreference;
	 
	 @FindBy(xpath="//div[@id='MENMODLI0']/p[contains(text(), '日本語')]")
	 WebElement chooseJapaneseLanguage;
	    
	 @FindBy(xpath="//ul/li/div[@id='MENMODHI3']")
	WebElement logoutFromMemberDetailsScreen;
	 
	 @FindBy(xpath="//div[@id='LSCONT']")
	 WebElement navigatedFromMemberDetailsToLocation;
	 
	 @FindBy(xpath="//div[@id='MSCONT']")
	 WebElement navigatedFromMemberDetailsToMemeberLookup;
	
	 
	 @FindBy(xpath="//div[@id='LSCONT']")
	 WebElement naviagtedToLoginPage;
	 
	 
	
	
	 
	 @FindBy(xpath="//button[@id='MDMENUI1']")
	 WebElement backButton;
	
	private By memberDetailsSectionLocator = By.xpath("//div[@id='MDMBRC']"); 
    private By memberNameLocator = By.xpath("//h2[@id='MDMBRCNM']"); 
    private By availablePointsLocator = By.xpath("//h3[@id='MDMBRCPT']"); 
    private By membershipIdLocator = By.xpath("//h6[@id='MDMBRCMID']");
    private By pointsExpiryDateLocator = By.xpath("//h6[@id='MDMBRCPEX']"); 
   // private By textToVerifyJapaneseLanguage=By.xpath("//h3[//text()[normalize-space() = '有効ポイント']]");


	
	
	//Initializing the Page Objects:
			public memberDetailsPage(WebDriver driver){
				this.driver=driver;
				PageFactory.initElements(driver, this);
			}
			
			public void verifySuccessfullNavigationFromMemberLookupToMemberDetailsPage(WebDriver driver) {
				try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			        // Wait for the URL to change to the expected URL
			        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(memberDetailsPageContainer));

			        if (pageLoaded != null && pageLoaded.isDisplayed()) {
			        	// Page is successfully loaded if the WebElement is visible
			            System.out.println("Successfully navigated to the MemberDetails screen");
			        } else {
			            System.out.println("The expected element did not become visible within the timeout period");
			            Assert.fail("Navigation from member lookup screen to member details screen was not successful as the expected element did not become visible.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during navigation: " + e.getMessage());
			        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
			    }
				
			}
			
			
			
			public void verifyMemberDetailsDisplaying(WebDriver driver) {
				try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			        // Wait for the URL to change to the expected URL
			        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(memberDetailsSection));

			        if (pageLoaded != null && pageLoaded.isDisplayed()) {
			        	// Page is successfully loaded if the WebElement is visible
			            System.out.println("Member details are displaying");
			        } else {
			            System.out.println("The expected element did not become visible within the timeout period");
			            Assert.fail("Member details are not displaying");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred on Member details screen: " + e.getMessage());
			        Assert.fail("An error occurred during Member details verifiaction: " + e.getMessage());
			    }
				
			}
			
			public void verifyTheMemberDetailsContentDisplaying(WebDriver driver) {
				
				
				
				FluentWait<WebDriver> wait = new FluentWait<>(driver)
		                .withTimeout(Duration.ofSeconds(30))
		                .pollingEvery(Duration.ofMillis(500))
		                .ignoring(NoSuchElementException.class)
		                .ignoring(StaleElementReferenceException.class);

		        try {
		            // Wait for the elements to be visible using Fluent Wait
		            WebElement memberDetailsSection = wait.until(new Function<WebDriver, WebElement>() {
		                public WebElement apply(WebDriver driver) {
		                    return driver.findElement(memberDetailsSectionLocator);
		                }
		            });

		            WebElement memberName = wait.until(new Function<WebDriver, WebElement>() {
		                public WebElement apply(WebDriver driver) {
		                    return driver.findElement(memberNameLocator);
		                }
		            });

		            WebElement availablePoints = wait.until(new Function<WebDriver, WebElement>() {
		                public WebElement apply(WebDriver driver) {
		                    return driver.findElement(availablePointsLocator);
		                }
		            });

		            WebElement membershipId = wait.until(new Function<WebDriver, WebElement>() {
		                public WebElement apply(WebDriver driver) {
		                    return driver.findElement(membershipIdLocator);
		                }
		            });

		            WebElement pointsExpiryDate = wait.until(new Function<WebDriver, WebElement>() {
		                public WebElement apply(WebDriver driver) {
		                    return driver.findElement(pointsExpiryDateLocator);
		                }
		            });

		            // Verify that all the elements are displayed and print their details
		            if (memberDetailsSection.isDisplayed() && memberName.isDisplayed() && availablePoints.isDisplayed() && membershipId.isDisplayed() && pointsExpiryDate.isDisplayed()) {
		                System.out.println("Member details are displaying.");
		                System.out.println("Member Name: " + memberName.getText());
		                System.out.println("Available Points: " + availablePoints.getText());
		                System.out.println("Membership ID: " + membershipId.getText());
		                System.out.println("Points Expiry Date: " + pointsExpiryDate.getText());
		            } else {
		                System.out.println("Some expected elements did not become visible within the timeout period.");
		                Assert.fail("Member details are not fully displaying.");
		            }
		        } catch (TimeoutException e) {
		            System.err.println("Timeout waiting for member details elements: " + e.getMessage());
		            Assert.fail("An error occurred during Member details verification: Timeout waiting for elements.");
		        } catch (Exception e) {
		            System.err.println("An unexpected error occurred during Member details verification: " + e.getMessage());
		            Assert.fail("An unexpected error occurred during Member details verification: " + e.getMessage());
		        }
				 /*
				 WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
			        WebElement memberDetailsSection = null;
			        WebElement memberName = null;
			        WebElement availablePoints = null;
			        WebElement membershipId = null;
			        WebElement pointsExpiryDate = null;
			        
			        try {
			            // Wait for the elements to be visible and catch any exceptions
			            memberDetailsSection = wait.until(ExpectedConditions.visibilityOfElementLocated(memberDetailsSectionLocator));
			            memberName = wait.until(ExpectedConditions.visibilityOfElementLocated(memberNameLocator));
			            availablePoints = wait.until(ExpectedConditions.visibilityOfElementLocated(availablePointsLocator));
			            membershipId = wait.until(ExpectedConditions.visibilityOfElementLocated(membershipIdLocator));
			            pointsExpiryDate = wait.until(ExpectedConditions.visibilityOfElementLocated(pointsExpiryDateLocator));
			            
			            // Verify that all the elements are displayed and print their details
			            if (memberDetailsSection.isDisplayed() && memberName.isDisplayed() && availablePoints.isDisplayed() && membershipId.isDisplayed() && pointsExpiryDate.isDisplayed()) {
			                System.out.println("Member details are displaying.");
			                System.out.println("Member Name: " + memberName.getText());
			                System.out.println("Available Points: " + availablePoints.getText());
			                System.out.println("Membership ID: " + membershipId.getText());
			                System.out.println("Points Expiry Date: " + pointsExpiryDate.getText());
			            } else {
			                System.out.println("Some expected elements did not become visible within the timeout period.");
			                Assert.fail("Member details are not fully displaying.");
			            }
			        } catch (Exception e) {
			            if (memberDetailsSection == null || !memberDetailsSection.isDisplayed()) {
			                System.out.println("Member details section is not visible.");
			            }
			            if (memberName == null || !memberName.isDisplayed()) {
			                System.out.println("Member name is not visible.");
			            }
			            if (availablePoints == null || !availablePoints.isDisplayed()) {
			                System.out.println("Available points are not visible.");
			            }
			            if (membershipId == null || !membershipId.isDisplayed()) {
			                System.out.println("Membership ID is not visible.");
			            }
			            if (pointsExpiryDate == null || !pointsExpiryDate.isDisplayed()) {
			                System.out.println("Points expiry date is not visible.");
			            }
			            System.out.println("An error occurred on Member details screen: " + e.getMessage());
			            Assert.fail("An error occurred during Member details verification: " + e.getMessage());
			        }
			*/
				
		

			}
			
			
			public void clickOnEnterReceiptButton() {
				// Create an instance of WebDriverWait with a timeout of 10 seconds
	            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

	            // Wait for the login button to be clickable (enabled)
	            WebElement clickOnEnterReceiptButton = wait.until(ExpectedConditions.elementToBeClickable(enterReceiptDetailsButton));
	            clickOnEnterReceiptButton.click();
	            
	            
			}
			
			
			 public void verifyEnterReceiptButtonEnabled() {
					
					
					try {

			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the login button to be clickable (enabled)
			            WebElement enabledEnterReceiptButton = wait.until(ExpectedConditions.elementToBeClickable(enterReceiptDetailsButton));

			            // Assert that the login button is enabled
			            if (enabledEnterReceiptButton.isEnabled()) {
			                System.out.println("Enter Receipt details button is enabled and clickable");
			            } else {
			                System.out.println("Enter Receipt button is NOT enabled.");
			            }
			            Assert.assertTrue(enabledEnterReceiptButton.isEnabled(), "Enter Receipt details button is not enabled.");

			        } catch (TimeoutException e) {
			            System.out.println("Enter Receipt details button is not clickable within the timeout period.");
			            Assert.fail("Enter Receipt details button is not clickable within the timeout period.");
			       
			        } catch (NoSuchElementException e) {
			            System.out.println("Enter Receipt details button element was not found on the page.");
			            Assert.fail("Enter Receipt details button element was not found on the page.");
			       
			        }catch (Exception e) {
			            System.out.println("An unexpected error occurred: " + e.getMessage());
			            Assert.fail("An unexpected error occurred: " + e.getMessage());
			        }
			   }
			
			 public void clickOnHyperlink() {
				 hyperlinkbutton.click();
			    	
			    }
			    
			 
			 
			 public void headerHyperlinkVerificationOnMemberDetailsScreen(WebDriver driver) {
			    	
				 try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberDetailsToLocation));

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
			 
			 //Expected behavior not yet decided
			 /*
			 public void pointsAreExpired(WebDriver driver)
			 {
				 try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

			            // Wait for the points expiry date element to be visible
			            WebElement pointsExpiryDateElement = wait.until(ExpectedConditions.visibilityOfElementLocated(pointsExpiryDateLocator));
			            String expiryDateString = pointsExpiryDateElement.getText();
			            
			            // Parse the expiry date string to LocalDate
			            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd"); // Adjust the pattern based on your date format
			            LocalDate expiryDate = LocalDate.parse(expiryDateString, formatter);

			            // Get the current system date
			            LocalDate currentDate = LocalDate.now();

			            // Check if the expiry date is equal to the current date
			            if (expiryDate.equals(currentDate)) {
			                // Wait for the redeem points button to be visible
			                WebElement redeemPointsButton = wait.until(ExpectedConditions.visibilityOfElementLocated(redeemPointsButtonLocator));

			                // Verify that the redeem points button is not enabled
			                if (!redeemPointsButton.isEnabled()) {
			                    System.out.println("Redeem Points button is disabled as expected because points expiry date is today.");
			                } else {
			                    System.out.println("Redeem Points button is enabled, which is not expected when points expiry date is today.");
			                    Assert.fail("Redeem Points button is enabled even though points expiry date is today.");
			                }
			            } else {
			                System.out.println("Points expiry date is not today. No need to check the redeem points button.");
			            }
			        } catch (TimeoutException e) {
			            System.out.println("Points expiry date or redeem points button is not visible within the timeout period.");
			            Assert.fail("Points expiry date or redeem points button is not visible within the timeout period.");
			        } catch (NoSuchElementException e) {
			            System.out.println("Points expiry date or redeem points button element was not found on the page.");
			            Assert.fail("Points expiry date or redeem points button element was not found on the page.");
			        } catch (Exception e) {
			            System.out.println("An unexpected error occurred: " + e.getMessage());
			            Assert.fail("An unexpected error occurred: " + e.getMessage());
			        }
			    
				 
			 }*/
			 
			 public void clickOnHamburgerIcon()
			    {
			    	
				 try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconMemberOnMemberDetailsPage));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Hamburger icon clicked successfully.");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the hamburger icon on Member details page: " + e.getMessage());
			            throw e;
			        }
			    
			    }
			    
			    public void chooseMemberLookupOption() {
			    
			    	try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconMemberLookupOption));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Member lookup option from Hamburger icon clicked successfully.");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the lookup option from hamburger icon on Member details page: " + e.getMessage());
			            throw e;
			        }
			    	
			    	
			    }
			    
			    public void chooseLocationFromHamburger() {
			    	
			    	try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(hamburgerIconLocationOption));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Location option from Hamburger icon clicked successfully.");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the Location option from hamburger icon on Member details page: " + e.getMessage());
			            throw e;
			        }
			    }
			    
			    
			    public void chooseLanguagePreferenceOptionFromHamburger() {
			    	
			    	try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(hamburgerLanguagePreference));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Language preference option from Hamburger icon clicked successfully.");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the Language preference option from hamburger icon on Member details page: " + e.getMessage());
			            throw e;
			        }
			    	
			    }
			    
			    
			    public void chooseJapaneseLanguageOptionFromLanguagePreference() {
			    	
			    	try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(chooseJapaneseLanguage));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Able to choose Japanese language");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the Japanese language from Language preference option on Member details page: " + e.getMessage());
			            throw e;
			        }
			    	
			    }
			    
			    /*
			    
			    public void verifyJapaneseLanguageChangedFromEnglish() {
			    	try {
			    	
			    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

		            // Wait for the language selector to be clickable and click it
		            WebElement languageSelector = wait.until(ExpectedConditions.elementToBeClickable(hamburgerLanguagePreference));
		            languageSelector.click();

		            // Wait for the Japanese language option to be clickable and click it
		            WebElement japaneseOption = wait.until(ExpectedConditions.elementToBeClickable(chooseJapaneseLanguage));
		            japaneseOption.click();

		            // Verify that the page text changes to Japanese
		            WebElement textToVerify = wait.until(ExpectedConditions.visibilityOfElementLocated(textToVerifyJapaneseLanguage));
		            String expectedJapaneseText = "有効ポイント"; 
		            String actualText = textToVerify.getText();

		            Assert.assertEquals(actualText, expectedJapaneseText, "The page text did not change to the expected Japanese text.");

		            System.out.println("Language changed to Japanese successfully.");
		        } catch (Exception e) {
		            System.out.println("An error occurred while changing the language: " + e.getMessage());
		            Assert.fail("An error occurred while changing the language: " + e.getMessage());
		        }
			    }
			    */	
			    	
			    
			    
			    public void chooseLogout()
				{
					
					try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(logoutFromMemberDetailsScreen));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Logout option from Hamburger icon clicked successfully.");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the Logout option from hamburger icon on Member details page: " + e.getMessage());
			            throw e;
			        }
				}
			
			    public void clickOnBackButton() {
			    	try {
			            // Create an instance of WebDriverWait with a timeout of 10 seconds
			            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

			            // Wait for the hamburger icon to be clickable
			            WebElement hamburgerIcon = wait.until(ExpectedConditions.elementToBeClickable(backButton));

			            // Click on the hamburger icon
			            hamburgerIcon.click();
			            System.out.println("Back button clicked successfully from Member details page.");
			        } catch (Exception e) {
			            System.out.println("Failed to click on the Back buton option on Member details page: " + e.getMessage());
			            throw e;
			        }
			    	
			    }
			    
			    public void verifySuccessfullNavigationForBackButton(WebDriver driver) {
			    	try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL: navigatedFromMemberLookupToMemeberLookup
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberDetailsToMemeberLookup));

				        if (pageLoaded != null && pageLoaded.isDisplayed()) {
				        	// Page is successfully loaded if the WebElement is visible
				            System.out.println("Successfully navigated to the member lookup screen");
				        } else {
				            System.out.println("The expected element did not become visible within the timeout period");
				            Assert.fail("Navigation from member details screen to Member lookup screen was not successful as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during navigation: " + e.getMessage());
				        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
				    }
					
					
				}

			    public void verifySuccessfullNavigationFromMemberDetailsToMemberLookupScreen(WebDriver driver) {
			    	try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL: navigatedFromMemberLookupToMemeberLookup
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberDetailsToMemeberLookup));

				        if (pageLoaded != null && pageLoaded.isDisplayed()) {
				        	// Page is successfully loaded if the WebElement is visible
				            System.out.println("Successfully navigated to the member lookup screen");
				        } else {
				            System.out.println("The expected element did not become visible within the timeout period");
				            Assert.fail("Navigation from member details screen to Member lookup screen was not successful as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during navigation: " + e.getMessage());
				        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
				    }
					
				}
			    
			    public void verifySuccessfullNavigationFromMemberDetailsToLocationScreen(WebDriver driver) {
			    	try {
						// Create an instance of WebDriverWait with a timeout of 10 seconds
				        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

				        // Wait for the URL to change to the expected URL//navigatedFromMemberLookupToLocation
				        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(navigatedFromMemberDetailsToLocation));

				        if (pageLoaded != null && pageLoaded.isDisplayed()) {
				        	// Page is successfully loaded if the WebElement is visible
				            System.out.println("Successfully navigated to the Location screen");
				        } else {
				            System.out.println("The expected element did not become visible within the timeout period");
				            Assert.fail("Navigation from member details screen to Location screen was not successful as the expected element did not become visible.");
				        }
				    } catch (Exception e) {
				        System.out.println("An error occurred during navigation: " + e.getMessage());
				        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
				    }
			    }
					
						public void verifyLogoutOptionOnMemberDetailsScreen(WebDriver driver) {
				    	
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
						            Assert.fail("Navigation from member details screen to Login screen was not successful as the expected element did not become visible.");
						        }
						    } catch (Exception e) {
						        System.out.println("An error occurred during navigation: " + e.getMessage());
						        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
						    }
						
						
				    	
				    	
				    }
						
						
						
						public int getTotalEarningPoints() {
					        // Get displayed total earning points
					      
					        String totalEarningPointsText = availablePoints.getText().trim();

					        // Remove any non-numeric characters (including currency symbols)
					        totalEarningPointsText = totalEarningPointsText.replaceAll("[^0-9]", "");

					        // Parse as integer
					        return Integer.parseInt(totalEarningPointsText);
					    }
			

}
