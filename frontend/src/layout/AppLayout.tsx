import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { AimOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import packageJson from "../../package.json";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";

const { Header, Content, Footer } = Layout;

// const items = new Array(15).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));
const items: any = [

  [
    {
      // logout
      key: "logout",
      label: "Logout",
    }
  ],
  [
    {
      // login
      key: "login",
      label: "Login"
    }
  ]
];
type BreadcrumbitemsType = {
  href: string;
  title: React.ReactNode;
};
const Breadcrumbitems: BreadcrumbitemsType[] = [
  {
    href: "/",
    title: (
      <>
        <HomeOutlined />
        <span>Home</span>
      </>
    ),
  },
  {
    href: "/new-target",
    title: (
      <>
        <AimOutlined />
        <span>Metas</span>
      </>
    ),
  },
];


export const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const version = packageJson.version;

  const { user } = useAuth();

  const navigate = useNavigate()

  const onClickMenuOption = (e: any) => {
    if (e.key === "logout") {
      auth.signOut();
    } else if (e.key === "login") {
      navigate("/auth/sign-in")
    }
  };

  // TODO: completar login e logout
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" style={{ color: "white" }}>
          {user?.displayName ? `Olá, ${user?.displayName}` : "Olá, visitante"}
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          onClick={onClickMenuOption}
          items={user ? items[0] : items[1]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={Breadcrumbitems} />

        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <p>
          ProgressTrack ©{new Date().getFullYear()} Created by @devmicaelomota e
          os seguidores do youtube
        </p>
        <p>
          Version: <span>{version}</span>
        </p>
      </Footer>
    </Layout>
  );
};
