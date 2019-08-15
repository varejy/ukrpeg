import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class Content extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
    };

    render () {
        const { langMap } = this.props;
        const text = propOr('content', {}, langMap);

        return <div>
            {text.title}
        </div>;
    }
}

export default connect(mapStateToProps)(Content);
