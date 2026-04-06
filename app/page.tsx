import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import HowItWorks from "@/components/HowItWorks";
import InternshipHub from "@/components/InternshipHub";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Pillars />
      <HowItWorks />
      <InternshipHub />
      <Testimonials />
      <FAQ />
      <SignupForm />
      <Footer />
    </main>
  );
}
