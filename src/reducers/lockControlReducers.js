import {LOCKED, UNLOCKING, UNLOCK_SUCCESS, UNLOCK_FAILURE} from '../constants/states'

export default function lockControlReducers(
    state = {
        locks: {},
        isFetching: false,
        didInvalidate: false,
        selectedFolder: [],
        stack: [],
        trash: [],
        showingTrash: false
    },
    action
) {  
    let tempObj, foldObj, folderObj = {};
    let pathArr;
    switch (action.type) {
        case 'INVALIDATE_LOCKS':
            return Object.assign({}, state, { didInvalidate: true});
        case 'REQUEST_LOCKS':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_LOCKS':
            action.results.map(folder => {
                folderObj[folder.title] = folder
            })
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                locks: {...folderObj},
                selectedFolder: action.results,
                lastUpdated: action.receivedAt
            });

        case 'ATTEMPTING_UNLOCK':
            return Object.assign({}, state, {
                locks: {
                    ...state.locks,
                    [action.lockId] : {
                        ...state.locks[action.lockId],
                        unlockState : UNLOCKING 
                    }
                }
            });
        case 'UNLOCK_SUCCESS':
            return Object.assign({}, state, {
                locks: {
                    ...state.locks,
                    [action.lockId] : {
                        ...state.locks[action.lockId],
                        unlockState : UNLOCK_SUCCESS 
                    }
                }
            });
        case 'UNLOCK_FAILED':
            return Object.assign({}, state, {
                locks: {
                    ...state.locks,
                    [action.lockId] : {
                        ...state.locks[action.lockId],
                        unlockState : UNLOCK_FAILURE 
                    }
                }
            });
        case 'POP_NAV':
            return Object.assign({}, state, {
                selectedFolder: action.folder,
                stack: state.stack.slice(0, action.index)
            });
        case 'NAVIGATE_TO':
            return Object.assign({}, state, {
                selectedFolder: action.folder,
                stack: action.stack,
                showingTrash: false
            });
        case 'SELECT_FOLDER':
            return Object.assign({}, state, {
                selectedFolder: action.folder,
                stack: [...state.stack, action.folderTitle],
                showingTrash: false
            });
        case 'DELETE_ITEM':
            foldObj = JSON.parse(JSON.stringify(state.locks));
            tempObj = foldObj;
            state.stack.map(s => {
                tempObj = tempObj[s];
            });
            if(Array.isArray(tempObj)){
                tempObj.map((e, k) => {
                    //console.log(e.file_name === action.item);
                    if (e.file_name === action.item)
                    {
                        console.log(e, action.item)
                        tempObj[k] = {...tempObj[k], deleted: true}
                    }

                });

            }
            else{
                tempObj[action.item].deleted = true;
            }
                
            //console.log(foldObj);
            //console.log(state.locks);
            return Object.assign({}, state, {
                locks: {...foldObj},
                selectedFolder: state.selectedFolder.map(e => {
                    return (e.title === action.item || e.file_name === action.item) ?
                    {
                        ...e,
                        deleted: true
                    } :
                    e
                }),
                trash: [...state.trash, { 
                    path: state.stack.join('/') + '/' + action.item,
                    type: action.itemType
                }]
            });

        case 'RESTORE_ITEM':
            foldObj = JSON.parse(JSON.stringify(state.locks));
            tempObj = foldObj;
            pathArr = action.trash.path.split('/');
            pathArr.slice(0, pathArr.length-1).map(s => {
                tempObj = tempObj[s];
            });
            if(Array.isArray(tempObj)){
                tempObj.map((e, k) => {
                    //console.log(e.file_name === action.item);
                    if(e.file_name === pathArr[pathArr.length - 1])
                    {
                        //console.log(e, action.item)
                        tempObj[k] = {...tempObj[k], deleted: false}
                    }

                });

            }
            else{
                tempObj[pathArr[pathArr.length - 1]].deleted = false;
            }
                
            //console.log(foldObj);
            //console.log(state.locks);
            return Object.assign({}, state, {
                locks: {...foldObj},
                trash: state.trash.filter(e => e.path !== action.trash.path)
            });
        case 'GO_TO_TRASH':
            return Object.assign({}, state, {
                showingTrash: true
            });
  
      default:
        return state;
    }
  }