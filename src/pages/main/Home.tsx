import CarsGallery from "@/components/Home/CarsGallery";
import ExploreBoxSection from "@/components/Home/ExploreBoxSection";
import "@/components/Home/Home.css";
import RentOffers from "@/components/Home/RentOffers";
import WhyUs from "@/components/Home/WhyUs";
export const Home = () => {
  return (
    <>
      <ExploreBoxSection />
      <CarsGallery />
      <RentOffers />
      <WhyUs />

      {/* Overlay images */}
      <div className="absolute top-52 right-0 h-[578px] -z-10 ">
        <div className="absolute w-full h-full top-0 right-0  bg-linear-to-r from-[#1A1C1D] to-[#1A1C1D00]"></div>
        <img
          className="w-full h-full object-cover"
          src="/Home/car-bg.svg"
          alt="bg"
        />
      </div>
    </>
  );
};

export default Home;
