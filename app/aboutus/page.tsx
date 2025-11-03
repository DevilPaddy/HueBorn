import { Metadata } from "next";
import { IoFunnelOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | HueBorn",
  description:
    "HueBorn curates the best in men’s fashion — linen shirts, polos, shoes, and trousers — from trusted brands. We don’t sell directly; we help you discover quality with confidence.",
};

export default function AboutPage() {
  return (
    <>
      <div className="max-w-[1440px] mx-auto px-[1.6em] md:px-[5em]">
        <h6 className="text-[1.4em] font-semibold">About Us</h6>

        <div className="flex flex-col items-center">
          <p className="title-txt leading-10">The End of Guesswork</p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="txt text-center md:w-[60%]">
              <p className="sub-txt mb-3 leading-6">Shopping for timeless style should be a pleasure, not a problem. But the modern digital marketplace is broken. It’s a world of endless scrolling, overwhelming you with thousands of choices. It's a "quality lottery," forcing you to guess if the product you receive will match the picture. And it’s a gamble on fit, leading to the frustrating cycle of returns that wastes your time and money. </p>
              <p className="sub-txt">This system creates decision fatigue, not confidence.</p>
            </div>
            <div className="img-us md:w-[40%]">
              <img className=" rounded-lg" src="/about-us.jpg" alt="about us image" />
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-16">
          <p className="title-txt sm:leading-10 md:leading-14 lg:leading-16">
            We Are Not Another Store. <br />
            We Are The Blueprint.
          </p>

          <div className="sub-txt w-full flex items-center justify-center ">

            <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 leading-6 mt-8">
              <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                <div className="icon rounded-full bg-zinc-50 p-3 flex items-center justify-center text-[22px]">
                  <IoFunnelOutline />
                </div>
                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="font-semibold text-zinc-900">The 1% Focus</p>
                  <p>Hueborn was founded on a simple, radical idea: What if we only showed you the 1% that matters? </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                <div className="icon rounded-full bg-zinc-50 p-3 flex items-center justify-center text-[22px]">
                  <HiMagnifyingGlass />
                </div>
                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="font-semibold text-zinc-900">Expert Curation</p>
                  <p>We are a team of expert curators. We do the exhaustive work you don't have time for, vetting hundreds of items for superior quality, fabric, and construction. </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                <div className="icon rounded-full bg-zinc-50 p-3 flex items-center justify-center text-[22px]">
                  <BsStars />
                </div>
                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="font-semibold text-zinc-900">Best-in-Class</p>
                  <p>We don't just list brands. We identify the single best-in-class item for a specific need like the perfect daily trouser or the most breathable linen shirt. </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                <div className="icon rounded-full bg-zinc-50 p-3 flex items-center justify-center text-[22px]">
                  <FaRegCheckCircle />
                </div>
                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="font-semibold text-zinc-900">Fit & Use-Case</p>
                  <p>By obsessively focusing on "use-case" and "fit," we eliminate the noise. This ensures every item is a sound investment in your personal style. </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col items-center mb-12 mt-12 text-center">
          <p className="title-txt leading-10">Confidence, Curated.</p>
          <p className="sub-txt leading-6">Our promise is to restore clarity and confidence to your wardrobe. </p>
          <p className="sub-txt mt-8 leading-6">By guiding you to the right piece and the right fit, the first time, we help you build a timeless collection you love. This means fewer returns, less waste, and the end of shopping by guesswork. </p>
        </div>

        <h4 className="text-center title-txt text-zinc-800 sm:leading-10 md:leading-14 lg:leading-16">Welcome to <span className="underline">Hueborn</span>. Welcome to <span className="underline">clarity</span>. </h4>
      </div>
    </>
  );
}
