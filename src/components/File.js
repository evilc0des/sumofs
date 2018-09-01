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

class File extends React.Component {

    /*mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }*/

    render(){

        const { classes, item, deleteItem } = this.props;
        return (
            <div className="file-container">
                <div className="file">
                    <button className="delete-btn" onClick={e=> {e.stopPropagation(); deleteItem(item.file_name, 'file')}}><i className="material-icons">
                    delete
                    </i>
                    </button>
                </div>
                <Typography variant="caption" className={classes.itemTitle}>{item.file_name}</Typography>
            </div>
          );
    }
    
}

File.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

export default withStyles(styles)(File);