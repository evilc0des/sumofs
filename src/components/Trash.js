import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { restoreItem } from '../actions/locks';

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

class Trash extends React.Component {

    /*mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }*/

    render(){

        const { classes, trash, restoreitem } = this.props;
        return (
            <div className="trash-container">
            {
                trash.map((t, key) => {
                    let pathArr = t.path.split("/");
                    return (
                        <Card key={key} className={classes.card}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                {
                                    pathArr[pathArr.length - 1]
                                }
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                   {
                                        pathArr.slice(0, pathArr.length - 1).join("/")
                                   } 
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={e => restoreitem(t)}>Restore</Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
            
                
            </div>
          );
    }
    
}

Trash.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    trash: PropTypes.array.isRequired,
    restoreitem: PropTypes.func.isRequired
  };

export default withStyles(styles)(Trash);