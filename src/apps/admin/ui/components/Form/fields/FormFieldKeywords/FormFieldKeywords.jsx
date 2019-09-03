import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

import noop from '@tinkoff/utils/function/noop';
import trim from '@tinkoff/utils/string/trim';
import remove from '@tinkoff/utils/array/remove';

const materialStyles = {
    buttonRoot: {
        display: 'inline-flex',
        marginLeft: '15px'
    },
    keywordsRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    keywordsInput: {
        width: '100%'
    },
    metaKeyword: {
        margin: '5px 5px 5px 0'
    }
};

class FormFieldKeywords extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        schema: PropTypes.object,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.string,
        news: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired
    };

    static defaultProps = {
        schema: {},
        onChange: noop,
        onBlur: noop,
        value: ''
    };

    constructor (...args) {
        super(...args);

        const { news, name, lang, value } = this.props;
        console.log(news, name, lang, `${lang}_metaKeywords`, value);
        this.state = {
            keywords: news[name],
            keywordsInput: '',
            lang: lang
        };
    }

    componentWillReceiveProps (nextProps, nextContext) {
        const { lang } = nextProps;

        if (this.props.lang !== nextProps.lang) {
            this.setState({ lang: lang });
        }
    }

    handleKeywordAdd = () => {
        const { keywordsInput, keywords } = this.state;
        const keyword = trim(keywordsInput).replace(/\s\s+/g, ' ');

        if (!keyword) {
            return;
        }

        const splittedKeyword = keyword.split(' ');
        const keywordsArray = keywords ? keywords.split(', ') : [];
        const newKeywords = [...keywordsArray, ...splittedKeyword].filter((keyword) => !!keyword).join(', ');

        this.setState({
            keywords: newKeywords,
            keywordsInput: ''
        });

        this.props.onChange(newKeywords);
    };

    handleKeywordDelete = (i) => () => {
        const { keywords } = this.state;
        const keywordsArray = keywords.split(', ');
        const newKeywords = remove(i, 1, keywordsArray).join(', ');

        this.setState({
            keywords: newKeywords
        });

        this.props.onChange(newKeywords);
    };

    handleKeywordsChange = event => {
        event.preventDefault();

        this.setState({
            keywordsInput: event.target.value,
            keywords: this.state.keywords || ''
        });
    };

    render () {
        const { schema, classes } = this.props;
        const { keywords, keywordsInput } = this.state;

        return <div className={classes.root}>
            <div className={classes.keywordsRoot}>
                <TextField
                    label={schema.label}
                    value={keywordsInput}
                    onChange={this.handleKeywordsChange}
                    onBlur={this.props.onBlur}
                    margin='normal'
                    variant='outlined'
                    multiline={schema.multiline}
                    type={schema.type || 'text'}
                    className={classes.keywordsInput}
                />
                <div className={classes.buttonRoot}>
                    <Tooltip
                        title="Добавить ключевое слово"
                        placement='bottom'
                    >
                        <Fab
                            size='small'
                            color={schema.color || 'primary'}
                            onClick={this.handleKeywordAdd}
                            aria-label="Add"
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
            <div className={classes.keywordsWrapper}>
                {
                    keywords &&
                    keywords.split(', ').map((option, i) => <Chip
                        key={i}
                        label={option}
                        variant='outlined'
                        color='primary'
                        onDelete={this.handleKeywordDelete(i)}
                        className={classes.metaKeyword}
                    />)
                }
            </div>
        </div>;
    }
}

export default withStyles(materialStyles)(FormFieldKeywords);
