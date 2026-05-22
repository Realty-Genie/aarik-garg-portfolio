import { WallOfWishes } from "@/components/wall-of-wishes";
import { Footer } from "@/components/footer";

export default function WishesPage() {
  return (
    <>
      <WallOfWishes showForm showWave={false} />
      <Footer />
    </>
  );
}
