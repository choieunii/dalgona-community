import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { termsCommunity } from 'constants/index.js';
import { termsPrivate } from 'constants/index.js';
import mobileCheckBox from 'images/mobile-checkbox.png';
import clickMobileCheckBox from 'images/click-mobile-checkbox.png';
import step1 from 'images/step1.png';
import './SignUpAgree.scss';

const SignUpAgree = ({ handleAgreeConfirm }) => {
    const [agree, setAgree] = useState(false);
    const [checkAgreeOne, setCheckAgreeOne] = useState(false);
    const [checkAgreeTwo, setCheckAgreeTwo] = useState(false);
    const [checkAgreeThree, setCheckAgreeThree] = useState(false);

    const onClickAgree = () => {
        setAgree(!agree);
        setCheckAgreeOne(!agree);
        setCheckAgreeTwo(!agree);
        setCheckAgreeThree(!agree);
        handleAgreeConfirm();
    };

    const onClickCheckAgreeOne = () => {
        setCheckAgreeOne(!checkAgreeOne);
        if (agree || (checkAgreeTwo && checkAgreeThree)) {
            setAgree(!agree);
            handleAgreeConfirm();
        }
    };
    const onClickCheckAgreeTwo = () => {
        setCheckAgreeTwo(!checkAgreeTwo);
        if (agree || (checkAgreeOne && checkAgreeThree)) {
            setAgree(!agree);
            handleAgreeConfirm();
        }
    };
    const onClickCheckAgreeThree = () => {
        setCheckAgreeThree(!checkAgreeThree);
        if (agree || (checkAgreeTwo && checkAgreeOne)) {
            setAgree(!agree);
            handleAgreeConfirm();
        }
    };

    return (
        <div className="signupagree">
            <div className="signupagree__title">
                <span className="not-pc">01 </span>
                <span>약관동의</span>
            </div>
            <div className="not-pc">
                <img src={step1}></img>
            </div>
            <div className="signupagree__button">
                <button
                    className={agree ? 'signupagree__button click' : 'signupagree__button noclick'}
                    onClick={onClickAgree}
                >
                    모두 동의함(만 14세 이상)
                </button>
            </div>
            <div className="signupagree__content">
                <div className="signupagree__content-agree">
                    <span>달고나 이용약관 동의 [필수]</span>
                    <div className="signupagree__content-agree-check box">
                        <img
                            src={checkAgreeOne ? clickMobileCheckBox : mobileCheckBox}
                            onClick={onClickCheckAgreeOne}
                        ></img>
                        <span>동의함</span>
                    </div>
                </div>
                <pre className="terms-box">{termsCommunity}</pre>
            </div>
            <div className="signupagree__content">
                <div className="signupagree__content-agree">
                    <span>개인정보 수집 및 이용 동의 [필수]</span>
                    <div className="signupagree__content-agree-check">
                        <img
                            src={checkAgreeTwo ? clickMobileCheckBox : mobileCheckBox}
                            onClick={onClickCheckAgreeTwo}
                        ></img>
                        <span className="signupagree__content-agree-check box">동의함</span>
                    </div>
                </div>
                <pre className="terms-box">{termsPrivate}</pre>
            </div>
            <div className="signupagree__content">
                <div className="signupagree__content-agree">
                    <span>만 14세 이상입니다. [필수]</span>
                    <div className="signupagree__content-agree-check box">
                        <img
                            src={checkAgreeThree ? clickMobileCheckBox : mobileCheckBox}
                            onClick={onClickCheckAgreeThree}
                        ></img>
                        <span>동의함</span>
                    </div>
                </div>
                <div className="signupagree__content-impossible">
                    만 14세 미만 고객님은 해당 서비스를 이용할 수 없습니다.
                </div>
            </div>
        </div>
    );
};

export default SignUpAgree;
