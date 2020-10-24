import { useEffect } from "react";

const useScript = (url) => {
  //    useScript('https://apis.google.com/js/api.js"');
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
