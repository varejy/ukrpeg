import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Lists from '../../components/Lists/Lists';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import noop from '@tinkoff/utils/function/noop';
import remove from '@tinkoff/utils/array/remove';
import getVideoId from 'get-video-id';

import { connect } from 'react-redux';
import getAbout from '../../../services/getAbout';
import updateAbout from '../../../services/updateAbout';

import AboutForm from '../../components/AboutForm/AboutForm';

const mapStateToProps = ({ application }) => {
    return {
        about: application.about
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAbout: payload => dispatch(getAbout(payload)),
    updateAbout: payload => dispatch(updateAbout(payload))
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
        getAbout: PropTypes.func.isRequired,
        updateAbout: PropTypes.func.isRequired,
        about: PropTypes.array
    };

    static defaultProps = {
        about: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true,
            formShowed: false,
            editableSlideInfo: {},
            removedSlides: []
        };

        this.aboutArr = [];
    }

    componentDidMount () {
        this.getAbout();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.about !== this.props.about) {
            this.aboutArr = nextProps.about;
        }
    }

    getAbout () {
        this.props.getAbout()
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    handleFileEdit = value => () => {
        const { aboutArr } = this;

        if (value === 'new') {
            this.setState({
                formShowed: true,
                editableSlideInfo: {
                    index: aboutArr.length,
                    newSlide: true
                }
            });
        } else {
            const i = value.index;
            this.setState({
                formShowed: true,
                editableSlideInfo: {
                    slide: aboutArr[i],
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

    handleFormDone = (about, index) => {
        const newSlides = [...this.aboutArr];

        newSlides[index] = about;

        this.aboutArr = newSlides;

        this.handleSubmit({ preventDefault: noop })
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
        const i = value.index;
        const { removedSlides } = this.state;

        if (this.aboutArr[i].path) {
            removedSlides.push(this.aboutArr[i].path);
        }

        this.aboutArr = remove(i, 1, this.aboutArr);

        this.setState({
            removedSlides
        });

        this.handleSubmit({ preventDefault: noop });
    };

    handleSlidesChanged = (aboutArr) => {
        this.aboutArr = aboutArr;

        this.handleSubmit({ preventDefault: noop });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { removedSlides } = this.state;
        const formData = new FormData();
        const cleanedSlides = this.aboutArr.map(aboutItem => {
            const isOld = !aboutItem.file || !aboutItem.file.content;

            return {
                texts: aboutItem.texts,
                contentType: aboutItem.contentType,
                video: aboutItem.video,
                photo: isOld && aboutItem.file || aboutItem.photo,
                removedFile: aboutItem.removedFile && aboutItem.removedFile.path
            };
        });

        this.aboutArr.forEach((aboutItem, i) => {
            if (aboutItem.file && aboutItem.file.content) {
                formData.append(`about-file-${i}`, aboutItem.file.content);
            }
        });

        formData.append('removedSlides', JSON.stringify(removedSlides));
        formData.append('about', JSON.stringify(cleanedSlides));

        return this.props.updateAbout(formData);
    };

    render () {
        const { classes } = this.props;
        const { loading, formShowed, editableSlideInfo } = this.state;
        const { aboutArr } = this;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div className={classes.wrapp}>
            <Lists
                values={aboutArr.map((aboutItem) => ({
                    ...aboutItem,
                    path: aboutItem.contentType === 'photo' ? aboutItem.photo : `//img.youtube.com/vi/${getVideoId(aboutItem.video || '').id}/0.jpg`
                }))}
                sortable
                isImage
                bigAvatar
                onDelete={this.handleFileDelete}
                onFormOpen={this.handleFileEdit}
                editValues={this.handleSlidesChanged}
                nameToolTip
                title='О блоках'
            />
            <Modal open={formShowed} onClose={this.handleClosetForm} className={classes.modal}>
                <Paper className={classes.modalContent}>
                    <AboutForm editableSlide={editableSlideInfo} onDone={this.handleFormDone} />
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(AboutPage));
