import Image from "next/image";
import Header from "@/app/header";
import History from "@/app/history";
import Hero from "@/app/hero";
import RVSP from "@/app/rvsp";
import Welcome from "@/app/welcome";
import Footer from "@/app/footer";

export default function Home() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800">
      {/*<Welcome/>*/}
      <Header/>
      <Hero/>
      <History/>
      <RVSP/>
      <Footer/>
    </div>
  );
}
