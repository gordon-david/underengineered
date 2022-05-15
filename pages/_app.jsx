import "../styles/globals.css";
import "highlight.js/styles/srcery.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/b3fcb931ba.js"
        crossOrigin="anonymous"
      ></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
