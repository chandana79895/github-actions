package zapcg.Capillary.Base;

import java.time.Duration;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.annotations.AfterMethod;
import io.github.bonigarcia.wdm.WebDriverManager;
import zapcg.Cappilary.utils.ConfigReader;
import zapcg.Cappilary.utils.DeviceData;

public class BaseTest {
    public static WebDriver driver;
    protected String baseUrl;
    protected Dimension dimension;
    protected String deviceName;

    public void setUp(String browser, String deviceName) {
        ConfigReader configReader = new ConfigReader();
        baseUrl = configReader.getProperty("url");
        dimension = DeviceData.getDimension(deviceName);
        this.deviceName = deviceName;
    }

    public void initialization(String browser) {
        try {
            if (browser.equalsIgnoreCase("chrome")) {
                // WebDriverManager.chromedriver().setup(); // Use WebDriverManager for managing ChromeDriver versions dynamically
                System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--remote-allow-origins=*");
                options.addArguments("--headless"); // Enable headless mode
                options.addArguments("--no-sandbox");
                options.setExperimentalOption("detach", true);
                options.setAcceptInsecureCerts(true);

                // Adding detach option
                options.setExperimentalOption("detach", true);
                // Handling SSL certificates
                options.setAcceptInsecureCerts(true);

                // Initialize ChromeDriver
                driver = new ChromeDriver(options);
            } else if (browser.equalsIgnoreCase("firefox")) {
                // WebDriverManager.firefoxdriver().setup(); // Use WebDriverManager for managing GeckoDriver versions dynamically
                System.setProperty("webdriver.gecko.driver", "C:\\BrowserDriver\\FirefoxDriver\\geckodriver.exe"); // Adjust path as necessary
                FirefoxOptions options = new FirefoxOptions();
                // options.addArguments("--headless"); // Enable headless mode

                // Handling SSL certificates
                options.setAcceptInsecureCerts(true);

                // Initialize FirefoxDriver
                driver = new FirefoxDriver(options);
            }

            if (dimension != null) {
                driver.manage().window().setSize(dimension);
            }

            driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(60));
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
        } catch (Exception e) {
            System.err.println("Error initializing WebDriver: " + e.getMessage());
            if (driver != null) {
                driver.quit();
            }
        }
    }

    @AfterMethod
    public void tearDown() {
        try {
            if (driver != null) {
                String browserName = driver.getClass().getSimpleName();
                System.out.println("Test execution completed on " + browserName + " with device: " + deviceName);
            }
        } catch (Exception e) {
            System.err.println("Error during tearDown: " + e.getMessage());
        } finally {
            if (driver != null) {
                try {
                    driver.quit();
                } catch (Exception e) {
                    System.err.println("Error closing WebDriver session: " + e.getMessage());
                }
            }
        }
    }
}