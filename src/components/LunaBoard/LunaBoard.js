import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Header from 'components/common/Header';
import BoardHotList from 'components/common/BoardHotList';
import BasicSlider from 'components/common/slider/BasicSlider';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';
import './LunaBoard.scss';

class LunaBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
        };
    }

    handlePage = (e) => {
        const { history, location } = this.props;
        const query = queryString.parse(location.search);
        const page = e.target.value;
        const { pathname } = location;
        //searchType:title, searchWord, page
        if (query.search) {
            //url에서 searchWord있는지 판별
            history.push(`${pathname}?page=${page}&search=${query.search}`);
        } else {
            history.push(`${pathname}?page=${page}`);
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    getSearch = () => {
        //검색하기
        const { searchWord } = this.state;
        const { pathname } = this.props.location;
        if (searchWord.trim() === '') {
            alert('검색어를 입력해주세요.');
        } else {
            this.props.history.push(`${pathname}?page=1&search=${searchWord}`);
        }
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { boardInfo, bookmark, bestPostList, postCount, postList, updateBookmark } = this.props;

        return (
            <div className="luna-board">
                <Header
                    title={boardInfo.board_name}
                    hasWrite
                    hasBookmark
                    isBookmarked
                    updateBookmark={updateBookmark}
                    searchWord={this.state.searchWord}
                    handleChange={this.handleChange}
                    placeholder="글 제목을 검색하세요"
                    getSearch={this.getSearch}
                />
                <section className="luna-board__container--hot">
                    <h4>인기글</h4>
                    <div className="only-pc">
                        <BoardHotList link={`luna/board_url`} hotPostList={bestPostList} />
                    </div>
                    <div className="not-pc">
                        <BasicSlider>
                            {bestPostList.map((post) => {
                                return <PostList key={post.id} postList={[post]} noBorder />;
                            })}
                        </BasicSlider>
                    </div>
                </section>
                <div className="border_line" />
                <PostList link={`/luna/${boardInfo.board_url}`} hasGrid postList={postList} />
                <section className="only-pc luna-board__container--btn">
                    <Link to={`/write`}>글쓰기</Link>
                </section>
                <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
            </div>
        );
    }
}

export default LunaBoard;
