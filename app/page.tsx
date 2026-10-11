import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Payment from "./components/Payment";
import Pricing from "./components/Pricing";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Pricing />
        <Payment />
      </main>
      <Footer />
    </>
  );
}
