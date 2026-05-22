import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MyStory } from "@/components/my-story";
import { WallOfWishes } from "@/components/wall-of-wishes";

export default function Home() {
  return (
    <>
      <Hero />
      <MyStory />
      <WallOfWishes />
      <Footer />
    </>
  );
}
