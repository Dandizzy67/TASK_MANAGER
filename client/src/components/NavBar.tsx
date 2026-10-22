import { Link } from "react-router-dom";
import taskDutyLogo from "../assets/Group 2.png";
import profileImage from "../assets/Group 6.png";

const Navbar = () => {
  return (
    <div className="bg-[#FAF9FB] border-[0.5px] border-[#B8B6B6]">
      <nav
        className="max-w-360 flex items-center justify-between px-5 md:px-42.5
      mx-auto h-23.25"
      >
        <Link to="/">
          <img
            src={taskDutyLogo}
            alt="TaskDuty"
            className="w-32 md:w-auto"
          />
        </Link>

        <div className="flex items-cneter gap-4 md:gap-6">
          <Link to="/new " className="{linkclass}">
            New Task
          </Link>

          <Link to="/tasks">All Tasks</Link>
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 md:w-auto"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
