import styled from 'styled-components';
import { darken } from 'polished';

export const MenuMobile = styled.button`
  background: transparent;
  border: 0;
  display: none;
  align-self: center;
  svg {
    transition: fill 0.2s;
  }
  &:hover {
    svg {
      fill: ${darken(0.2, '#7d40e7')};
    }
  }
  @media (max-width: 790px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MenuCloseMobile = styled(MenuMobile)`
  display: none;
  position: absolute;
  top: 14px;
  left: 20px;
  @media (max-width: 790px) {
    display: none;
    align-items: center;
    justify-content: center;
  }
`;

export const ContentLeft = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 790px) {
    display: none;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    flex-direction: column;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #ddd;
  @media (max-width: 790px) {
    display: none;
    border: 0;
    padding: 17px 20px;
  }
`;

export const Navigation = styled.ul`
  display: flex;
  @media (max-width: 790px) {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: auto 0;
    li {
      margin: 20px 0;
      a {
        font-size: 24px;
      }
    }
  }
  li {
    margin-right: 10px;
    a {
      text-transform: uppercase;
      color: #999;
      font-weight: bold;
      transition: color 0.2s;
      &.active {
        color: #444;
        position: relative;
        @media (max-width: 790px) {
          &::before {
            content: '';
            position: absolute;
            top: 5px;
            left: -25px;
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-left: 10px solid #444;
            border-bottom: 10px solid transparent;
          }
        }
      }
      &:hover {
        color: #444;
      }
    }
  }
`;

export const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 6px 0;
  strong {
    color: #666;
  }
  button {
    color: #de3b3b;
    background: transparent;
    border: 0;
    transition: color 0.2s;
    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;

export const Container = styled.div`
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  box-shadow: 0 1px 2px #ddd;
  &.is-open {
    ${ContentLeft} {
      display: flex;
    }
    ${Navigation} {
      display: flex;
    }
    ${Logo} {
      display: flex;
    }
    ${MenuCloseMobile} {
      display: flex;
    }
  }
`;
