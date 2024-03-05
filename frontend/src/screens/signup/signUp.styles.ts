import React from "react";

const layout: React.CSSProperties = {
  height: '100vh',
  margin: '0 auto',
  fontFamily: 'monospace, sans-serif',
};

const content: React.CSSProperties = {
  backgroundColor: '#FFF',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
  
const sider: React.CSSProperties = {
  color: '#FFF',
  padding: '50px 40px',
};

const siderContent: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const siderDiv: React.CSSProperties = {
  textAlign: 'right',
  marginTop: '40px',
}

const button: React.CSSProperties = {
  height: '40px',
  display: 'flex',
  alignItems: 'center',
}

const image: React.CSSProperties = {
  width: '280px',
}

const card: React.CSSProperties = {
  maxWidth: '380px',
  width: '90%',
}

export const signUpStyles = {
  layout,
  content,
  sider,
  button,
  image,
  siderContent,
  card,
  siderDiv
}