"use client";
import { usePathname } from "next/navigation";
const Salesiq = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/thank-you/" && (
        <>
          <script>
            {` window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
          </script>
          <script
            id="zsiqscript"
            src="https://salesiq.zohopublic.in/widget?wc=siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df"
            defer
          ></script>

          {/* <Script id="chatbot-config" strategy="afterInteractive">
            {`
              window.eazbotConfig = {
                ndid: "09166f89-8fb1-4a65-b016-7ebbd3418701",
                hid: "68017653",
              };
            `}
          </Script>
          <Script
            src="https://cb-script.dyq28lyxrazm2.amplifyapp.com/widget/lead-chatbot.js"
            strategy="afterInteractive"
          /> */}
        </>
      )}
    </>
  );
};

export default Salesiq;
