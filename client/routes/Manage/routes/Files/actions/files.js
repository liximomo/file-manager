import { 
  FETCH_FILES,
  CREATE_FOLDER,
  UPLOAD_FILE,
} from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';
import { 
  getCurDirInfo,
} from '../reducers/files';

export const fetchDirFiles = createAction(FETCH_FILES, filename => 
  fetch(`files/${encodeURIComponent(filename)}?children`)
);

export const _createFolder = createAction(CREATE_FOLDER, (parent, name) =>
  fetch(`files/${encodeURIComponent(parent)}/directory?name=${name}`, {
    method: 'POST',
  })
);

export const createFolder = function(name) {
  return (dispatch, getState) => {
    const dir = getCurDirInfo(getState());

    return dispatch(_createFolder(dir.fullname, name));
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

export const uploadFile = function(name) {
  return (dispatch, getState) => {
    const dir = getCurDirInfo(getState());

    return dispatch(_uploadFile(dir.fullname, name));
  };
};
