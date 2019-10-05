import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lists from '../../components/Lists/Lists';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import remove from '@tinkoff/utils/array/remove';

import { connect } from 'react-redux';
import getSlides from '../../../services/getSlides';
import updateSlides from '../../../services/updateSlides';

import MainSlideForm from '../../components/MainSlideForm/MainSlideForm';

const mapStateToProps = ({ application }) => {
    return {
        slides: application.slides
    };
};

const mapDispatchToProps = (dispatch) => ({
    getSlides: payload => dispatch(getSlides(payload)),
    updateSlides: payload => dispatch(updateSlides(payload))
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

class AboutPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getSlides: PropTypes.func.isRequired,
        updateSlides: PropTypes.func.isRequired,
        slides: PropTypes.array
    };

    static defaultProps = {
        slides: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true,
            formShowed: false,
            editableSlideInfo: {},
            removedSlides: []
        };
    }

    componentDidMount () {
        this.getSlider();
    }

    getSlider () {
        this.props.getSlides()
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    handleFileEdit = value => () => {
        const { slides } = this.props;

        if (value === 'new') {
            this.setState({
                formShowed: true,
                editableSlideInfo: {
                    index: slides.length,
                    newSlide: true
                }
            });
        } else {
            const i = value.index;
            this.setState({
                formShowed: true,
                editableSlideInfo: {
                    slide: slides[i],
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

    handleFormDone = (slide, index) => {
        const newSlides = [...this.props.slides];

        newSlides[index] = slide;

        this.handleSubmit(newSlides)
            .then(() => {
                this.setState({
                    formShowed: false,
                    editableSlideInfo: null
                });
            });
    };

    handleClosetForm = () => {
        this.setState({
            formShowed: false,
            editableSlideInfo: null
        });
    };

    handleFileDelete = (value) => {
        const { slides } = this.props;
        const i = value.index;
        const { removedSlides } = this.state;

        if (slides[i].path) {
            removedSlides.push(slides[i].path);
        }

        const newSlide = remove(i, 1, slides);

        this.setState({
            removedSlides
        });

        this.handleSubmit(newSlide);
    };

    handleSlidesChanged = (slides) => {
        this.handleSubmit(slides);
    };

    handleSubmit = slides => {
        const { removedSlides } = this.state;
        const formData = new FormData();
        const cleanedSlides = slides.map(slide => {
            const isOld = !slide.photo || !slide.photo.content;

            return {
                texts: slide.texts,
                photo: isOld && slide.file || slide.photo,
                additionalPhoto: isOld && slide.additionalFile || slide.additionalPhoto,
                removedFiles: slide.removedFiles && slide.removedFiles.filter(file => !!file).map(file => file.path)
            };
        });

        slides.forEach((aboutItem, i) => {
            if (aboutItem.file && aboutItem.file.content) {
                formData.append(`slider-file-${i}`, aboutItem.file.content);
            }

            if (aboutItem.additionalFile && aboutItem.additionalFile.content) {
                formData.append(`slider-additional-file-${i}`, aboutItem.additionalFile.content);
            }
        });

        formData.append('removedSlides', JSON.stringify(removedSlides));
        formData.append('slider', JSON.stringify(cleanedSlides));

        return this.props.updateSlides(formData);
    };

    render () {
        const { classes, slides } = this.props;
        const { loading, formShowed, editableSlideInfo } = this.state;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div className={classes.wrapp}>
            <Lists
                values={slides.map(slide => ({
                    ...slide,
                    path: slide.photo
                }))}
                sortable
                isImage
                bigAvatar
                onDelete={this.handleFileDelete}
                onFormOpen={this.handleFileEdit}
                editValues={this.handleSlidesChanged}
                nameToolTip
                title='Слайды'
            />
            <Modal open={formShowed} onClose={this.handleClosetForm} className={classes.modal}>
                <Paper className={classes.modalContent}>
                    <MainSlideForm editableSlide={editableSlideInfo} onDone={this.handleFormDone} />
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(AboutPage));
