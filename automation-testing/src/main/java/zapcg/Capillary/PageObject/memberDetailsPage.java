package zapcg.Capillary.PageObject;

import java.time.Duration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class memberDetailsPage {
	
	
	
	
public WebDriver driver;

	
	@FindBy(xpath="//div[@id='MDCONT']")
	WebElement memberDetailsPageContainer;
	
	
	
	
	
	
	//Initializing the Page Objects:
			public memberDetailsPage(WebDriver driver){
				this.driver=driver;
				PageFactory.initElements(driver, this);
			}
			
			public void verifySuccessfullNavigationFromMemberLookupToMemberDetailsPage(WebDriver driver, String expectedUrl) {
				try {
					// Create an instance of WebDriverWait with a timeout of 10 seconds
			        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

			        // Wait for the URL to change to the expected URL
			        WebElement pageLoaded = wait.until(ExpectedConditions.visibilityOf(memberDetailsPageContainer));

			        if (pageLoaded != null) {
			        	// Page is successfully loaded if the WebElement is visible
			            System.out.println("Successfully navigated to the desired screen, element is visible.");
			        } else {
			            System.out.println("The expected element did not become visible within the timeout period, login unsuccessful.");
			            Assert.fail("Navigation from member lookup screen to member details screen was not successful as the expected element did not become visible.");
			        }
			    } catch (Exception e) {
			        System.out.println("An error occurred during navigation: " + e.getMessage());
			        Assert.fail("An error occurred during navigation verification: " + e.getMessage());
			    }
				
			}
			
			
		

			
			
			
			

}
