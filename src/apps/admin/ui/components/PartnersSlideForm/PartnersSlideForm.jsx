import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './partnersFormSchema';

class MainSlideForm extends Component {
    static propTypes = {
        editableSlide: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired
    };

    static defaultProps = {
        editableSlide: {}
    };

    constructor (props) {
        super(props);

        const { editableSlide: { slide, index } } = this.props;

        this.initialValues = {
            name: slide ? slide.name : '',
            avatar: {
                files: slide ? [slide.path] : [],
                removedFiles: []
            },
            wrongDimensions: slide && slide.wrongDimensions
        };

        this.state = {
            slide,
            index
        };
    }

    handleChange = values => {
        this.initialValues = {
            values
        };
    };

    handleSubmit = values => {
        const { index } = this.state;
        const sendValues = {
            name: values.name,
            file: values.avatar.files[0],
            removedFile: values.avatar.removedFiles[0]
        };

        this.props.onDone(sendValues, index);
    };

    render () {
        return <Form
            initialValues={this.initialValues}
            schema={getSchema()}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default MainSlideForm;
