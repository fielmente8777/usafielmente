import Link from "next/link";
import { Container } from "@/app/(home)/components";

const directory = "https://fielmente.com/hotel-marketing-agency-usa/locations/";
const cities = [
  { name: "New York City", path: "new-york/new-york-city/", detail: "Neighborhood positioning, city stays and group enquiries." },
  { name: "Miami", path: "florida/miami/", detail: "Precise location content for city, beach and dining journeys." },
  { name: "Orlando", path: "florida/orlando/", detail: "Family room decisions, meeting stays and clear package information." },
  { name: "Los Angeles", path: "california/los-angeles/", detail: "Local content that explains the property’s actual place in the trip." },
  { name: "Las Vegas", path: "nevada/las-vegas/", detail: "Clear offers for leisure visits, conventions and private groups." },
  { name: "Dallas", path: "texas/dallas/", detail: "Business travel, city weekends and useful corporate enquiries." },
];

export default function USServiceLocations() {
  return (
    <section id="usa-locations" className="bg-[#F5F5F9] py-14 md:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F28E29]">USA service locations</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold text-[#11103D] md:text-4xl">A local plan for your hotel, resort or restaurant</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-[#55536E]">Explore our connected service guides for all 50 US states and 32 city markets. Each explains relevant guest journeys, practical campaign choices and a direct enquiry route. Choose the location that fits your property.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cities.map((c) => <li key={c.path}><Link href={directory + c.path} className="block h-full rounded-2xl border border-[#E4E3EC] bg-white p-6 hover:border-[#F28E29]"><h3 className="text-xl font-bold text-[#11103D]">{c.name} <span aria-hidden="true">↗</span></h3><p className="mt-3 text-sm leading-relaxed text-[#55536E]">{c.detail}</p></Link></li>)}</ul>
        <Link href={directory} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#F28E29] px-6 py-3 font-semibold text-white hover:bg-[#11103D]">Browse all US states and cities</Link>
      </Container>
    </section>
  );
}
