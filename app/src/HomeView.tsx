import icon from "./assets/homeIcon.png";
import "./css/HomeView.css";

const HomeView = () => {
  return (
    <div className="HomeView">
      <img id="icon" src={icon} alt="背景" />
    </div>
  );
};

export default HomeView;
