import { Col, Row, } from "antd";
import { VITE_APP_TITLE, VITE_LOGO } from "config/constant";
import { Link } from "react-router-dom";
import User from "./userInfo";
const Header = () => {
  return (
    <Row
      wrap={false}
      // gutter={24}
      className="bg-primary w-screen h-16 text-white select-none"
      justify="space-between"
      align="middle">
      <Col className="text-xl flex items-center px-6">
        <Link to="/guider" className="flex items-center">
          <div className="relative -mt-1">
            <img src={"/favicon.png"} alt="logo" className="h-8" />
            <img
              src={VITE_LOGO}
              alt="logo"
              className="h-3 absolute -right-1 bottom-0"
            />
          </div>
          <h1 className="font-semibold ml-3 line-clamp-1">Ant Design 5</h1>
        </Link>
      </Col>
      <Col className="flex items-center text-xl" flex="auto">
        <span className="opacity-50 text-base mr-6">|</span>
        <h3 className="font-semibold">{VITE_APP_TITLE}</h3>
      </Col>
      <Col className="flex justify-end px-6">
        <User />
      </Col>
    </Row>
  );
};

export default Header;
