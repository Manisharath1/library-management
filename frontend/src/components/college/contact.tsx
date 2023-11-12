import Hero from "./hero";
import image from "../../assets/centurian_half.jpeg";
import Contactform from "./contactform";

const Contact = () => {
  return (
    <>
      <Hero image={image} />
      <Contactform/>
    </>
  );
};

export default Contact;
