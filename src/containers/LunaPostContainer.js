import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as lunaActions from 'store/modules/luna';
import LunaPost from 'components/LunaPost';

class LunaPostContainer extends Component {
    addPostImage = async (formdata, func) => {
        const { FreeActions } = this.props;
        try {
            await FreeActions.addPostImage(formdata);
        } catch (e) {
            console.log('error log:' + e);
        }
        func(this.props.imageURL);
    };
    getPostInfo = async (postId) => {
        const { location, LunaActions } = this.props;
        const tmp = location.pathname.split('/');
        console.log(tmp[2]);
        try {
            await LunaActions.getPostInfo(tmp[2], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid) => {
        const { LunaActions } = this.props;
        try {
            await LunaActions.getPostReply(postid);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        const postid = this.props.match.params.postid;
        //console.log(this.props.match.params.postid);
        this.getPostInfo(postid);
        this.getPostReply(postid);
    }

    render() {
        console.log('home container');
        return (
            <Fragment>
                <LunaPost
                    history={history}
                    postid={this.props.match.params.postid}
                    addPostImage={this.addPostImage}
                    getPostInfo={this.getPostInfo}
                    postInfo={this.props.postInfo}
                    postReplyList={this.props.postReplyList}
                />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        imageURL: state.luna.get('imageURL'),
        postInfo: state.luna.get('postInfo'),
        postReplyList: state.luna.get('postReplyList'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        LunaActions: bindActionCreators(lunaActions, dispatch),
    })
)(LunaPostContainer);
