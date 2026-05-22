import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { WallOfWishes } from "@/components/wall-of-wishes";

export default function Home() {
  return (
    <>
      <Hero />
      <WallOfWishes limit={6} />
      <Footer />
    </>
  );
}
