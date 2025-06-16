// hooks/useLocation.js
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [addressNow, setAddressNow] = useState("Đang lấy vị trí...");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Không có quyền truy cập vị trí");
          setAddressNow("Không có quyền truy cập vị trí");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const place = reverseGeocode[0];
          const city = place.city || place.region;
          const country = place.country || "Việt Nam";
          setAddressNow(`${city}, ${country}`);
        }
      } catch (err) {
        console.error("Lỗi khi lấy vị trí:", err);
        setErrorMsg("Không xác định được vị trí");
        setAddressNow("Không xác định được vị trí");
      }
    })();
  }, []);

  return { location, addressNow, errorMsg };
};

export default useLocation;
