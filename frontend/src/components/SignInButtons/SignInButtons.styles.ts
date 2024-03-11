import React from "react";

const button: React.CSSProperties = {
    boxSizing: 'border-box',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    width: '10em',
    justifyContent: 'center',
    margin: '5px'
}

const buttonMobile: React.CSSProperties = {
    boxSizing: 'border-box',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    margin: '5px auto'
}

const container: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
}

export const SignInButtonsStyles = {
    button,
    buttonMobile,
    container
}