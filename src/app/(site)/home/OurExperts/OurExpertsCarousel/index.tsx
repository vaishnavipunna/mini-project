import fs from "fs";
import path from "path";
import Carousel from "@/components/ui/Carousel";
import ExpertCard from "./ExpertCard";
import CarouselItem from "@/components/ui/Carousel/CarouselItem";

const baseExperts = [
  {
    id: "1",
    name: "Lalitha",
    image: "/images/home/team/tailor1.webp",
    designation: "Designer",
  },

  {
    id: "2",
    name: "Uma",
    image: "/images/home/team/tailor3.webp",
    designation: "Master",
  },

  {
    id: "3",
    name: "Vani",
    image: "/images/home/team/tailor2.webp",
    designation: "Tailor",
  },

  {
    id: "4",
    name: "Jayanthi",
    image: "/images/home/team/tailor4.webp",
    designation: "Tailor",
  },
];

const getVersionedPublicPath = (publicPath: string) => {
  const rel = publicPath.startsWith("/") ? publicPath.slice(1) : publicPath;
  const abs = path.join(process.cwd(), "public", rel);

  try {
    const stat = fs.statSync(abs);
    const v = Math.floor(stat.mtimeMs);
    return `${publicPath}?v=${v}`;
  } catch (err) {
    return publicPath;
  }
};

const experts = baseExperts.map((e) => ({
  ...e,
  image: getVersionedPublicPath(e.image),
}));

const OurExpertsCarousel = () => {
  return (
    <Carousel>
      {experts?.map((expert) => (
        <div
          key={expert.id}
          className="shrink-0 w-[80%] sm:w-1/2 md:w-1/3"
        >
          <CarouselItem>
            <ExpertCard expert={expert} />
          </CarouselItem>
        </div>
      ))}
    </Carousel>
  );
};

export default OurExpertsCarousel;
