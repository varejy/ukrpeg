import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import saveNewsCategory from '../../../services/saveNewsCategory';
import editNewsCategory from '../../../services/editNewsCategory';

import noop from '@tinkoff/utils/function/noop';
import prop from '@tinkoff/utils/object/prop';
import pick from '@tinkoff/utils/object/pick';

const CATEGORIES_VALUES = ['name', 'id', 'hidden', 'positionIndex'];

const materialStyles = theme => ({
    divider: {
        marginTop: 2 * theme.spacing.unit,
        marginBottom: 2 * theme.spacing.unit
    }
});

const mapDispatchToProps = (dispatch) => ({
    saveNewsCategory: payload => dispatch(saveNewsCategory(payload)),
    editNewsCategory: payload => dispatch(editNewsCategory(payload))
});

class NewsCategoryForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        saveNewsCategory: PropTypes.func.isRequired,
        editNewsCategory: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        category: PropTypes.object,
        categories: PropTypes.array

    };

    static defaultProps = {
        onDone: noop,
        category: {},
        categories: []
    };

    constructor (...args) {
        super(...args);

        const { category } = this.props;
        const newCategory = {
            hidden: false,
            ...pick(CATEGORIES_VALUES, category)
        };

        this.state = {
            category: newCategory,
            id: prop('id', category),
            initialAvatarFile: category.avatar,
            initialFiles: category.files,
            removedFiles: []
        };
    }

    getCategoryPayload = (
        {
            name,
            hidden,
            id
        }) => {
        return {
            name,
            hidden,
            id
        };
    };

    handleSubmit = event => {
        event.preventDefault();

        const { id, category } = this.state;
        const categoryPayload = this.getCategoryPayload(category);

        (
            id
                ? this.props.editNewsCategory({ ...categoryPayload, id })
                : this.props.saveNewsCategory({
                    ...categoryPayload,
                    positionIndex: this.props.categories.length
                })
        )
            .then(this.props.onDone());
    };

    handleChange = prop => event => {
        this.setState({
            category: {
                ...this.state.category,
                [prop]: event.target.value
            }
        });
    };

    handleCheckboxChange = prop => (event, value) => {
        this.setState({
            category: {
                ...this.state.category,
                [prop]: value
            }
        });
    };

    render () {
        const { classes } = this.props;
        const { category, id } = this.state;

        return <form onSubmit={this.handleSubmit}>
            <Typography variant='h5'>{id ? 'Редактирование категории' : 'Добавление новой категории'}</Typography>
            <TextField
                label='Название'
                value={category.name}
                onChange={this.handleChange('name')}
                margin='normal'
                variant='outlined'
                fullWidth
                required
            />
            <Divider className={classes.divider}/>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={category.hidden}
                            onChange={this.handleCheckboxChange('hidden')}
                            color='primary'
                        />
                    }
                    label='Скрыть категорию'
                />
            </div>
            <FormControl margin='normal'>
                <Button variant='contained' color='primary' type='submit'>
                    Сохранить
                </Button>
            </FormControl>
        </form>;
    }
}

export default connect(null, mapDispatchToProps)(withStyles(materialStyles)(NewsCategoryForm));
