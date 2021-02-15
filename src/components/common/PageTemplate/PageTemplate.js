import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

import './PageTemplate.scss';

const PageTemplate = ({ header, children }) => {
    return (
        <div className="page-template">
            <header>
                <Header />
            </header>
            <main>{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default PageTemplate;
