package zapcg.Capillary.utils;

import java.util.HashMap;
import java.util.Map;


import org.openqa.selenium.Dimension;

public class DeviceData {
	
	private static Map<String, Dimension> dimensionMap = new HashMap<>();
	
	static{
		dimensionMap.put("Tablet Portrait", new Dimension(768, 1024));
		dimensionMap.put("Tablet Landscape", new Dimension(1024, 768));
		dimensionMap.put("iPhone 11 Pro Portrait", new Dimension(375, 812));
		dimensionMap.put("iPhone 11 Pro Landscape", new Dimension(812, 375));
		dimensionMap.put("Galaxy S20 Portrait", new Dimension(360, 800));
		dimensionMap.put("Galaxy S20 Landscape", new Dimension(800, 360));
	}
	
	public static Dimension getDimension(String deviceName)
	{
		return dimensionMap.get(deviceName);
	}
	
	public static String getDeviceName(Dimension dimension) {
        for (Map.Entry<String, Dimension> entry : dimensionMap.entrySet()) {
            if (entry.getValue().equals(dimension)) {
                return entry.getKey();
            }
        }
        return null;
    }
	
	
}
