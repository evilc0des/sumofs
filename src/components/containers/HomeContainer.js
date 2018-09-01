import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {fetchLocksIfNeeded, selectFolder, popNav, navigateTo, deleteItem, goToTrash, restoreItem} from '../../actions/locks';
import HomePage from "../HomePage";

export class HomeContainer extends React.Component {

    componentDidMount() {
        
        const { fetchLocksIfNeeded } = this.props;
        //console.log(fetchLocksIfNeeded);
        fetchLocksIfNeeded();
    }
  
    render() {

      const { restoreItem, selectedFolder, allFolders, navStack, popNav, navigateTo, deleteItem, showingTrash, trash, goToTrash } = this.props

      return (
        <HomePage
          goToFolder={this.props.selectFolder}
          selectedFolder = { selectedFolder}
          allFolders = {allFolders}
          isFetchingLocks = {this.props.isFetching}
          navStack = {navStack}
          popNav = {popNav}
          navigateTo = {navigateTo}
          deleteItem = {deleteItem}
          showingTrash = {showingTrash}
          trash = {trash}
          goToTrash= {goToTrash}
          restoreItem = {restoreItem}
        />
      );
    }
  }
  
  HomeContainer.propTypes = {
    selectedFolder: PropTypes.array.isRequired,
    allFolders: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchLocksIfNeeded: PropTypes.func.isRequired,
    selectFolder: PropTypes.func.isRequired,
    navStack: PropTypes.array.isRequired,
    popNav: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    restoreItem: PropTypes.func.isRequired,
    showingTrash: PropTypes.bool.isRequired,
    trash: PropTypes.array.isRequired,
    goToTrash: PropTypes.func.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      allFolders: state.lockControls.locks,
      selectedFolder: state.lockControls.selectedFolder,
      isFetching: state.lockControls.isFetching,
      navStack: state.lockControls.stack,
      showingTrash: state.lockControls.showingTrash,
      trash: state.lockControls.trash,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        fetchLocksIfNeeded: () => {
            dispatch(fetchLocksIfNeeded());
        },
        selectFolder: (folder, title) => {
            dispatch(selectFolder(folder, title));
        },
        popNav: (index) => {
          dispatch(popNav(index));
        },
        navigateTo: (path) => {
          dispatch(navigateTo(path));
        },
        deleteItem: (item, type) => {
          dispatch(deleteItem(item, type));
        },
        restoreItem: (trash) => {
          dispatch(restoreItem(trash));
        },
        goToTrash: () => {
          dispatch(goToTrash())
        }
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer);