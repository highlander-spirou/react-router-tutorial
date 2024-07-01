import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div>About</div>
      <button onClick={handleClick}>Click me</button>
    </>
  );
};

export default About;
