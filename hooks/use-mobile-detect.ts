import { useEffect, useState } from "react";

export default function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileRegex = /iphone|ipad|ipod|android|windows phone/g;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return isMobile;
}
