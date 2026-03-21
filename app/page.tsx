import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import HowItWorks from "@/components/HowItWorks";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Pillars />
      <HowItWorks />
      <SignupForm />
      <Footer />
    </main>
  );
}
