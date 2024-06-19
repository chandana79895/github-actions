package zapcg.Capillary.MemberLookupTestCases;

import java.awt.image.BufferedImage;
import java.io.IOException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import java.net.URL;
import javax.imageio.ImageIO;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.locationSelectionPage;
import zapcg.Capillary.PageObject.loginPage;
import zapcg.Capillary.PageObject.memberLookupPage;


public class MemberLookup_TestCases extends BaseTest {
	 public loginPage lp;
	 public locationSelectionPage lsp;
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
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
                         
                //Choose location details
                lsp=new locationSelectionPage(driver);
                lsp.lookupPropertyOptions("Akasaka");
                lsp.selectStoreOptions("store1");            //this is not correct option selected.
                
                //Click on scanQR code button
                
                mlp.clickOnScanQRCodeButton();
                
                
                
            
            }
          
        
    
	
	@Test(priority=1)
		public void testQRCodeScan() throws IOException, NotFoundException {
	
	 driver.get("C:/Users/KajalSharma/eclipse-workspace/Capillary/Capillary_Framework/src/main/java/TestQRCode/TestQR_code.png");
	 
	 

     // Find the QR code image element
     WebElement qrCodeImage = driver.findElement(By.xpath("//img[@src='qr_code.png']"));

     // Get the QR code image URL
     String qrCodeURL = qrCodeImage.getAttribute("src");

     // Read the QR code image
     URL url = new URL(qrCodeURL);
     BufferedImage bufferedImage = ImageIO.read(url);

     // Decode the QR code
     LuminanceSource luminanceSource = new BufferedImageLuminanceSource(bufferedImage);
     BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
     Result result = new MultiFormatReader().decode(binaryBitmap);

     // Print the decoded QR code text
     System.out.println(result.getText());
   
	
		}

}
