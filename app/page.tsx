import AccountInfo from "@/components/common/AccountInfo";
import HeroSection from "@/components/mainPage/HeroSectionIntro";

export default function Home() {

  return (
    <div className="overflow-y-hidden"><HeroSection />
      <AccountInfo />
    </div>

  );
}
