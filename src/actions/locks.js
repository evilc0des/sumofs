import axios from "axios"
import { LOCKED, UNLOCK_FAILURE } from "../constants/states";


function attemptUnlock(lockId) {
    return {
        type: 'ATTEMPTING_UNLOCK',
        lockId: lockId
    }
}

function setUnlockSuccess(result, lockId) {
    return {
        type: 'UNLOCK_SUCCESS',
        lockId: lockId,
        results : { ...result },
        receivedAt: Date.now()
    }
}

function setUnlockFailed(error, lockId) {
    return {
        type: 'UNLOCK_FAILED',
        lockId: lockId,
        results: { ...error },
        receivedAt: Date.now()
    }
}

export function unlockById(lockId) {
    return (dispatch, getState) => {
        if(getState().lockControls.locks[lockId].unlockState == LOCKED || getState().lockControls.locks[lockId].unlockState == UNLOCK_FAILURE){
            dispatch(attemptUnlock(lockId));
        }
        return axios.post(`/locks/${lockId}/unlock`, {})
        .then(result => dispatch(setUnlockSuccess(result, lockId)))
        .catch(error => {
            //console.log(error); 
            return dispatch(setUnlockFailed(error, lockId))
        })
    }
}


export function fetchLocksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchLocks(getState())) {
            //console.log("again");
            return dispatch(fetchLocks());
        }   
    }
}


function fetchLocks() {
    return dispatch => {
        dispatch(requestLocks());
        return axios.get(`/api/long_game_tree77fa4dd.json`)
            .then(json => {
                //console.log(json);
                dispatch(receiveLocks(json))
            })
    }
}

function shouldFetchLocks(state) {
    const lockState = state.lockControls;
    //console.log(lockState.locks);
    if (!lockState.locks || (Object.keys(lockState.locks).length === 0 && lockState.locks.constructor === Object)) {
        return true;
    } else if (lockState.isFetching) {
        return false;
    } else {
        return lockState.didInvalidate;
    }
}

function requestLocks() {
    return {
        type: 'REQUEST_LOCKS'
    }
}

function receiveLocks(json) {
    return {
        type: 'RECEIVE_LOCKS',
        results: [ ...json.data ], 
        receivedAt: Date.now()
    }
}

export function selectFolder(folder, title) {
    return {
        type: 'SELECT_FOLDER',
        folder: folder,
        folderTitle: title
    }
}

export function popNav(index) {
    return (dispatch, getState) => {

        
        const { lockControls } = getState();
        let obj = {...lockControls.locks};
        if(index !== 0){
            lockControls.stack.slice(0, index).map(s => {
                obj = obj[s];
            });
        }
        
        return dispatch({
            type: 'POP_NAV',
            folder: transformFolder(obj),
            index: index
        });
    }
    
}

export function deleteItem(item, type){
    return {
        type: 'DELETE_ITEM',
        item: item,
        itemType: type
    }

}


export function restoreItem(trash){
    return {
        type: 'RESTORE_ITEM',
        trash: trash
    }

}

export function navigateTo(path){
    return (dispatch, getState) => {

        //console.log(path);
        const { lockControls } = getState();
        let obj = {...lockControls.locks};
        if(path.length !== 0){
            path.map(s => {
                obj = obj[s];
            });
        }
        
        return dispatch({
            type: 'NAVIGATE_TO',
            folder: transformFolder(obj),
            stack: path
        });
    }
}


export function goToTrash(){
    return {
        type: "GO_TO_TRASH"
    }
}

function transformFolder(folder){
    
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

    return contentArray;

}