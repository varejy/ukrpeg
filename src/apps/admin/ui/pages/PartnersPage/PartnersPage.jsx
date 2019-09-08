import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lists from '../../components/Lists/Lists';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import noop from '@tinkoff/utils/function/noop';
import remove from '@tinkoff/utils/array/remove';

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
            editableSlideInfo: {},
            removedSlides: []
        };

        this.partners = [];
    }

    componentDidMount () {
        this.getAllPartners();
    }

    getAllPartners () {
        this.props.getAllPartners()
            .then(() => {
                this.setState({
                    loading: false
                });
                this.partners = this.props.partners.map(partner => ({
                    path: partner.path || '/wrong-path',
                    showed: partner.showed || true,
                    name: partner.name || ''
                }));
            });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.partners !== this.props.partners) {
            this.setState({
                disabled: true
            });
            this.partners = nextProps.partners;
        }
    }

    handleFileEdit = value => () => {
        const { partners } = this;

        if (value === 'new') {
            this.setState({
                formShowed: true,
                editableSlideInfo: {
                    index: partners.length,
                    newSlide: true
                }
            });
        } else {
            const i = value.index;
            this.setState({
                formShowed: true,
                editableSlideInfo: {
                    slide: partners[i],
                    index: i
                }
            });
        }
    };

    handleClosetForm = () => {
        this.setState({
            formShowed: false,
            editableSlideInfo: null
        });
    };

    handleFormDone = (partner, index) => {
        const newSlides = [...this.partners];

        newSlides[index] = partner;

        this.partners = newSlides;

        this.handleSubmit({ preventDefault: noop })
            .then(() => {
                this.setState({
                    formShowed: false,
                    editableSlideInfo: null
                });
            });
    };

    handleFileDelete = (value) => {
        const i = value.index;
        const { removedSlides } = this.state;

        if (this.partners[i].path) {
            removedSlides.push(this.partners[i].path);
        }

        this.partners = remove(i, 1, this.partners);

        this.setState({
            removedSlides
        });

        this.handleSubmit({ preventDefault: noop });
    };

    handleSlidesChanged = (partners) => {
        this.partners = partners;

        this.handleSubmit({ preventDefault: noop });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { removedSlides } = this.state;
        const formData = new FormData();
        const cleanedSlides = this.partners.map(partner => {
            const isOld = !partner.file || !partner.file.content;

            return {
                name: partner.name,
                path: isOld && partner.file || partner.path,
                removedFile: partner.removedFile && partner.removedFile.path
            };
        });

        this.partners.forEach((partner, i) => {
            if (partner.file && partner.file.content) {
                formData.append(`partner-file-${i}`, partner.file.content);
            }
        });

        formData.append('removedSlides', JSON.stringify(removedSlides));
        formData.append('partners', JSON.stringify(cleanedSlides));

        return this.props.updatePartnersSlides(formData);
    };

    render () {
        const { classes } = this.props;
        const { loading, formShowed, editableSlideInfo } = this.state;
        const { partners } = this;

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
                bigAvatar={true}
                onDelete={this.handleFileDelete}
                onFormOpen={this.handleFileEdit}
                editValues={this.handleSlidesChanged}
                nameToolTip={true}
                title='Партнёры'
            />
            <Modal open={formShowed} onClose={this.handleClosetForm} className={classes.modal}>
                <Paper className={classes.modalContent}>
                    <PartnersSlideForm editableSlide={editableSlideInfo} onDone={this.handleFormDone} />
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(PartnersPage));
