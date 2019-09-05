import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CloseIcon from '@material-ui/icons/Close';
import ReorderIcon from '@material-ui/icons/Reorder';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import FolderIcon from '@material-ui/icons/Folder';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import arrayMove from '../../../utils/arrayMove';

import { connect } from 'react-redux';
import getCategories from '../../../services/getCategories';
import editNewsCategory from '../../../services/editNewsCategory';
import deleteCategoriesByIds from '../../../services/deleteCategoriesByIds';
import deleteNewsByIds from '../../../services/deleteNewsByIds';
import getNewsAll from '../../../services/getNewsAll';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import noop from '@tinkoff/utils/function/noop';
import pathOr from '@tinkoff/utils/object/pathOr';

import AdminTable from '../../components/AdminTable/AdminTable.jsx';
import NewsForm from '../../components/NewsForm/NewsForm';
import NewsCategoryForm from '../../components/NewsCategoryForm/NewsCategoryForm';

const ButtonSortable = SortableHandle(({ classes }) => (
    <ReorderIcon className={classes.buttonSortable}> reorder </ReorderIcon>
));

const ItemSortable = SortableElement(({ onFormOpen, onCategoryDelete, name, onCategoryClick, value, classes }) => (
    <ListItem onClick={onCategoryClick(value)} button className={classes.row}>
        <ButtonSortable classes={classes}/>
        <ListItemIcon>
            <FolderIcon />
        </ListItemIcon>
        <ListItemText
            className={classes.listItemText}
            primary={name}
        />
        <div className={classes.valueActions}>
            <ListItemSecondaryAction>
                <IconButton onClick={onFormOpen(value)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={onCategoryDelete(value)} edge="end" aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </div>
    </ListItem>
));

const SortableWrapp = SortableContainer((
    {
        newsCategory,
        ...rest
    }) =>
    <List>
        {
            newsCategory.map((value, i) => {
                const name = pathOr(['texts', DEFAULT_LANG, 'name'], '', value);

                return <ItemSortable key={i} name={name} value={value} index={i} {...rest}/>;
            })
        }
    </List>
);

const mapStateToProps = ({ application, news }) => {
    return {
        categories: application.newsCategories,
        news: news.news
    };
};

const mapDispatchToProps = (dispatch) => ({
    getCategories: payload => dispatch(getCategories(payload)),
    deleteCategories: payload => dispatch(deleteCategoriesByIds(payload)),
    deleteNews: payload => dispatch(deleteNewsByIds(payload)),
    editNewsCategory: payload => dispatch(editNewsCategory(payload)),
    getNewsAll: payload => dispatch(getNewsAll(payload))
});

const materialStyles = theme => ({
    root: {
        display: 'flex',
        height: '911px'
    },
    drawer: {
        width: '400px',
        flexShrink: 0
    },
    drawerPaper: {
        top: '0px',
        width: '400px',
        position: 'relative'
    },
    content: {
        flexGrow: 1,
        padding: '30px'
    },
    toolbar: {
        height: '0px'
    },
    toolbarNav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 30px 5px 30px'
    },
    categoryTitle: {
        height: '30px'
    },
    buttonSortable: {
        position: 'relative',
        marginRight: '12px',
        cursor: 'pointer'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        backgroundColor: 'white',
        zIndex: 1201,
        '&:hover $valueActions': {
            visibility: 'visible'
        },
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.07)'
        }
    },
    valueActions: {
        visibility: 'hidden'
    },
    listItemText: {
        cursor: 'default'
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

const DEFAULT_LANG = 'ua';

const headerRows = [
    { id: 'name', label: 'Название' },
    { id: 'data', label: 'Дата' },
    { id: 'active', label: 'Active' }
];

const tableCells = [
    { prop: news => pathOr(['texts', DEFAULT_LANG, 'name'], '', news) },
    { prop: news => news.date },
    { prop: news => news.hidden ? <CloseIcon /> : <CheckIcon /> }
];

const DEFAULT_ACTIVE_CATEGORY = {
    name: '',
    id: ''
};

class NewsPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired,
        getCategories: PropTypes.func.isRequired,
        deleteCategories: PropTypes.func.isRequired,
        deleteNews: PropTypes.func.isRequired,
        editNewsCategory: PropTypes.func.isRequired,
        getNewsAll: PropTypes.func,
        news: PropTypes.array
    };

    static defaultProps = {
        categories: [],
        news: [],
        getCategories: noop,
        deleteCategories: noop,
        editNewsCategory: noop,
        getNewsAll: noop
    };

    constructor (...args) {
        super(...args);

        this.state = {
            activeNewsCategory: DEFAULT_ACTIVE_CATEGORY,
            formShowed: false,
            categoryFormShowed: false,
            editableCategory: {},
            editableNews: {},
            newsCategories: [],
            news: [],
            valueForDelete: null
        };
    }

    getCategoryNews = (activeCategory = this.state.activeNewsCategory) => {
        return this.props.news.filter(news => news.categoryId === activeCategory.id);
    }

    componentDidMount () {
        Promise.all([
            this.props.getNewsAll(),
            this.props.getCategories()
        ])
            .then(() => {
                this.setState({
                    newsCategories: this.props.categories,
                    activeNewsCategory: this.props.categories[0] || DEFAULT_ACTIVE_CATEGORY,
                    news: this.getCategoryNews(this.props.categories[0])
                });
            });
    }

    handleNewsFormOpen = news => () => {
        this.setState({
            formShowed: true,
            editableNews: news
        });
    };

    handleCategoryFormOpen = category => () => {
        this.setState({
            categoryFormShowed: true,
            editableCategory: category
        });
    };

    handleCategoryFormDone = () => {
        const { activeNewsCategory } = this.state;

        this.props.getCategories()
            .then(() => {
                const { categories } = this.props;

                this.setState({
                    newsCategories: categories,
                    activeNewsCategory: categories.find(category => category.id === activeNewsCategory.id)
                });
                this.handleCloseCategoryForm();
            });
    };

    handleNewsFormDone = () => {
        this.props.getNewsAll()
            .then(() => {
                this.setState({
                    news: this.getCategoryNews()
                });
                this.handleCloseNewsForm();
            });
    };

    handleCategoryDelete = (category) => () => {
        this.setState({
            valueForDelete: category
        });
    };

    handleNewsDelete = (news) => {
        this.props.deleteNews(news)
            .then(() => {
                this.props.getNewsAll()
                    .then(() => {
                        this.setState({
                            news: this.getCategoryNews()
                        });
                    });
            });
    };

    handleWarningDisagree = () => {
        this.setState({
            valueForDelete: null
        });
    };

    handleWarningAgree = () => {
        const { valueForDelete, activeNewsCategory } = this.state;

        this.props.deleteCategories(valueForDelete.id)
            .then(() => {
                this.setState({
                    newsCategories: this.props.categories,
                    activeNewsCategory: activeNewsCategory === valueForDelete && DEFAULT_ACTIVE_CATEGORY,
                    valueForDelete: null
                });
            });
    };

    handleCloseNewsForm = () => {
        this.setState({
            formShowed: false,
            editableNews: null
        });
    };

    handleCloseCategoryForm = () => {
        this.setState({
            categoryFormShowed: false
        });
    };

    handleCategoryClick = (category) => () => {
        this.setState({
            activeNewsCategory: category,
            news: this.getCategoryNews(category)
        });
    }

    onDragEnd = ({ oldIndex, newIndex }) => {
        const { newsCategories } = this.state;
        const newValues = arrayMove(newsCategories, oldIndex, newIndex);

        newValues.forEach((category, i) => {
            category.positionIndex = i;

            this.props.editNewsCategory(category);
        });

        this.setState({
            newsCategories: newValues
        });
    };

    render () {
        const { classes } = this.props;
        const {
            activeNewsCategory,
            editableCategory,
            editableNews,
            formShowed,
            valueForDelete,
            newsCategories,
            news,
            lang,
            categoryFormShowed
        } = this.state;

        return <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <AdminTable
                    headerRows={headerRows}
                    tableCells={tableCells}
                    values={news}
                    headerText={`Новости в категории ${pathOr(['texts', DEFAULT_LANG, 'name'], '', activeNewsCategory)}`}
                    onDelete={this.handleNewsDelete}
                    deleteValueWarningTitle='Вы точно хотите удалить новость?'
                    deleteValuesWarningTitle='Вы точно хотите удалить следующие новости?'
                    filters={false}
                    copyItem={false}
                    onFormOpen={this.handleNewsFormOpen}
                />
                <Modal open={formShowed} onClose={this.handleCloseNewsForm} className={classes.modal}>
                    <Paper className={classes.modalContent}>
                        <NewsForm activeCategory={activeNewsCategory} news={editableNews} onDone={this.handleNewsFormDone} />
                    </Paper>
                </Modal>
            </main>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="right"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.toolbarNav}>
                    <Typography variant='h6' className={classes.categoryTitle}>Категории новостей</Typography>
                    <Tooltip title='Добавление'>
                        <IconButton aria-label='Add' onClick={this.handleCategoryFormOpen()}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider/>
                <div className={classes.toolbar} />
                <SortableWrapp
                    axis='xy'
                    onFormOpen={this.handleCategoryFormOpen}
                    onCategoryDelete={this.handleCategoryDelete}
                    onCategoryClick={this.handleCategoryClick}
                    onSortEnd={this.onDragEnd}
                    newsCategory={newsCategories}
                    lang={lang}
                    useDragHandle
                    classes={classes}
                />
            </Drawer>
            <Modal open={categoryFormShowed} onClose={this.handleCloseCategoryForm} className={classes.modal} >
                <Paper className={classes.modalContent}>
                    <NewsCategoryForm categories={newsCategories} category={editableCategory} onDone={this.handleCategoryFormDone}/>
                </Paper>
            </Modal>
            <Dialog
                open={!!valueForDelete}
                onClose={this.handleWarningDisagree}
            >
                <DialogTitle>Вы точно хотите удалить категорию?</DialogTitle>
                <DialogContent className={classes.warningContent}>
                    <DialogContentText>{valueForDelete && valueForDelete.name}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleWarningDisagree} color='primary'>
                        Нет
                    </Button>
                    <Button onClick={this.handleWarningAgree} color='primary' autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(NewsPage));
