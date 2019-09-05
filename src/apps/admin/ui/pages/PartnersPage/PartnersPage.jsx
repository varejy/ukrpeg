import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lists from '../../components/Lists/Lists';
import PartnersColection from '../../components/PartnersColection/PartnersColection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import noop from '@tinkoff/utils/function/noop';

import { connect } from 'react-redux';
import getAllPartners from '../../../services/getAllPartners';
import updatePartnersSlides from '../../../services/updatePartnersSlides';

import PartnersSlideForm from '../../components/PartnersSlideForm/PartnersSlideForm';

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
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        position: 'absolute',
        width: '1200px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflowY: 'auto',
        maxHeight: '100vh'
    }
});

class PartnersPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getAllPartners: PropTypes.func.isRequired,
        updatePartnersSlides: PropTypes.func.isRequired,
        partners: PropTypes.array
    };

    static defaultProps = {
        partners: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true,
            formShowed: false,
            editableSlideInfo: {}
        };
    }

    componentDidMount () {
        this.props.getAllPartners()
            .then(() => {
                this.setState({
                    partners: this.props.partners.map(partner => ({
                        path: partner.path || '/wrong-path',
                        showed: partner.showed || true,
                        name: partner.name || ''
                    })),
                    loading: false
                })
            })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.partners !== this.props.partners) {
            this.setState({
                partners: nextProps.partners,
                disabled: true
            })
        }
    }

    handleFileEdit = i => () => {
        const { partners } = this.state;

        this.setState({
            formShowed: true,
            editableSlideInfo: {
                slide: partners[i],
                index: i
            }
        });
    };

    handleClosetForm = () => {
        this.setState({
            formShowed: false,
            editableSlideInfo: null
        });
    };

    handleFormDone = (partner, index) => {
        const { partners } = this.state;
        const newSlides = [...partners];

        newSlides[index] = partner;

        this.setState({
            partners: newSlides
        }, () => {
            this.handleSubmit({ preventDefault: noop })
                .then(() => {
                    this.setState({
                        formShowed: false,
                        editableSlideInfo: null
                    });
                });
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { partners, removedSlides } = this.state;
        const formData = new FormData();
        const cleanedSlides = partners.map(partner => {
            const isOld = !partner.content;

            return {
                name: partner.title,
                path: isOld && partner.path,
                oldSlidePath: partner.oldSlidePath
            };
        });

        partners.forEach((file, i) => {
            if (file.content) {
                formData.append(`slide-file-${i}`, file.content);
            }
        });
        
        formData.append('slides', JSON.stringify(cleanedSlides));

        return this.props.updatePartnersSlides(formData);
    };

    render () {
        const { classes } = this.props;
        const { partners, loading, formShowed, editableSlideInfo } = this.state;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div className={classes.wrapp}>
            <Lists
                values={partners}
                sortable={true}
                isImage={true}
                onFormOpen={this.handleFileEdit}
                nameToolTip={true}
                title='Партнёры'
            />
            <PartnersColection/>
            <Modal open={formShowed} onClose={this.handleClosetForm} className={classes.modal}>
                <Paper className={classes.modalContent}>
                    <PartnersSlideForm editableSlide={editableSlideInfo} onDone={this.handleFormDone}/>
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(PartnersPage));
