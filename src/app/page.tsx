import Welcome from "@/app/welcome";
import Header from "@/app/header";
import History from "@/app/history";
import Hero from "@/app/hero";
import Footer from "@/app/footer";
import Confirmation from "@/app/rvsp";
import Details from "@/app/details";

export default function Home() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800">
      <Welcome/>
      <Header/>
      <Hero/>
      <History/>
        <Details/>
      <Confirmation/>
      <Footer/>
    </div>
  );
}
