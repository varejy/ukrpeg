import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Form from '../Form/Form';

import getSchema from './partnersFormSchema';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import pick from '@tinkoff/utils/object/pick';

const SLIDE_VALUES = ['name', 'path'];

const materialStyles = theme => ({
    uploadInput: {
        display: 'none'
    },
    upload: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing.unit
    },
    uploadIcon: {
        marginLeft: theme.spacing.unit
    },
    imageWrapper: {
        marginTop: '20px',
        width: '100%'
    },
    image: {
        width: '100%'
    },
    warning: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px'
    },
    warningIcon: {
        color: '#ffae42',
        marginRight: '10px'
    },
    errorIcon: {
        color: '#f44336',
        marginRight: '10px'
    },
    warningText: {
        fontSize: '16px'
    },
    fileImageError: {
        outline: 'solid 4px #f44336'
    }
});

const SLIDE_WIDTH = 240;
const SLIDE_HEIGHT = 135;

class MainSlideForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        editableSlideInfo: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired
    };

    constructor (...args) {
        super(...args);

        const { editableSlideInfo } = this.props;
        const slide = {
            ...pick(SLIDE_VALUES, editableSlideInfo.slide)
        };

        this.oldSlidePath = slide.path;

        this.initialValues = {
            name: editableSlideInfo.name,
            logo: {
                files: editableSlideInfo.path ? [editableSlideInfo.path] : []
            }
        };

        this.state = {
            slide: slide,
            index: editableSlideInfo.index,
            isWrongDimensions: false
        };
    }

    handleChange = prop => event => {
        this.setState({
            slide: {
                ...this.state.slide,
                [prop]: event.target.value
            }
        });
    };

    handleFileLoad = (event) => {
        if (event.target.naturalWidth !== SLIDE_WIDTH || event.target.naturalHeight !== SLIDE_HEIGHT) {
            this.setState({
                isWrongDimensions: true
            });
        } else {
            this.setState({
                isWrongDimensions: false
            });
        }
    };

    handleFileUpload = (event) => {
        this.setState({
            slide: {
                ...this.state.slide,
                content: event.target.files[0],
                path: URL.createObjectURL(event.target.files[0]),
                oldSlidePath: this.oldSlidePath
            }
        });

        event.target.value = '';
    };

    handleSubmit = values => {
        values.preventDefault();

        console.log(value)

        const { index } = this.state;

        this.props.onDone({
            values,
            index
        });
    };

    render () {
        return <Form
            initialValues={this.initialValues}
            schema={getSchema()}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default withStyles(materialStyles)(MainSlideForm);
