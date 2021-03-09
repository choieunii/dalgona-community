import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as freeActions from 'store/modules/free';
import * as writeActions from 'store/modules/write';
import Write from 'components/Write';

class WriteContainer extends Component {
    addPostImage = async (formdata, func) => {
        const { FreeActions } = this.props;
        try {
            await FreeActions.addPostImage(formdata);
        } catch (e) {
            console.log('error log:' + e);
        }
        func(this.props.imageURL);
    };

    addPost = async (title, body, boardUrl, anonymous) => {
        console.log(title, body, boardUrl, anonymous);
        const { WriteActions, history, match } = this.props;
        try {
            await WriteActions.addPost(title, body, boardUrl, anonymous);
        } catch (e) {
            console.log('error log:' + e);
        }
        //if (this.props.post_success) history.push(`/luna/${match.params.board_url}`);
    };
    render() {
        return (
            <Fragment>
                <Write
                    history={this.props.history}
                    match={this.props.match}
                    addPostImage={this.addPostImage}
                    addPost={this.addPost}
                    isAuthenticated={this.props.isAuthenticated}
                    post_success={this.props.post_success}
                />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        imageURL: state.free.get('imageURL'),
        loading: state.pender.pending['free/ADD_POST_IMAGE'],
        post_loading: state.pender.pending['write/ADD_POST'],
        img_success: state.pender.success['free/ADD_POST_IMAGE'],
        post_success: state.pender.success['write/ADD_POST'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        FreeActions: bindActionCreators(freeActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(WriteContainer);
