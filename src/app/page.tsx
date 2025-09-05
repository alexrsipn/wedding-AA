import Welcome from "@/app/welcome";
import Header from "@/app/header";
import History from "@/app/history";
import Hero from "@/app/hero";
import Footer from "@/app/footer";
import RVSP from "@/app/rvsp";
import Details from "@/app/details";
import Facilities from "@/app/facilities";

export default function Home() {
  return (
    <div className="bg-white dark:bg-stone-900 text-gray-900 dark:text-slate-200">
      <Welcome/>
      <Header/>
      <Hero/>
      <History/>
      <Details/>
      <RVSP/>
      <Facilities/>
      <Footer/>
    </div>
  );
}
