import axios from "axios";
import { useState, useEffect } from "react";

const useStreetMap = (address) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;

    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: address,
              format: "json",
              limit: 1,
            },
            headers: {
              "User-Agent": "YourAppName/1.0", // bắt buộc
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          });
        }
      } catch (err) {
        console.warn("Lỗi geocoding:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  return { coordinates, loading };
};

export default useStreetMap;
