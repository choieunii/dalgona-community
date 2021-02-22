import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'components/common/Sidebar';
import searchIcon from 'images/search.png';
import menuIcon from 'images/menu.png';
import logo from 'images/logo.png';
import biglogo from 'images/biglogo.png';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openMenu: 'home',
            isPC: true,
            _ismounted: false,
            openSidebar: false,
            isLogin: false,
        };
    }

    handleOver = (e) => {
        if (e.target.id === 'home') {
            this.setState({ isOpen: false, openMenu: e.target.id });
            this.goHome();
        } else {
            this.setState({ isOpen: true, openMenu: e.target.id });
        }
    };

    handleOnClick = (e) => {
        const { openMenu, isOpen } = this.state;
        if (e.target.id === openMenu) {
            this.setState({ isOpen: !isOpen, openMenu: e.target.id });
        } else if (e.target.id === 'home') {
            this.setState({ isOpen: false, openMenu: e.target.id });
            this.goHome();
        } else {
            this.setState({ isOpen: true, openMenu: e.target.id });
        }

        console.log(e.target.id);
    };

    checkIsPc = () => {
        if (window.innerWidth > 1024) {
            this.setState({ isPC: true });
        } else {
            this.setState({ isPC: false });
        }
    };

    goHome = () => {
        this.props.history.push('/');
    };

    setOpenMenu = () => {
        let path = this.props.location.path;
        this.setState({ openMenu: path });
    };

    handleSidebar = () => {
        const { openSidebar } = this.state;
        this.setState({ openSidebar: !openSidebar });
    };

    componentDidMount() {
        this.checkIsPc();
        this.setOpenMenu();
        window.addEventListener('resize', this.checkIsPc);
    }

    render() {
        const { isOpen, openMenu, isPC, openSidebar, isLogin } = this.state;
        const { isHome } = this.props;
        const Menu = { home: '홈', main: '메인', Luna: '루나', free: '자유', dalgona: '달고나' };

        return (
            <div className={!openSidebar ? 'header' : 'header sidebaropen'}>
                {openSidebar && (
                    <div className="header sidebaropen sidebar">
                        <Sidebar handleSidebar={this.handleSidebar} isLogin={isLogin} />
                    </div>
                )}
                <div className={isHome ? 'header-main' : 'header-main no'}>
                    <div className="header-main__logo">
                        <div className="not-pc">
                            <img className="header-main__logo-menu" src={menuIcon} onClick={this.handleSidebar}></img>
                        </div>
                        <div className="header-main__logo-logoimg" onClick={this.goHome}>
                            <img src={isPC ? biglogo : logo}></img>
                        </div>
                        <div className="not-pc">
                            <img className="header-main__logo-search" src={searchIcon}></img>
                        </div>
                    </div>
                    <div className="header-main__login">
                        <Link to={{ pathname: '/login', path: 'login' }}>
                            <span
                                className={
                                    openMenu === 'login' ? 'header-main__login-login click' : 'header-main__login-login'
                                }
                            >
                                로그인
                            </span>
                        </Link>
                        <Link to={{ pathname: '/signup', path: 'signup' }}>
                            <span
                                className={
                                    openMenu === 'signup'
                                        ? 'header-main__login-signup click'
                                        : 'header-main__login-signup'
                                }
                            >
                                회원가입
                            </span>
                        </Link>
                    </div>
                    {(isHome || isPC) && (
                        <div className="header-main__menu">
                            {Object.keys(Menu).map((value, index) => (
                                <div
                                    className={
                                        openMenu === value
                                            ? 'header-main__menu-content click'
                                            : 'header-main__menu-content'
                                    }
                                    id={value}
                                    key={index}
                                    onMouseOver={this.handleOver}
                                    onClick={this.handleOnClick}
                                >
                                    {Menu[value]}
                                </div>
                            ))}
                            <input></input>
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div className="header-hover">
                        <div className="header-hover__border"></div>
                        <div className="header-hover__menu">
                            {(isPC || openMenu === 'main') && (
                                <div className="header-hover__menu-main">
                                    <Link to={{ pathname: '/article', path: 'main' }}>
                                        <span> 기사</span>
                                    </Link>
                                    <Link to={{ pathname: '/vote', path: 'main' }}>
                                        <span>투표</span>
                                    </Link>
                                </div>
                            )}
                            {(isPC || openMenu === 'Luna') && (
                                <div className="header-hover__menu-luna">
                                    <Link to={{ pathname: '/luna/1', path: 'Luna' }}>
                                        <span> 비투비</span>
                                    </Link>
                                    <span>스키니브라운</span>
                                    <span>아이유</span>
                                </div>
                            )}
                            {(isPC || openMenu === 'free') && (
                                <div className="header-hover__menu-free">
                                    <Link to={{ pathname: '/free/1', path: 'free' }}>
                                        <span> 일상 / 잡담</span>
                                    </Link>
                                    <span>취미</span>
                                    <span>생활정보</span>
                                    <span>고민</span>
                                </div>
                            )}
                            {(isPC || openMenu === 'dalgona') && (
                                <div className="header-hover__menu-dalgona">
                                    <Link to={{ pathname: '/notice', path: 'dalgona' }}>
                                        <span> 공지사항</span>
                                    </Link>
                                    <Link to={{ pathname: '/event', path: 'dalgona' }}>
                                        <span>이벤트</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Header;
