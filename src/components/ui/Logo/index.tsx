import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="text-2xl font-semibold whitespace-nowrap space-x-2"
    >
      <span>Smart</span>
      <span>Fashion</span>
    </Link>
  );
};

export default Logo;