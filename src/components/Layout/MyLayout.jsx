import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
import Navigation from "../Navigation/Navigation.jsx";
import ProjectSection from "../ProjectSection/ProjectSection.jsx";
import Home from "./Home.jsx";
import SideMenu from "../SideMenu/SideMenu.jsx";
import { Routes, Route } from "react-router-dom";

const headerStyle = {
  textAlign: "center",
  color: "black",
  height: 60,
  paddingInline: 40,
  lineHeight: "64px",
  backgroundColor: "white",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 100,
  lineHeight: "35px",
  color: "black",
  backgroundColor: "white",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "100px",
  backgroundColor: "white",
  color: "black",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  padding: "0px",
  margin: "0px",
  height: "100vh",
};

function MyLayout() {
  return (
    <Layout style={layoutStyle}>
      <Sider width="20%" style={siderStyle}>
        <SideMenu />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Navigation />
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path={'/'} element={<Home/>}></Route>
            <Route path={"project/:id"} element={<ProjectSection />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyLayout;
