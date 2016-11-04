import { 
  FETCH_FILES,
  CREATE_FOLDER,
  UPLOAD_FILE,
  RENAME_FILE,
  CHECK_FILE,
  TOGGLE_CHECK,
} from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';
import { 
  getCurDirInfo,
} from '../reducers/files';

export const fetchDirFiles = createAction(FETCH_FILES, filename => 
  fetch(`files/${encodeURIComponent(filename)}?children`)
);

export const _createFolder = createAction(CREATE_FOLDER, (parent, name, isExist) =>
  fetch(`files/${encodeURIComponent(parent)}/directory?name=${name}`, {
      method: 'POST',
    })
);

export const createFolder = function(name) {
  return (dispatch, getState) => {
    const dir = getCurDirInfo(getState());
    const isExist = dir.children.some(file => file.directory && file.name === name);
    const action = isExist ? _createFolder(new Error('文件夹已存在！')) : _createFolder(dir.fullname, name);
    return dispatch(action);
  };
};

export const _uploadFile = createAction(UPLOAD_FILE, (parent, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(`files/${encodeURIComponent(parent)}/upload`, {
    method: 'POST',
    headers: {},
    body: formData,
  });
});

export const uploadFile = function(file) {
  return (dispatch, getState) => {
    const dir = getCurDirInfo(getState());
    const isExist = dir.children.some(fileItem => fileItem.file && fileItem.name === file.name);
    const action = isExist ? _uploadFile(new Error('文件已存在！')) : _uploadFile(dir.fullname, file);
    return dispatch(action);
  };
};

export const _renameFile = createAction(RENAME_FILE, 
  (oriName, newName) =>
    fetch(`files/${encodeURIComponent(oriName)}/rename?name=${newName}`, {
      method: 'POST',
    }),
  (oriName, newName) => ({
    oriName,
    newName
  })
);

export const renameFile = function(file, newName) {
  return (dispatch, getState) => {
    const dir = getCurDirInfo(getState());
    const isExist = dir.children.some(fileItem =>
      fileItem.file === file.file && fileItem.directory === file.directory && fileItem.name === newName);
    const action = isExist ? _renameFile(new Error('已存在同名的文件！')) : _renameFile(file.fullname, newName);
    return dispatch(action);
  };
};

export const checkFile = createAction(CHECK_FILE);

export const toggleCheck = createAction(TOGGLE_CHECK);