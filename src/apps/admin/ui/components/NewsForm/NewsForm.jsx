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

import ProductAvatarFile from '../NewsAvatarFile/NewsAvatarFile.jsx';

import { connect } from 'react-redux';
import saveProduct from '../../../services/saveNews';
import editProduct from '../../../services/editNews';
import updateProductAvatar from '../../../services/updateNewsAvatar';

import noop from '@tinkoff/utils/function/noop';
import prop from '@tinkoff/utils/object/prop';
import pick from '@tinkoff/utils/object/pick';

const PRODUCTS_VALUES = ['name', 'hidden'];

const materialStyles = theme => ({
    divider: {
        marginTop: 2 * theme.spacing.unit,
        marginBottom: 2 * theme.spacing.unit
    }
});

const mapDispatchToProps = (dispatch) => ({
    saveProduct: payload => dispatch(saveProduct(payload)),
    editProduct: payload => dispatch(editProduct(payload)),
    updateProductAvatar: (...payload) => dispatch(updateProductAvatar(...payload))
});

class ProductForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        saveProduct: PropTypes.func.isRequired,
        editProduct: PropTypes.func.isRequired,
        updateProductAvatar: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        news: PropTypes.object,
        activeCategory: PropTypes.object
    };

    static defaultProps = {
        onDone: noop,
        news: {},
        activeCategory: {}
    };

    constructor (...args) {
        super(...args);

        const { news } = this.props;
        const newNews = {
            hidden: false,
            ...pick(PRODUCTS_VALUES, news)
        };

        this.state = {
            news: newNews,
            id: prop('id', news),
            initialAvatarFile: '',
            removedFiles: []
        };
    }

    getProductPayload = (
        {
            name,
            hidden,
            id
        }) => {
        return {
            name,
            hidden,
            categoryId: this.props.activeCategory.id,
            id
        };
    };

    handleSubmit = event => {
        event.preventDefault();

        const { id, news } = this.state;
        const productPayload = this.getProductPayload(news);

        (id ? this.props.editProduct({ ...productPayload, id }) : this.props.saveProduct(productPayload))
            .then(news => {
                const { avatar } = this.state;

                if (avatar.content) {
                    const formData = new FormData();

                    formData.append(`product-${news.id}-avatar`, avatar.content);

                    return this.props.updateProductAvatar(formData, news.id);
                }
            })
            .then(() => {
                this.props.onDone();
            });
    };

    handleChange = prop => event => {
        this.setState({
            news: {
                ...this.state.news,
                [prop]: event.target.value
            }
        });
    };

    handleCheckboxChange = prop => (event, value) => {
        this.setState({
            news: {
                ...this.state.news,
                [prop]: value
            }
        });
    };

    handleAvatarFileUpload = avatar => {
        this.setState({
            avatar
        });
    };

    render () {
        const { classes } = this.props;
        const { news, id, initialAvatarFile } = this.state;

        return <form onSubmit={this.handleSubmit}>
            <Typography variant='h5'>{id ? 'Редактирование новости' : 'Добавление новости'}</Typography>
            <TextField
                label='Название'
                value={news.name}
                onChange={this.handleChange('name')}
                margin='normal'
                variant='outlined'
                fullWidth
                required
            />
            <Divider className={classes.divider}/>
            <ProductAvatarFile onAvatarFileUpload={this.handleAvatarFileUpload} initialAvatarFile={initialAvatarFile}/>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={news.hidden}
                            onChange={this.handleCheckboxChange('hidden')}
                            color='primary'
                        />
                    }
                    label='Скрыть новость'
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

export default connect(null, mapDispatchToProps)(withStyles(materialStyles)(ProductForm));
