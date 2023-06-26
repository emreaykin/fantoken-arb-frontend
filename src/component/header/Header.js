import React from 'react'
import Logo from "../../utils/logo.svg";
import Menu from "../../utils/menu.svg";
import './Header.css'
import Settings from "../../utils/settings.svg";
function Header({toggleSettings}) {
  return (
    <header className="App-header">
        <div className="Header-left">
          <img
            src={Menu}
            alt="ArbitrageX Logo"
            className="hide-lg hide-md hide-xl"
          />

          <img src={Logo} alt="ArbitrageX Logo" />
          <span className="Header-span">ArbitrageX</span>
        </div>
        <div className="Header-middle hide-xs hide-sm ">a</div>
        <div className="Header-right">
          <button className="Header-button" onClick={toggleSettings}>
            <img src={Settings} alt="settings"></img>
          </button>
          <button className="Header-button">Bağlantı</button>
        </div>
      </header>
  )
}

export default Header