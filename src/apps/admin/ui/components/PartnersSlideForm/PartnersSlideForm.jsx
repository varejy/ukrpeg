import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './partnersFormSchema';

import pick from '@tinkoff/utils/object/pick';

const SLIDE_VALUES = ['name', 'path'];

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
            name: slide.name || '',
            logo: {
                files: slide.path ? [slide.path] : []
            },
            wrongDimensions: slide.wrongDimensions
        };

        this.state = {
            slide,
            index,
        };
    }

    handleChange = (values, changes) => {
        this.initialValues = {
            values
        };
    };

    handleSubmit = values => {
        const { index } = this.state;
        const sendValues = {
            name: values.name,
            wrongDimensions: values.wrongDimensions,
            path: values.logo.files[0]
        }
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
