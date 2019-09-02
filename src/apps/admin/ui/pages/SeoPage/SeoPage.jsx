import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

import SeoTabs from '../../components/SeoTabs/SeoTabs.jsx';
import getAllSeo from '../../../services/getAllSeo';

const materialStyles = () => ({
    paper: {
        padding: '0 24px 24px 24px'
    },
    container: {
        padding: '24px 0',
        width: '100%'
    },
    headerContainer: {
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    loader: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchWrapp: {
        display: 'flex',
        marginTop: '15px',
        flexDirection: 'column',
        alignItems: 'center'
    },
    search: {
        width: '350px'
    },
    products: {
        padding: '48px'
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '45px'
    },
    card: {
        maxWidth: '345px',
        border: '1px solid transparent',
        cursor: 'pointer',
        paddingBottom: '16px'
    },
    cardLink: {
        textDecoration: 'none',
        margin: '20px 10px',
        width: '254px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundSize: '190px'
    },
    selectedProduct: {
        border: '1px solid rgb(63, 80, 181)'
    }
});

const PAGES = [
    { header: 'Головна', page: 'main' },
    { header: 'Про нас', page: 'about' },
    { header: 'Новини', page: 'news' },
    { header: 'Рвв', page: 'rvv' },
    { header: 'Законодавства', page: 'contacts' },
    { header: 'Контакти', page: 'contacts' }
];
const mapStateToProps = ({ application }) => {
    return {
        categories: application.categories
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAllSeo: payload => dispatch(getAllSeo(payload))
});

class SeoPage extends Component {
  static propTypes = {
      classes: PropTypes.object.isRequired,
      getAllSeo: PropTypes.func.isRequired,
      products: PropTypes.array
  };

    static defaultProps = {
        products: [],
        categories: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true
        };
    }

    componentDidMount () {
        this.props.getAllSeo()
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    renderEditPagesSeo = () => {
        const { classes } = this.props;

        return <div>
            <Paper className={classes.paper}>
                <div className={classes.headerContainer}>
                    <Typography variant='h6' id='seoTitle'>SEO</Typography>
                </div>
                <SeoTabs pages={PAGES} option='staticSeo'/>
            </Paper>
        </div>;
    };

    render () {
        const { classes } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div className={classes.container}>
            {this.renderEditPagesSeo()}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(SeoPage));
