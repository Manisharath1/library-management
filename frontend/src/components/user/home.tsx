import { FaLayerGroup, FaSwatchbook } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { Link } from "react-router-dom";
const UserHome = () => {
  const catagories = [
    {
      title: "All book",
      image: <ImBook />,
      description: "Find every books",
      type: "all",
    },
    {
      title: "Your batch",
      image: <FaLayerGroup />,
      description: "Books of your batch",
      type: "batch",
    },
    {
      title: "Demanding book",
      image: <FaSwatchbook />,
      description: "Most issued books",
      type: "demanding",
    },
  ];

  return (
    <div className="flex justify-around gap-10 items-center">
      {catagories.map(({ title, image, description, type }) => (
        <div className="bg-white shadow-lg rounded-xl flex flex-1 flex-col p-10 gap-3 items-center">
          <i className="text-xl">{image}</i>
          <h1 className="text-xl">{title}</h1>
          <p>{description}</p>
          <Link
            to={type}
            className="bg-teal-600 text-white px-5 py-1 shadow-md rounded-md"
          >
            View details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserHome;
