import React from 'react';

import photoIcon from 'images/photo.png';

import './CommentInput.scss';

const CommentInput = (props) => {
    let fileInput = React.createRef();

    const selectImg = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            props.setImage(file);
            props.setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onClickSelect = (e) => {
        fileInput.current.click();
    };

    return (
        <div className="comment-input">
            {props.previewURL && (
                <div className="comment-input__preview">
                    <div className="comment-input__preview--background" />
                    <img src={props.previewURL} alt="preview" />
                    <button onClick={props.deleteImg}>X</button>
                </div>
            )}
            <div>
                <textarea
                    className="comment-input__input"
                    value={props.commentText}
                    onChange={props.handleComment}
                    placeholder="댓글을 입력하세요."
                />
            </div>
            <div className="comment-input--bottom">
                <div>
                    <span>
                        <input type="checkbox" checked={props.isAnonymous} onChange={props.handleAnonymous} />
                        익명
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        onChange={selectImg}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                    />
                    <button onClick={onClickSelect}>
                        <img src={photoIcon} alt="photoIcon" /> 파일선택
                    </button>
                </div>
                <div>
                    <button className="comment-input__button--submit">등록하기</button>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
