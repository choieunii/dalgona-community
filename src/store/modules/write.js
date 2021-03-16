import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const ADD_POST_IMAGE = 'write/ADD_POST_IMAGE'; //이미지 ADD
export const ADD_POST = 'write/ADD_POST'; //게시물 작성
export const ADD_POST_REPLY = 'write/ADD_POST_REPLY'; //투표 게시판 댓글 POST
export const UPDATE_POST_REPLY = 'write/UPDATE_POST_REPLY'; //게시판 댓글 update
export const DELETE_POST_REPLY = 'write/DELETE_POST_REPLY'; //게시판 댓글 delete
export const ADD_POST_REREPLY = 'write/ADD_POST_REREPLY'; //게시판 대댓글 POST
export const UPDATE_POST_REREPLY = 'write/UPDATE_POST_REREPLY'; //게시판 대댓글 update
export const DELETE_POST_REREPLY = 'write/DELETE_POST_REREPLY'; //게시판 대댓글 delete
export const RECOMMEND_POST_REPLY = 'write/RECOMMEND_POST_REPLY'; //댓글 추천 추가 및 취소
export const RECOMMEND_POST_REREPLY = 'write/RECOMMEND_POST_REREPLY'; //대댓글 추천 추가 및 취소

/* 액션 생성자 */
export const addPostImage = createAction(ADD_POST_IMAGE, api.addPostImage);
export const addPost = createAction(ADD_POST, api.addPost);
export const addPostReply = createAction(ADD_POST_REPLY, api.addPostReply);
export const updatePostReply = createAction(UPDATE_POST_REPLY, api.updatePostReply);
export const deletePostReply = createAction(DELETE_POST_REPLY, api.deletePostReply);
export const addPostRereply = createAction(ADD_POST_REREPLY, api.addPostRereply);
export const updatePostRereply = createAction(UPDATE_POST_REREPLY, api.updatePostRereply);
export const deletePostRereply = createAction(DELETE_POST_REREPLY, api.deletePostRereply);
export const recommendPostReply = createAction(RECOMMEND_POST_REPLY, api.recommendPostReply);
export const recommendPostRereply = createAction(RECOMMEND_POST_REREPLY, api.recommendPostRereply);

/* 초기 상태 정의 */
const initialState = Map({
    imageURL: '',
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: ADD_POST_IMAGE,
            onSuccess: (state, action) => {
                return state.set('imageURL', action.payload.data.image);
            },
            onFailure: (state, action) => {
                alert('사진 업로드 문제가 발생했습니다');
                console.log(action.payload.response.data);
                return state;
            },
        }),
        ...pender({
            type: ADD_POST,
            onSuccess: (state, action) => {
                const data = action.payload;
                console.log('gg');
                console.log(data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log('gg');
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: ADD_POST_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: UPDATE_POST_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: DELETE_POST_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: ADD_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: UPDATE_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: DELETE_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: RECOMMEND_POST_REPLY,
            onSuccess: (state, action) => {
                const data = action.payload.data;
                console.log(data);
                if (data.detail.includes('reply recommend created')) {
                    alert('추천완료');
                }
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                if (data.detail.includes('reply recommend deleted')) {
                    alert('추천취소');
                }
                return state;
            },
        }),
        ...pender({
            type: RECOMMEND_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                const data = action.payload.data;
                if (data.detail.includes('rereply recommend created')) {
                    alert('추천완료');
                }
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                if (data.detail.includes('rereply recommend deleted')) {
                    alert('추천취소');
                }
                return state;
            },
        }),
    },
    initialState
);