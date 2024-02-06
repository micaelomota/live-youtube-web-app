import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { AimOutlined, HomeOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

// const items = new Array(15).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));
const items: any = [];
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

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
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
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
