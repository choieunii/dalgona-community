import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import LunaBoardContainer from 'containers/LunaBoardContainer';

const LunaBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <LunaBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaBoardPage;
