import Hero from "./hero";
import image from "../../assets/centurian_half.jpeg"
import DetailUs from "./detailsus";
const About = () => {
  return (
    <>
      <Hero image={image} />
      <DetailUs/>
    </>
  );
};

export default About;
