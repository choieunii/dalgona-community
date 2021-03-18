import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'components/common/Sidebar';
import SearchInput from 'components/common/SearchInput';
import SearchBox from 'components/common/SearchBox';
import searchIcon from 'images/searchIcon.png';
import menuIcon from 'images/menu.png';
import logo from 'images/logo.png';
import biglogo from 'images/biglogo.png';
import './Nav.scss';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openMenu: 'home',
            isPC: true,
            _ismounted: false,
            openSidebar: false,
            path: '',
            isSearch: false,
            searchWord: '',
            searchDivision: 'all',
        };
    }

    handleOver = (e) => {
        if (this._isMounted) {
            if (e.target.id === 'home') {
                this.setState({ isOpen: false, openMenu: e.target.id });
            } else {
                this.setState({ isOpen: true, openMenu: e.target.id });
            }
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleOnClick = (e) => {
        const { openMenu, isOpen } = this.state;
        if (this._isMounted) {
            if (e.target.id === openMenu) {
                this.setState({ isOpen: !isOpen, openMenu: e.target.id });
            } else if (e.target.id === 'home') {
                this.setState({ isOpen: false, openMenu: e.target.id });
                this.goHome();
            } else {
                this.setState({ isOpen: true, openMenu: e.target.id });
            }
        }
        console.log(e.target.id);
    };

    checkIsPc = () => {
        if (window.innerWidth > 1024 && this._isMounted) {
            this.setState({ isPC: true });
        } else {
            if (this._isMounted) {
                this.setState({ isPC: false });
            }
        }
    };

    goHome = () => {
        this.props.history.push('/');
    };

    setPath = () => {
        let path = this.props.location.path;
        this.setState({ path: path });
    };

    handleSidebar = () => {
        const { openSidebar } = this.state;
        this.setState({ openSidebar: !openSidebar });
    };

    closeSidebar = () => {
        const { openSidebar } = this.state;
        this.setState({ openSidebar: false });
    };
    signOut = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) this.props.signOut();
    };

    toggleSearch = () => {
        this.setState({ isSearch: !this.state.isSearch });
    };

    getSearch = () => {
        console.log(this.state.searchDivision, this.state.searchWord);
        this.props.history.push(
            `/search?searchWord=${this.state.searchWord}&searchDivision=${this.state.searchDivision}`
        );
    };

    componentDidMount() {
        this._isMounted = true;
        this.checkIsPc();
        this.setPath();
        window.addEventListener('resize', this.checkIsPc);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { isSearch, searchWord, searchDivision, isOpen, openMenu, isPC, openSidebar, path } = this.state;
        const { isAuthenticated, profile } = this.props;
        const { isHome } = this.props;
        const Menu = { home: '홈', main: '이슈', Luna: '루나', free: '자유', dalgona: '달고나' };
        return (
            <div className={!openSidebar ? 'nav' : 'nav sidebaropen'}>
                {openSidebar && (
                    <div className="nav sidebaropen sidebar">
                        <Sidebar
                            handleSidebar={this.handleSidebar}
                            isAuthenticated={isAuthenticated}
                            profile={profile}
                            signOut={this.signOut}
                            openSidebar={openSidebar}
                            closeSidebar={this.closeSidebar}
                        />
                    </div>
                )}
                {isSearch && (
                    <div className="nav-search__box not-pc">
                        <SearchBox
                            searchWord={searchWord}
                            searchDivision={searchDivision}
                            handleChange={this.handleChange}
                            placeholder="검색어를 입력하세요. (제목 + 내용)"
                            getSearch={this.getSearch}
                        />
                        <div className="border_line" />
                    </div>
                )}
                <div className={isHome ? 'nav-main' : 'nav-main no'}>
                    <div className="nav-main__logo">
                        <div className="not-pc">
                            <img className="nav-main__logo-menu" src={menuIcon} onClick={this.handleSidebar}></img>
                        </div>
                        <div className="nav-main__logo-logoimg" onClick={this.goHome}>
                            <img src={isPC ? biglogo : logo}></img>
                        </div>
                        <div className="not-pc">
                            <button onClick={this.toggleSearch}>
                                <img className="nav-main__logo-search" src={searchIcon}></img>
                            </button>
                        </div>
                    </div>
                    {isAuthenticated ? (
                        <div className="nav-main__login" onMouseOver={this.handleOver}>
                            {profile.get('nickname')}님
                        </div>
                    ) : (
                        <div className="nav-main__login">
                            <Link to={{ pathname: '/login', path: 'login' }}>
                                <span
                                    className={
                                        path === 'login' ? 'nav-main__login-login click' : 'nav-main__login-login'
                                    }
                                >
                                    로그인
                                </span>
                            </Link>
                            <Link to={{ pathname: '/signup', path: 'signup' }}>
                                <span
                                    className={
                                        path === 'signup' ? 'nav-main__login-signup click' : 'nav-main__login-signup'
                                    }
                                >
                                    회원가입
                                </span>
                            </Link>
                        </div>
                    )}
                    {(isHome || isPC) && (
                        <div className="nav-main__menu">
                            {Object.keys(Menu).map((value, index) => (
                                <div
                                    className={
                                        openMenu === value ? 'nav-main__menu-content click' : 'nav-main__menu-content'
                                    }
                                    id={value}
                                    key={index}
                                    onMouseOver={this.handleOver}
                                    onClick={this.handleOnClick}
                                >
                                    {Menu[value]}
                                </div>
                            ))}
                            <div className="nav-main__menu-input">
                                <SearchInput
                                    isNavPC
                                    searchWord={searchWord}
                                    placeholder=""
                                    handleChange={this.handleChange}
                                    getSearch={this.getSearch}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div className="nav-hover">
                        <div className="nav-hover__border">
                            {isAuthenticated && (
                                <div className="nav-hover__border-authenticated">
                                    <Link to={'/my/profile'}>
                                        <span>프로필 수정</span>
                                    </Link>
                                    <Link to={'/my/activity'}>
                                        <span>활동내역</span>
                                    </Link>
                                    <Link to={'/my/point'}>
                                        <span>별 내역</span>
                                    </Link>
                                    <button onClick={isAuthenticated ? this.signOut : () => {}}>
                                        <span>로그아웃</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="nav-hover__menu">
                            {isPC && <div className="nav-hover__menu-home"></div>}
                            {(isPC || openMenu === 'main') && (
                                <div className="nav-hover__menu-main">
                                    <Link to={{ pathname: '/article', path: 'main' }}>
                                        <span> 기사</span>
                                    </Link>
                                    <Link to={{ pathname: '/vote', path: 'main' }}>
                                        <span>투표</span>
                                    </Link>
                                </div>
                            )}
                            {(isPC || openMenu === 'Luna') && (
                                <div className="nav-hover__menu-luna">
                                    <Link to={{ pathname: '/luna/btob', path: 'Luna' }}>
                                        <span>비투비</span>
                                    </Link>
                                    <Link to={{ pathname: '/luna/help', path: 'Luna' }}>
                                        <span>청하</span>
                                    </Link>
                                    <Link to={{ pathname: '/luna/iu', path: 'Luna' }}>
                                        <span>아이유</span>
                                    </Link>
                                </div>
                            )}
                            {(isPC || openMenu === 'free') && (
                                <div className="nav-hover__menu-free">
                                    <Link to={{ pathname: '/free/daily-life', path: 'free' }}>
                                        <span> 일상 / 잡담</span>
                                    </Link>
                                    <Link to={{ pathname: '/free/hobby', path: 'free' }}>
                                        <span>취미</span>
                                    </Link>
                                    <Link to={{ pathname: '/free/life-info', path: 'free' }}>
                                        <span>생활정보</span>
                                    </Link>
                                    <Link to={{ pathname: '/free/worry', path: 'free' }}>
                                        <span>고민</span>
                                    </Link>
                                </div>
                            )}
                            {(isPC || openMenu === 'dalgona') && (
                                <div className="nav-hover__menu-dalgona">
                                    <Link to={{ pathname: '/notice', path: 'dalgona' }}>
                                        <span> 공지사항</span>
                                    </Link>
                                    <Link to={{ pathname: '/event', path: 'dalgona' }}>
                                        <span>이벤트</span>
                                    </Link>
                                </div>
                            )}
                            {isPC && <div className="nav-hover__menu-dummy"></div>}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Nav;
