import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import NoticeBoardContainer from 'containers/NoticeBoardContainer';

const NoticeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <NoticeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticeBoardPage;