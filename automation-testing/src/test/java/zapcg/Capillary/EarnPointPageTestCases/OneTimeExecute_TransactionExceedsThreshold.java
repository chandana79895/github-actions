package zapcg.Capillary.EarnPointPageTestCases;

import static org.testng.Assert.assertTrue;

import java.time.Duration;

import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.earnPointsPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberDetailsPage;
import zapcg.Capillary.PageObject.memberLookupPage;

@Listeners(zapcg.Capillary.ListenersConfiguration.Listeners.class)			

public class OneTimeExecute_TransactionExceedsThreshold extends BaseTest {
	
	public loginPage lp;
	 public String currentBrowser;
	 memberDetailsPage	mdp=new memberDetailsPage(driver);
	 earnPointsPage epp=new earnPointsPage(driver);
	 memberLookupPage mlp=new memberLookupPage(driver);
	
	 @BeforeMethod
		@Parameters({"browser", "deviceName"})
	   public void initialize(String browser, String deviceName) throws InterruptedException {
		 	setUp(browser, deviceName); // Use the setup method to initialize the browser
	       initialization(browser);
	       driver.get(baseUrl);
	       Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests
	     
	       lp = new loginPage(driver);
	       mlp = new memberLookupPage(driver);
	       mdp=new memberDetailsPage(driver);
	       epp=new earnPointsPage(driver);
	       
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
	       mlp.enterMemberId("GT000003673");
	       mlp.clickOnSearchButton();
	      
	      mdp.clickOnEnterReceiptButton();
	    
	        	
	        	
	 }
	       
	   
	 
	 @Test(priority=1, groups={"OneTimeExecution"})
	 public void TransactionExceedsThreshold() {
		 
		  int transactionAmount = 200001; 
	       epp.enterTransactionAmount(transactionAmount);
	       epp.clickOnSubmitButton();


	        // Verify if the threshold message is displayed only if the amount exceeds the threshold
	        if (transactionAmount > 200000) {
		        String expectedPartialMessage = " The transaction has been submitted for approval";
	            
	            // Use FluentWait to wait for the success message element to be visible
	            FluentWait<WebDriver> wait = new FluentWait<>(driver)
	                    .withTimeout(Duration.ofSeconds(30))
	                    .pollingEvery(Duration.ofMillis(500))
	                    .ignoring(NoSuchElementException.class)
	                    .ignoring(StaleElementReferenceException.class);

	            try {
	                WebElement successMsg = wait.until(ExpectedConditions.visibilityOf(epp.thresholdSuccessMessage));
	                String actualValidationMessage = successMsg.getText();
	                System.out.println("Actual validation message if Threshold value exceeded: " + actualValidationMessage);

	                boolean isMessageDisplayed = actualValidationMessage.contains(expectedPartialMessage);

	                // Print the result
	                if (isMessageDisplayed) {
	                    System.out.println("Test Passed: Threshold message is displayed correctly.");
	                } else {
	                    System.out.println("Test Failed: Threshold message is not displayed correctly.");
	                    System.out.println("Expected partial message: " + expectedPartialMessage);
	                }

	                // Assert to ensure test fails in case the message is not displayed correctly
	                assertTrue(isMessageDisplayed, "Expected threshold message was not displayed correctly.");
	            } catch (TimeoutException e) {
	                System.out.println("Timeout waiting for success message element: " + e.getMessage());
	                assertTrue(false, "Timeout waiting for success message element.");
	            } catch (Exception e) {
	                System.out.println("An error occurred while verifying the success message: " + e.getMessage());
	                assertTrue(false, "An error occurred while verifying the success message: " + e.getMessage());
	            }
	        } else {
	            System.out.println("Transaction amount is within the threshold limit. No message should be displayed.");
	        }

}}
