import { contacts } from "@/utils/contact";
import { FillLocationIcon, FillMailIcon, FillPhoneIcon } from "@/utils/socialIcon";

interface Link {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterLinksPropstype {
  logo: string;
  description: string;
  linksData: {
    title: string;
    listOfLinks: Link[];
    icon?: React.ReactNode;
  }[];
}

export const landingFooterData: FooterLinksPropstype = {
  logo: "/logo2.png",
  description: "© Fielmente Hospitality Marketing Agency",
  linksData: [
    {
      title: "Offices",
      icon: <FillLocationIcon />,
      listOfLinks: [
        ...contacts.addressesInIndia.map((address) => ({
          label: address.address,
          href: address.mapUrl,
          icon: <FillLocationIcon />,
        })),
      ],
    },
    {
      title: "Contact",
      icon: <FillPhoneIcon />,
      listOfLinks: [
        ...contacts.phone.map((phone) => ({
          label: phone,
          href: `tel:${phone}`,
          icon: <FillPhoneIcon />,
        })),
        ...contacts.email.map((email) => ({
          label: email,
          href: `mailto:${email}`,
          icon: <FillMailIcon />,
        })),
      ],
    },
  ],
};
