import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  ContentLeft,
  ContentRight,
  Logo,
  Navigation,
  MenuMobile,
  MenuCloseMobile,
} from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedMenus, setSelectedMenus] = useState({
    orders: '',
    deliveryman: '',
    recipients: '',
    problems: '',
  });
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const endpoint = location.pathname.split('/').filter((char) => {
      return char !== '';
    });
    setOpenMenu(false);
    switch (`/${endpoint[0]}`) {
      case '/orders':
        setSelectedMenus({ orders: 'active' });
        break;
      case '/deliveryman':
        setSelectedMenus({ deliveryman: 'active' });
        break;
      case '/recipients':
        setSelectedMenus({ recipients: 'active' });
        break;
      default:
        setSelectedMenus({ problems: 'active' });
        break;
    }
  }, [location]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container className={openMenu && 'is-open'}>
      <MenuMobile type="button" onClick={() => setOpenMenu(true)}>
        <MdMenu size={32} color="#7d40e7" />
      </MenuMobile>
      <ContentLeft>
        <MenuCloseMobile type="button" onClick={() => setOpenMenu(false)}>
          <MdClose size={32} color="#7d40e7" />
        </MenuCloseMobile>
        <Logo>
          <img src={logo} height={26} width={135} alt="FastFeet Logo" />
        </Logo>
        <Navigation>
          <li>
            <Link to="/orderlist" className={`${selectedMenus.orders}`}>
              Encomendas
            </Link>
          </li>
          <li>
            <Link to="/deliveryman" className={`${selectedMenus.deliveryman}`}>
              Entregadores
            </Link>
          </li>
          <li>
            <Link to="/recipients" className={`${selectedMenus.recipients}`}>
              Destinatários
            </Link>
          </li>
          <li>
            <Link to="/problems" className={`${selectedMenus.problems}`}>
              Problemas
            </Link>
          </li>
        </Navigation>
      </ContentLeft>
      <ContentRight>
        <strong>{profile.name}</strong>
        <button type="button" onClick={handleLogout}>
          Sair do sistema
        </button>
      </ContentRight>
    </Container>
  );
}
