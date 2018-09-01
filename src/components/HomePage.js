import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Folder from './Folder';
import File from './File';
import Trash from './Trash';
import ExplorerLevel from './ExplorerLevel';
import { relative } from 'path';


const drawerWidth = 240;

const styles = theme => ({
    card: {
      minWidth: 275,
      width: 300,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
        fontSize: 14,
      marginBottom: 12,
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
          position: 'relative',
        },
      },
    progress: {
        margin: 2,
        position: "absolute"
    },
    button: {
        marginBottom: 8,
    },
    itemTitle:{
        marginTop: 8
    }
  });

class HomePage extends React.Component {

    /*mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }*/

    state = {
    };

    render(){

        const { restoreItem, classes, isFetchingLocks, selectedFolder, goToFolder, navStack, allFolders, popNav, navigateTo, deleteItem, showingTrash, trash, goToTrash } = this.props;

        return (
            <div className="main-app-container">

                { isFetchingLocks ? <CircularProgress className={classes.progress} size={50} /> : null }
              

                <div className="explorer-container">
                    <ul>
                    {
                        Object.keys(allFolders).map(key => {
                                return(
                                    allFolders[key].deleted === true ? null : <li key={key}>
                                    <i className="material-icons explorer-item-expand" onClick={e => this.setState({[allFolders[key].title] : {
                                        open: this.state[allFolders[key].title] ? !this.state[allFolders[key].title].open : navStack[0] === allFolders[key].title ? false : true
                                    }})}>
                                        expand_more
                                    </i>
                                    <span className="explorer-item-label" onClick={e => navigateTo([allFolders[key].title])}>{allFolders[key].title}</span>
                                        {((Object.keys(allFolders[key]).length > 1 && this.state[allFolders[key].title] && this.state[allFolders[key].title].open) || ((!this.state[allFolders[key].title]) && navStack[0] === allFolders[key].title)) ? 
                                            <ExplorerLevel navigateTo={navigateTo} path={[allFolders[key].title]} folder={allFolders[key]} navStack={navStack[0] == allFolders[key].title ? navStack.slice(1) : navStack}/>: null    
                                    }
                                    </li>
                                )
                            }
                        )
                    }
                    </ul>
                    <div className="trash-btn-container">
                        <Typography variant="title" onClick={e=> goToTrash()}>
                        <i className="material-icons">
                            delete_outline
                            </i> TRASH
                        </Typography>
                    </div>
                </div>
                
                <div className="manager-container">
                    {
                        (showingTrash === true) ?
                        <Typography variant="title" className="nav-chain">Trash</Typography> :
                        <Typography variant="title" className="nav-chain">
                        <i className='material-icons nav-chain-item' style={{
                            position: "relative",
                            bottom: -4
                        }} onClick={e => {popNav(0)}}>home</i> /
                            {
                                
                                navStack.map((s, key) => {
                                    return (<span className="nav-chain-item" key={key}> <b onClick={e => {popNav(key + 1)}}>{s}</b> /</span>)
                                    })
                            }
                        </Typography>
                    }

                    <div className="locks-container">
                
                        
                        {
                            (showingTrash === true) ?
                                <Trash trash={trash} restoreitem={restoreItem}/> :
                            selectedFolder.map((folder, key) => {

                                let itemType = 'folder';
                                let contentArray = [];

                                if(folder.hasOwnProperty('file_name'))
                                    itemType = 'file'
                                else
                                    itemType = 'folder'

                                
                                if(itemType === 'folder'){
        
                                    Object.keys(folder).map(function (index) {
                                        if(typeof folder[index] === "object"){
                                            
                                            if(Array.isArray(folder[index])){
                                                let obj = {
                                                    title: index
                                                }
                                                folder[index].map(e => {
                                                    obj[e.file_name] = e
                                                })
                                                contentArray.push(obj) ;
                                            }
                                            else{
                                                contentArray.push({
                                                    ...folder[index],
                                                    title: index
                                                })
                                            }                                    
                                        }
                                    })
                                }

                                return (
                                        folder.deleted === true ? null: <li key={key} className="directory-items">
                                        {
                                            itemType === 'folder' ?
                                            <Folder item={folder} contentArray={contentArray} goToFolder={goToFolder} deleteItem={deleteItem}/> :
                                            <File item={folder} deleteItem={deleteItem}/>
                                        }
                                        </li>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
          );
    }
    
}

HomePage.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    allFolders: PropTypes.object.isRequired,
    selectedFolder: PropTypes.array.isRequired,
    goToFolder: PropTypes.func.isRequired,
    isFetchingLocks: PropTypes.bool.isRequired,
    showingTrash: PropTypes.bool.isRequired,
    navStack: PropTypes.array.isRequired,
    popNav: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    restoreItem: PropTypes.func.isRequired,
    goToTrash: PropTypes.func.isRequired,
    trash: PropTypes.array.isRequired,
  };

export default withStyles(styles)(HomePage);