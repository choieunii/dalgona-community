import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './FindIdPw.scss';

class FindIdPw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'email',
        };
    }

    handleType = (e) => {
        this.setState({ type: e.target.value });
    };

    goNext = () => {
        if (this.state.type === 'email') {
            console.log('인증 검사하기');
            console.log('인증된 경우 stage 다음으로');
            this.props.goNextStage();
        } else {
            console.log('본인인증 modal 띄우기');
            console.log('본인인증 완료시 stage 다음으로');
            this.props.goNextStage();
        }
    };
    render() {
        return (
            <div className="find-id-pw">
                <div className="find-id-pw__tab--method">
                    <input
                        type="radio"
                        id="email"
                        name="type"
                        value="email"
                        checked={this.state.type === 'email'}
                        onChange={this.handleType}
                    />
                    <label
                        htmlFor="email"
                        className={this.state.type === 'email' ? 'find-id-pw__label active' : 'find-id-pw__label'}
                    >
                        이메일로 찾기
                    </label>
                    <input
                        type="radio"
                        id="phone"
                        name="type"
                        value="phone"
                        checked={this.state.type === 'phone'}
                        onChange={this.handleType}
                    />
                    <label
                        htmlFor="phone"
                        className={this.state.type === 'phone' ? 'find-id-pw__label active' : 'find-id-pw__label'}
                    >
                        본인인증으로 찾기
                    </label>
                </div>
                <div className="find-id-pw__box">
                    {this.state.type === 'email' ? (
                        <>
                            <div className="find-id-pw__input">
                                <input type="text" placeholder="이메일을 입력해주세요." />
                                <button>인증</button>
                            </div>
                            <div className="find-id-pw__input">
                                <input type="text" placeholder="인증번호를 입력해주세요." />
                                <button>인증</button>
                            </div>
                        </>
                    ) : (
                        <p>
                            {this.props.idpw === 'id' ? '아이디' : '비밀번호'}를 찾기 위해
                            <br />
                            고객님 명의의 휴대전화로
                            <br />
                            본인인증이 필요합니다.
                        </p>
                    )}
                </div>
                <button className="find-id-pw__button--submit" onClick={this.goNext}>
                    확인
                </button>
            </div>
        );
    }
}

export default FindIdPw;