import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
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
    progress: {
        margin: 2,
    },
    button: {
        marginBottom: 8,
    },
    itemTitle:{
        marginTop: 8
    }
  };

class Folder extends React.Component {

    /*mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }*/

    render(){

        const { classes, item, goToFolder, contentArray, deleteItem } = this.props;
        return (
            <div className="folder-container" onClick={e => goToFolder(contentArray, item.title)}>
        
                <div className="folder">
                    <button className="delete-btn" onClick={e=> {e.stopPropagation(); deleteItem(item.title, 'folder')}}><i className="material-icons">
                    delete
                    </i>
                    </button>
                </div>
                <Typography variant="caption" className={classes.itemTitle}>{item.title}</Typography>
            </div>
          );
    }
    
}

Folder.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    contentArray: PropTypes.array.isRequired,
    goToFolder: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

export default withStyles(styles)(Folder);