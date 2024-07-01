package zapcg.Capillary.LoginTestCases;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import zapcg.Capillary.Base.BaseTest;
import zapcg.Capillary.PageObject.loginPage;

import java.time.Duration;

public class Login_Valid_TestCases extends BaseTest {
    public loginPage lp;
    public WebDriver driver;
    public WebDriverWait wait;

    @BeforeMethod
    @Parameters({"browser", "deviceName"})
    public void initialize(String browser, String deviceName) throws InterruptedException {
        setUp(browser, deviceName); // Use the setup method to initialize the browser
        initialization(browser);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--headless"); // If you want to run in headless mode
        driver = new ChromeDriver(options);

        wait = new WebDriverWait(driver, Duration.ofSeconds(20)); // 20 seconds timeout

        driver.get(baseUrl);
        Thread.sleep(1000); // For demonstration purposes, avoid using Thread.sleep in real tests
        lp = new loginPage(driver);
        lp.changeDefaultLanguage();
        lp.chooseEnglishLanguage();
    }

    @Test(priority = 1)
    public void testValidLogin_TestCase1() throws InterruptedException {
        WebElement loginMenu = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@id='LGMENUI0']")));
        loginMenu.click();
        
        lp.login("zapcom_test2", "storeportal");
        lp.verifySuccessfullLogin(driver, "https://d1msv2sqknn4w4.cloudfront.net/member-search");
        driver.close();
    }
}
