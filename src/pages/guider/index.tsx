import { VITE_LOGO } from "config/constant";
import { Link } from "react-router-dom";

const libraries = [
  { name: "Vite", link: "https://vitejs.dev/" },
  { name: "React", link: "https://react.dev/" },
  { name: "React Router", link: "https://reactrouter.com/" },
  { name: "Ant Design", link: "https://ant.design/" },
  { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
  { name: "Zustand", link: "https://zustand-demo.pmnd.rs/" },
  { name: "ahooks", link: "https://ahooks.js.org/" },
];
const Introduction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-main">
      <div className="relative">
        <img src={"/favicon.png"} alt="logo" className="h-40" />
        <img
          src={VITE_LOGO}
          alt="logo"
          className="h-12 absolute -right-3 bottom-0"
        />
      </div>
      <h1 className="text-4xl font-bold mt-8">
        Welcome to Antd Admin Template
      </h1>
      <p className="text-xl mt-4">
        This is a starter template for building React applications with Ant
        Design 5.0
      </p>
      <p className="text-xl mt-4">
        The Main Libraries:{" "}
        {libraries.map((item, index) => (
          <Link key={item.name} to={item.link} className="text-[#1677ff] hover:text-[#ff7875]">
            {item.name}
            {index < libraries.length - 1 && "、"}
          </Link>
        ))}
      </p>
    </div>
  );
};

export default Introduction;
