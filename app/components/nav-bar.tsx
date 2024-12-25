import { Link } from "react-router";

interface NavBarProps {
  inverted?: boolean;
}

const NavBar = ({ inverted = false }: NavBarProps) => {
  const smallShipLogo = inverted ? (
    <img alt="Merelaagri logo" src="/img/merelaager_ship_w.svg" />
  ) : (
    <img alt="Merelaagri logo" src="/img/merelaager_ship.svg" />
  );

  const primaryLogo = inverted ? (
    <img alt="Merelaagri logo" src="/img/merelaager_logo_white.svg" />
  ) : (
    <img alt="Merelaagri logo" src="/img/merelaager_logo_blue.svg" />
  );

  return (
    <div className="o-container">
      <nav className="c-primary-nav">
        <Link className="c-primary-nav__vector" to={"/"}>
          {smallShipLogo}
        </Link>
        <div className="c-primary-nav__content">
          <ul className="c-primary-nav__sec c-primary-nav__sec--left">
            <li className="c-primary-nav__item">
              <Link to={"/info/"}>Info</Link>
            </li>
            <li className="c-primary-nav__item">
              <Link to={"/pildid/"}>Pildid</Link>
            </li>
          </ul>
          <div className="c-primary-nav__logo">
            <Link to={"/"}>{primaryLogo}</Link>
          </div>
          <ul className="c-primary-nav__sec c-primary-nav__sec--right">
            <li className="c-primary-nav__item">
              <Link to={"/ajalugu/"}>Ajalugu</Link>
            </li>
            <li className="c-primary-nav__item">
              <Link to={"/meeskond/"}>Meeskond</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
