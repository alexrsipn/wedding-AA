import Welcome from "@/app/welcome";
import Header from "@/app/header";
import History from "@/app/history";
import Hero from "@/app/hero";
import Footer from "@/app/footer";
import Rsvp from "@/app/rsvp";
import Details from "@/app/details";
import Facilities from "@/app/facilities";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 dark:bg-neutral-800 dark:text-slate-200">
      <Welcome/>
      <Header/>
      <Hero/>
      <History/>
      <Details/>
      <Rsvp/>
      <Facilities/>
      <Footer/>
    </div>
  );
}
