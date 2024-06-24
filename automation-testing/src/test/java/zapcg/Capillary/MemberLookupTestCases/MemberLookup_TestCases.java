package zapcg.Capillary.MemberLookupTestCases;



import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

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
	    
	       lp.changeDefaultLanguage();
	       lp.chooseEnglishLanguage();
	       lp.login("zapcom_test2", "storeportal");
                 /*        
                //Choose location details
                lsp=new locationSelectionPage(driver);
                lsp.lookupPropertyOptions("Akasaka");
                lsp.selectStoreOptions("store1");            
                */
	       
                //Click on scanQR code button
                mlp=new memberLookupPage(driver);
                
            
            }/*
		static {
	        // Load the OpenCV native library
	        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
	    }
          */
        
    
	/*
	@Test(priority=1)
		public void testQRCodeScan() throws IOException, NotFoundException {
	
        memberLookupPage mlp = new memberLookupPage(driver);
        mlp.clickOnScanQRCodeButton();

		try {
        // Specify the path to the QR code image file
        File qrCodeImageFile = new File("C:\\Users\\KajalSharma\\eclipse-workspace\\Capillary\\Capillary_Framework\\src\\main\\java\\TestQRCode\\Valid_QR_Code.jpg");
     
        // Read the image file
        BufferedImage bufferedImage = ImageIO.read(qrCodeImageFile);
	 
     // Prepare the image for QR code decoding
        LuminanceSource luminanceSource = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

        // Decode the QR code
        Result result = new MultiFormatReader().decode(binaryBitmap);

        // Print the QR code text
        System.out.println("QR Code text: " + result.getText());
    } catch (IOException e) {
        System.err.println("IOException: Could not read the image file.");
        e.printStackTrace();
    } catch (NotFoundException e) {
        System.err.println("NotFoundException: QR Code not found in the image.");
        e.printStackTrace();
    }
	
		}
	*/
	
		
		@Test(priority=1)
		public void verifyScanButtonAvailability() {
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.verifyScanButtonEnabled();
				
			}
	
		@Test(priority=2)
		public void enterValidMemberId() {
				memberLookupPage mlp = new memberLookupPage(driver);
				mlp.enterMemberId("GT000003673");
				mlp.clickOnSearchButton();
				mlp.verifySuccessfullNavigationToMemberDetailsPage(driver, "https://d1msv2sqknn4w4.cloudfront.net/member-details");
		
			}
	
		@Test(priority=3)
		public void verifyHeaderHyperlink() {
			memberLookupPage mlp = new memberLookupPage(driver);
			mlp.clickOnHyperlink();
			mlp.headerHyperlinkVerification(driver, "https://d1msv2sqknn4w4.cloudfront.net/location-search");
			}
	
	
	
	

}
