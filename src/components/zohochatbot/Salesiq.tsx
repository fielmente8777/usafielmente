"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
const Salesiq = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/thank-you/" && (
        // pathname !== "/landing-page/" &&
        // pathname !== "/resort/" &&
        // pathname !== "/hospitality/" &&
        // pathname !== "/UK/" &&
        // pathname !== "/USA/" &&
        // pathname !== "/dubai-restaurant/" &&
        // pathname !== "/restaurant/" &&
        <>
          <Script id="zoho-init" strategy="afterInteractive">
            {`
          window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}
          `}
          </Script>
          <Script
            id="zsiqscript"
            src="https://salesiq.zohopublic.in/widget?wc=siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df"
            // src="https://salesiq.zohopublic.in/widget?wc=siq1a53c0a073d244118c9a52feae425ec200f5a91c3949296330c5edf2c3a6e668"
            strategy="afterInteractive"
            defer
          />
        </>
      )}
    </>
  );
};

export default Salesiq;
