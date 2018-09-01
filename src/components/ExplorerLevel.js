import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';

const styles = {
    
  };

class ExplorerLevel extends React.Component {

    /*mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }*/

    state = {
    };

    render(){

        const { folder, navStack, path, navigateTo} = this.props;


        let itemType = 'folder';
        let contentArray = [];

        if(folder.hasOwnProperty('file_name'))
            itemType = 'file'
        else
            itemType = 'folder'

        
        if(itemType === 'folder'){

            Object.keys(folder).map(function (index) {
                if(typeof folder[index] === "object" ){
                    
                    if(Array.isArray(folder[index])){
                        let obj = {
                            title: index,
                            deleted: folder[index].deleted
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
            <ul className="explorer-level">{
                contentArray.map((i, key) => {
                    console.log(i, i["deleted"]);
                    return( 
                        (i.deleted === true || i[i.length - 1] == "deleted") ? null : <li key={key}>
                            <i className="material-icons explorer-item-expand" 
                            onClick={e => this.setState({[i.title] : {
                                open: this.state[i.title] ? !this.state[i.title].open : navStack[0] === i.title ? false : true
                            }})}>
                            { i.hasOwnProperty('file_name')? "insert_drive_file" : "expand_more"
                            }
                            </i>
                            
                            <span className="explorer-item-label" onClick={e => navigateTo([...path, i.title])}>{i.title}</span>
                            {(!i.hasOwnProperty('file_name') && ((Object.keys(i).length > 1 && this.state[i.title] && this.state[i.title].open) || ((!this.state[i.title]) && navStack[0] == i.title))) ? 
                                            <ExplorerLevel navigateTo={navigateTo} path={[...path, i.title]} folder={i} navStack={navStack[0] == i.title ? navStack.slice(1) : navStack}/>: null    
                                }
                        </li>
                    )
                })
            }
            </ul>
        );
    }
    
}

ExplorerLevel.propTypes = {
    children: PropTypes.element,
    folder: PropTypes.object.isRequired,
    navStack: PropTypes.array.isRequired,
    path: PropTypes.array.isRequired,
    navigateTo: PropTypes.func.isRequired,
  };

export default withStyles(styles)(ExplorerLevel);