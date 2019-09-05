import React, { Component } from 'react';
import Lists from '../../components/Lists/Lists';
import PartnersColection from '../../components/PartnersColection/PartnersColection';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import getAllPartners from '../../../services/getAllPartners';
import updatePartnersSlides from '../../../services/updatePartnersSlides';

const mapStateToProps = ({ application }) => {
    return {
        partners: application.partners
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAllPartners: payload => dispatch(getAllPartners(payload)),
    updatePartnersSlides: payload => dispatch(updatePartnersSlides(payload))
});

const materialStyles = theme => ({
    wrapp: {
        width: '50%',
        margin: '20px auto'
    }
});

class PartnersPage extends Component {
    constructor (...args) {
        super(...args);

        this.state = {
            partners: this.props.partners.map(slide => ({
                imgPath: slide.path || '/wrong-path',
                showed: slide.showed,
                name: slide.name
            })),
            formShowed: false
        };

        this.slidesPaths = this.state.partners.map(slide => slide.path);
    }

    componentDidMount () {
        this.props.getAllPartners();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.partners !== this.props.partners) {
            this.setState({
                partners: nextProps.slides,
                disabled: true
            });

            this.slidesPaths = nextProps.slides.map(slide => slide.path);
        }
    }

    render () {
        const { partners } = this.state;

        return <div className={classes.wrapp}>
            <Lists
                values={partners}
                sortable={true}
                isImage={true}
                nameToolTip={true}
                title='Партнёры'
            />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(PartnersPage));
