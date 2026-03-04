import fs from "fs";
import path from "path";
import Carousel from "@/components/ui/Carousel";
import CarouselItem from "@/components/ui/Carousel/CarouselItem";
import ReviewCard from "./ReviewCard";
import { ReviewType } from "@/types";

// Keep a base list of images (public paths). We'll append a cache-busting
// `?v=<mtime>` query param using the file's mtime so updated files show
// immediately even if the browser or CDN has cached the previous asset.
const baseReviews: ReviewType[] = [
  {
    id: "1",
    name: "Meghana",
    rating: 5,
    comment:
      "Absolutely adore the dress! The customization options were exactly what I needed, and the quality is beyond impressive and the fit was perfect. I'm already planning my next purchase.",
    image: "/images/home/review/customer1.jpg",
  },
  {
    id: "2",
    name: "Shruthi",
    rating: 4,
    comment:
      "Received my dream dress! Quick delivery and top-notch quality exceeded my expectations. More customization options would be icing on the cake, but overall, I'm thrilled.",
    image: "/images/home/review/customer2.jpg",
  },
  {
    id: "3",
    name: "Aishwarya",
    rating: 5,
    comment:
      "Exceptional customer service! Their assistance with sizing was invaluable, and the dress fits like a glove. Couldn't be happier with my purchase!",
    image: "/images/home/review/customer3.jpg",
  },
  {
    id: "4",
    name: "Chandana",
    rating: 5,
    comment:
      "Absolutely impressed! The dress's quality exceeded my expectations, and the level of customization available made it truly unique. Found exactly what I was looking for.",
    image: "/images/home/review/customer4.jpg",
  },
];

const getVersionedPublicPath = (publicPath: string) => {
  // publicPath expected to start with '/'
  const rel = publicPath.startsWith("/") ? publicPath.slice(1) : publicPath;
  const abs = path.join(process.cwd(), "public", rel);

  try {
    const stat = fs.statSync(abs);
    const v = Math.floor(stat.mtimeMs);
    return `${publicPath}?v=${v}`;
  } catch (err) {
    // If file missing or inaccessible, return original path (no crash)
    return publicPath;
  }
};

const reviews: ReviewType[] = baseReviews.map((r) => ({
  ...r,
  image: getVersionedPublicPath(r.image),
}));

const Reviews = () => {
  return (
    <section className="ui-container my-16">
      <h3 className="mb-6 font-semibold text-2xl sm:text-3xl text-center sm:text-left">
        Customers <span className="text-primary">Review</span>
      </h3>

      <Carousel showArrows={false}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="shrink-0 w-full md:w-1/2 xl:w-1/3"
          >
            <CarouselItem>
              <ReviewCard review={review} />
            </CarouselItem>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Reviews;
