import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as authActions from 'store/modules/auth';
import * as issueActions from 'store/modules/issue';
import Vote from 'components/Vote';

class VoteContainer extends Component {
    getVoteInfo = async (boardUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.getVoteInfo(boardUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getVoteReply = async (boardUrl, params) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.getVoteReply(boardUrl, params);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    postVoteReply = async (formData) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.postVoteReply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    updateVoteReply = async (formdata, replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.updateVoteReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    deleteVoteReply = async (replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.deleteVoteReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    postVoteRereply = async (voteboardreply_id, content, voterereply_image, anonymous) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.postVoteRereply(voteboardreply_id, content, voterereply_image, anonymous);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    updateVoteRereply = async (formdata, replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.updateVoteRereply(formdata, replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    deleteVoteRereply = async (reReplyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.deleteVoteRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    replyRecommend = async (replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.replyRecommend(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    reReplyRecommend = async (reReplyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.reReplyRecommend(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    voteReply = (boardUrl, page) => {
        let params = {};
        params['page'] = page;
        this.getVoteReply(boardUrl, params);
    };

    componentDidMount() {
        const voteid = this.props.match.params.voteid;
        console.log(voteid);
        this.getVoteInfo(voteid);
        this.voteReply(voteid, 1);
    }
    render() {
        const {
            history,
            voteInfo,
            info_loading,
            reply_loading,
            info_success,
            post_delete_success,
            voteReplyList,
            reply_list_success,
            voteReplyCount,
            reply_success,
            isAuthenticated,
        } = this.props;
        return (
            <Fragment>
                <Vote
                    history={history}
                    location={location}
                    voteInfo={voteInfo}
                    voteReplyList={voteReplyList}
                    isAuthenticated={isAuthenticated}
                    reply_success={reply_success}
                    voteReplyCount={voteReplyCount}
                    voteid={this.props.match.params.voteid}
                    getVoteInfo={this.getVoteInfo}
                    voteReply={this.voteReply}
                    postVoteReply={this.postVoteReply}
                    updateVoteReply={this.updateVoteReply}
                    deleteVoteReply={this.deleteVoteReply}
                    postVoteRereply={this.postVoteRereply}
                    updateVoteRereply={this.updateVoteRereply}
                    deleteVoteRereply={this.deleteVoteRereply}
                    replyRecommend={this.replyRecommend}
                    reReplyRecommend={this.reReplyRecommend}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        voteInfo: state.issue.get('voteInfo'),
        voteReplyList: state.issue.get('voteReplyList'),
        voteReplyCount: state.issue.get('voteReplyCount'),
        info_loading: state.pender.pending['issue/VOTE_INFO'],
        reply_loading: state.pender.pending['issue/GET_VOTE_REPLY'],
        info_success: state.pender.success['issue/VOTE_INFO'],
        reply_list_success: state.pender.success['issue/GET_VOTE_REPLY'],
        reply_success: state.pender.success['issue/POST_VOTE_REPLY'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        IssueActions: bindActionCreators(issueActions, dispatch),
    })
)(VoteContainer);
