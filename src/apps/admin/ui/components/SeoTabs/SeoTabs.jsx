import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MetaForm from '../SeoForm/SeoForm.jsx';

import { connect } from 'react-redux';
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
    getAllStaticSeo: payload => dispatch(getAllSeo(payload))
});

class SeoTabs extends Component {
  static propTypes = {
      classes: PropTypes.object.isRequired,
      pages: PropTypes.array.isRequired,
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

    handleStaticSeoFormDone = () => {
        return this.props.getAllStaticSeo();
    };

    renderSeoForm = i => {
        const { pages, allStaticSeo } = this.props;
        const page = pages[i].page;
        const seoStaticPage = find(seoPage => seoPage.name === page, allStaticSeo);
        const seo = seoStaticPage || {};
        const values = {
            ...seo,
            name: page
        };

        return <MetaForm
            values={values}
            onDone={this.handleStaticSeoFormDone}
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
                            {this.renderSeoForm(i)}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>;
                })
            }
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(SeoTabs));
