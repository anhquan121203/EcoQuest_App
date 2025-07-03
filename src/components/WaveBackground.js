import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const WaveBackground = ({ style }) => {
  return (
    <Svg
      height="350"
      width="100%"
      viewBox="0 0 1440 320"
      style={style}
      preserveAspectRatio="none"
    >
      <Defs>
        <LinearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#2483e0" />
          <Stop offset="100%" stopColor="#a6d4fa" />
        </LinearGradient>
      </Defs>

      <Path
        fill="url(#waveGradient)"
        fillOpacity="1"
        d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,160C672,160,768,192,864,213.3C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </Svg>
  );
};

export default WaveBackground;
