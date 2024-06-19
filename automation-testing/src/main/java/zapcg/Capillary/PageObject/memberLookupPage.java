package zapcg.Capillary.PageObject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

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
	

	
	
	
	//Initializing the Page Objects:
		public memberLookupPage(WebDriver driver){
			this.driver=driver;
			PageFactory.initElements(driver, this);
		}
		


	    public String getHeaderText() {
	        return locationHeader.getText();
	    }
	    
	    public void clickOnScanQRCodeButton()
	    {
	    	scanQRButton.click();
	    }

	
	

}
