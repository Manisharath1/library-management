interface HeroProps {
  image: string;
}
const Hero: React.FC<HeroProps> = ({ image }) => (
  <div>
    <img src={image} alt="no image" className="w-full" />
  </div>
);

export default Hero;
