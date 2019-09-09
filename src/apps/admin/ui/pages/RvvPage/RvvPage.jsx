import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Lists from '../../components/Lists/Lists';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import getRvv from '../../../services/getRvv';
import editRvv from '../../../services/editRvv';

import noop from '@tinkoff/utils/function/noop';
import pathOr from '@tinkoff/utils/object/pathOr';
import pick from '@tinkoff/utils/object/pick';
import remove from '@tinkoff/utils/array/remove';

import RvvCardsKeyFacts from '../../components/RvvCardsKeyFacts/RvvCardsKeyFacts';
import RvvListForm from '../../components/RvvForms/RvvForms';

import { withStyles } from '@material-ui/core/styles';

import titleSchema from './schemas/titleSchema';
import titleWithImageSchema from './schemas/titleWithImageSchema';
import titleWithDescriptionSchema from './schemas/titleWithDescriptionSchema';

const RVV_FIELDS = ['plans', 'why', 'mainForces', 'composition', 'keyFacts', 'pProject', 'message'];

const materialStyles = theme => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        margin: '30px 20%',
        width: '1200px',
        backgroundColor: theme.palette.background.paper,
        border: '#e4e4e4 solid 1px',
        borderRadius: '5px',
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflowY: 'auto',
        maxHeight: '100vh'
    },
    wrapp: {
        width: '50%',
        margin: '20px auto'
    }
});

const mapStateToProps = ({ rvv }) => {
    return {
        rvvObject: rvv.rvv
    };
};

const mapDispatchToProps = (dispatch) => ({
    getRvv: payload => dispatch(getRvv(payload)),
    editRvv: payload => dispatch(editRvv(payload))
});

const formConfigMap = {
    plans: {
        schema: titleSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            lang: 'ua'
        })
    },
    why: {
        schema: titleWithImageSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            alt: pathOr(['alt'], '', values),
            avatar: {
                files: values ? [values.path] : [],
                removedFiles: []
            },
            lang: 'ua'
        })
    },
    mainForces: {
        schema: titleSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            lang: 'ua'
        })
    },
    keyFacts: {
        schema: titleWithDescriptionSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            ua_description: pathOr(['texts', 'ua', 'description'], '', values),
            en_description: pathOr(['texts', 'en', 'description'], '', values),
            lang: 'ua'
        })
    },
    pProject: {
        schema: titleWithDescriptionSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            ua_description: pathOr(['texts', 'ua', 'description'], '', values),
            en_description: pathOr(['texts', 'en', 'description'], '', values),
            lang: 'ua'
        })
    },
    message: {
        schema: titleSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            lang: 'ua'
        })
    },
    composition: {
        schema: titleSchema,
        getInitialValues: (values) => ({
            ua_title: pathOr(['texts', 'ua', 'title'], '', values),
            en_title: pathOr(['texts', 'en', 'title'], '', values),
            lang: 'ua'
        })
    }
};

class RvvPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getRvv: PropTypes.func,
        editRvv: PropTypes.func,
        rvvObject: PropTypes.object
    };

    static defaultProps = {
        rvvObject: {},
        getRvv: noop,
        editRvv: noop
    };

    constructor (...args) {
        super(...args);

        this.state = {
            tabsValue: 0,
            formVisible: false,
            editableElem: null,
            rvv: {},
            removedSlides: []
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.rvvObject !== this.props.rvvObject) {
            this.setState({
                rvv: {
                    plans: [],
                    why: [],
                    mainForces: [],
                    composition: [],
                    keyFacts: [],
                    pProject: {},
                    message: {},
                    ...pick(RVV_FIELDS, nextProps.rvvObject || {})
                }
            });
        }
    }

    componentDidMount () {
        this.props.getRvv();
    }

    handleFormOpen = (tabId, values) => (value) => () => {
        if (value === 'new') {
            this.setState({
                formVisible: true,
                editableElem: {
                    index: values.length,
                    slide: null,
                    schema: formConfigMap[tabId].schema,
                    getInitialValues: formConfigMap[tabId].getInitialValues,
                    tabId
                }
            });
        } else {
            const i = value.index;
            this.setState({
                formVisible: true,
                editableElem: {
                    value: values[i],
                    index: i,
                    schema: formConfigMap[tabId].schema,
                    getInitialValues: formConfigMap[tabId].getInitialValues,
                    tabId
                }
            });
        }
    };

    handleDelete = (tabId, values) => (value) => {
        const i = value.index;
        const { removedSlides, rvv } = this.state;

        if (values[i].path) {
            removedSlides.push(values[i].path);
        }

        this.setState({
            removedSlides,
            rvv: {
                ...rvv,
                [tabId]: remove(i, 1, values)
            }
        }, () => {
            this.handleSubmit()
                .then(this.props.getRvv);
        });
    };

    handleSlidesChanged = tabId => values => {
        const { rvv } = this.state;

        this.setState({
            rvv: {
                ...rvv,
                [tabId]: values
            }
        }, () => {
            this.handleSubmit()
                .then(this.props.getRvv);
        });
    };

    handleCloseForm = () => {
        this.setState({
            formVisible: false,
            editableElem: null
        });
    };

    handleFormDone = (value, { index, tabId }) => {
        const { rvv } = this.state;
        const newValues = [...rvv[tabId]];

        newValues[index] = value;

        this.setState({
            rvv: {
                ...rvv,
                [tabId]: newValues
            }
        }, () => {
            this.handleSubmit()
                .then(this.props.getRvv)
                .then(this.handleCloseForm);
        });
    };

    handleTextFormDone = (values, { tabId }) => {
        const { rvv } = this.state;

        this.setState({
            rvv: {
                ...rvv,
                [tabId]: values
            }
        }, () => {
            this.handleSubmit()
                .then(this.props.getRvv);
        });
    };

    handleSubmit = () => {
        const { removedSlides, rvv } = this.state;
        const formData = new FormData();
        const cleanedSlides = {
            plans: rvv.plans.map(item => ({ texts: item.texts })),
            why: rvv.why.map(item => {
                const isOld = !item.file || !item.file.content;

                return {
                    texts: item.texts,
                    ...(item.alt ? { alt: item.alt } : {}),
                    path: isOld && item.file || item.path,
                    removedFile: item.removedFile && item.removedFile.path
                };
            }),
            keyFacts: rvv.keyFacts.map(item => ({ texts: item.texts })),
            mainForces: rvv.mainForces.map(item => ({ texts: item.texts })),
            composition: rvv.composition.map(item => ({ texts: item.texts })),
            pProject: rvv.pProject,
            message: rvv.message
        };

        rvv.why.forEach((item, i) => {
            if (item.file && item.file.content) {
                formData.append(`rvv-file-${i}`, item.file.content);
            }
        });

        formData.append('removedSlides', JSON.stringify(removedSlides));
        formData.append('rvv', JSON.stringify(cleanedSlides));

        return this.props.editRvv(formData);
    };

    handleTableChange = event => () => {
        this.setState({
            tabsValue: event
        });
    };

    renderPageOne = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return <div className={classes.wrapp}>
            <Lists
                values={rvv.plans}
                sortable={true}
                numeration={true}
                maxLength={10}
                title='Планы'
                onDelete={this.handleDelete('plans', rvv.plans)}
                onFormOpen={this.handleFormOpen('plans', rvv.plans)}
                editValues={this.handleSlidesChanged('plans', rvv.plans)}
            />
        </div>;
    };

    renderPageTwo = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return <div className={classes.wrapp}>
            <Lists
                values={rvv.why}
                sortable={true}
                isImage={true}
                nameToolTip={true}
                title='Зачем нужен РВВ'
                onDelete={this.handleDelete('why', rvv.why)}
                onFormOpen={this.handleFormOpen('why', rvv.why)}
                editValues={this.handleSlidesChanged('why', rvv.why)}
            />
        </div>;
    };

    renderPageThree = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return (
            <div className={classes.modalContent}>
                <RvvListForm
                    editableElem={{
                        value: rvv.pProject,
                        tabId: 'pProject',
                        schema: formConfigMap.pProject.schema,
                        getInitialValues: formConfigMap.pProject.getInitialValues
                    }}
                    onDone={this.handleTextFormDone}
                />
            </div>
        );
    };

    renderPageFour = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return <div className={classes.wrapp}>
            <Lists
                values={rvv.mainForces}
                sortable={true}
                numeration={true}
                maxLength={9}
                title='Основные силы'
                onDelete={this.handleDelete('mainForces', rvv.mainForces)}
                onFormOpen={this.handleFormOpen('mainForces', rvv.mainForces)}
                editValues={this.handleSlidesChanged('mainForces', rvv.mainForces)}
            />
        </div>;
    };

    renderPageFive = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return <div className={classes.wrapp}>
            <RvvCardsKeyFacts
                values={rvv.keyFacts}
                tabId='keyFacts'
                title='Ключевые факты'
                maxLength={3}
                onDelete={this.handleDelete('keyFacts', rvv.keyFacts)}
                onFormOpen={this.handleFormOpen('keyFacts', rvv.keyFacts)}
                editValues={this.handleSlidesChanged('keyFacts', rvv.keyFacts)}
            />
        </div>;
    };

    renderPageSix = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return <div className={classes.wrapp}>
            <Lists
                values={rvv.composition}
                sortable={true}
                title='В состав входят'
                onDelete={this.handleDelete('composition', rvv.composition)}
                onFormOpen={this.handleFormOpen('composition', rvv.composition)}
                editValues={this.handleSlidesChanged('composition', rvv.composition)}
            />
        </div>;
    };

    renderPageSeven = () => {
        const { classes } = this.props;
        const { rvv } = this.state;

        return (
            <div className={classes.modalContent}>
                <RvvListForm
                    editableElem={{
                        value: rvv.message,
                        tabId: 'message',
                        schema: formConfigMap.message.schema,
                        getInitialValues: formConfigMap.message.getInitialValues
                    }}
                    onDone={this.handleTextFormDone}
                />
            </div>
        );
    };

    render () {
        const { classes } = this.props;
        const { tabsValue, formVisible, editableElem } = this.state;

        return <div>
            <AppBar position='static' color='default'>
                <Tabs
                    value={tabsValue}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                >
                    <Tab onClick={this.handleTableChange(0)} label='Планы' />
                    <Tab onClick={this.handleTableChange(1)} label='Зачем нужен РВВ' />
                    <Tab onClick={this.handleTableChange(2)} label='Пилотный проект' />
                    <Tab onClick={this.handleTableChange(3)} label='Основные силы' />
                    <Tab onClick={this.handleTableChange(4)} label='Ключевые факты' />
                    <Tab onClick={this.handleTableChange(5)} label='В состав входят' />
                    <Tab onClick={this.handleTableChange(6)} label='Сообщение' />
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={tabsValue}
                onChangeIndex={this.handleChangeIndex}
            >
                {this.renderPageOne(0)}
                {this.renderPageTwo(1)}
                {this.renderPageThree(2)}
                {this.renderPageFour(3)}
                {this.renderPageFive(4)}
                {this.renderPageSix(5)}
                {this.renderPageSeven(6)}
            </SwipeableViews>
            <Modal open={formVisible} onClose={this.handleCloseForm} className={classes.modal} disableEnforceFocus>
                <Paper className={classes.modalContent}>
                    <RvvListForm editableElem={editableElem} onDone={this.handleFormDone}/>
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(RvvPage));
