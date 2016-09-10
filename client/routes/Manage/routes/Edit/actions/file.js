import { 
  FETCH_FILE_CONTENT,
  EDITOR_SAVE_FILE_CONTENT
} from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';

export const fetchFileContent = createAction(FETCH_FILE_CONTENT, filename => 
  fetch(`files/${encodeURIComponent(filename)}?format=text`)
);

export const saveFile = createAction(EDITOR_SAVE_FILE_CONTENT, ({ filename, content }) =>
  fetch(`files/${encodeURIComponent(filename)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, })
  })
)
