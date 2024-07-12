package zapcg.Cappilary.utils;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

	private Properties properties;

	public ConfigReader() {
        loadProperties();
    }

    private void loadProperties() {
        try (FileInputStream input = new FileInputStream(System.getProperty("user.dir") + "//src//main//java//zapcg//Capillary//Base//config.properties")) {
            properties = new Properties();
            properties.load(input);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getProperty(String key) {
        if (properties == null) {
            loadProperties(); // If properties are not loaded, try loading again
        }
        return properties.getProperty(key);
    }
	
}
