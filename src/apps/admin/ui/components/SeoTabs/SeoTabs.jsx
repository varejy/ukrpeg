import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MetaForm from '../MetaForm/MetaForm.jsx';

import { connect } from 'react-redux';
import editCategory from '../../../services/editCategory';
import getCategories from '../../../services/getCategoriesSeo';
import updateSeo from '../../../services/updateSeo';
import getAllSeo from '../../../services/getAllSeo';
import find from '@tinkoff/utils/array/find';

const materialStyles = () => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: '15px',
        flexBasis: '33.33%',
        flexShrink: 0
    }
});

const mapStateToProps = ({ seo }) => {
    return {
        allStaticSeo: seo.allSeo
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateStaticSeo: payload => dispatch(updateSeo(payload)),
    getAllStaticSeo: payload => dispatch(getAllSeo(payload)),
    editCategory: payload => dispatch(editCategory(payload)),
    getCategories: payload => dispatch(getCategories(payload))
});

class SeoTabs extends Component {
  static propTypes = {
      classes: PropTypes.object.isRequired,
      pages: PropTypes.array.isRequired,
      editCategory: PropTypes.func.isRequired,
      getCategories: PropTypes.func.isRequired,
      updateStaticSeo: PropTypes.func.isRequired,
      getAllStaticSeo: PropTypes.func.isRequired,
      allStaticSeo: PropTypes.array
  };

  static defaultProps = {
      categories: [],
      allStaticSeo: []
  };

  constructor (props) {
      super(props);

      this.state = {
          panel: {}
      };
  }

    handleChange = panelClicked => () => {
        this.setState({ panel: {
            ...this.state.panel,
            [panelClicked]: this.state.panel[panelClicked] !== true
        }
        });
    };

    handleStaticSeoSubmit = name => meta => {
        return this.props.updateStaticSeo({ ...meta, name })
            .then(this.props.getAllStaticSeo);
    };

    handleCategorySubmit = category => meta => {
        return this.props.editCategory({ ...category, ...meta })
            .then(this.props.getCategories);
    };

    renderMetaForm = i => {
        const { pages, allStaticSeo } = this.props;

        const page = pages[i].page;
        const seoStaticPage = find(seoPage => seoPage.name === page, allStaticSeo);
        const newSeoStaticPage = {
            name: page,
            metaTitle: '',
            metaDescription: '',
            metaKeywords: ''
        };
        const seo = seoStaticPage || newSeoStaticPage;

        return <MetaForm
            metaTitle={seo.metaTitle}
            metaDescription={seo.metaDescription}
            metaKeywords={seo.metaKeywords}
            metaAutoGenerate={{ enabled: false }}
            onSubmit={this.handleStaticSeoSubmit(page)}
        />;
    };

    render () {
        const { classes, pages } = this.props;

        return <div className={classes.root}>
            {
                pages.map((page, i) => {
                    return <ExpansionPanel key={i} expanded={this.state.panel[`panel${i}`]} onClick={this.handleChange(`panel${i}`)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`panel${i}bh-content`}
                            id={`panel${i}bh-header`}
                        >
                            <Typography className={classes.heading}>{pages[i].header}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {this.renderMetaForm(i)}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>;
                })
            }
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(SeoTabs));
