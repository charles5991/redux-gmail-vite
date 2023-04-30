import { db } from '../../configs/db';

export const getListSearch = () => {
  return async (dispatch) => {
    const result = await db.list.orderBy("index").reverse().toArray();
    Array.isArray(result) && dispatch(setItemLists(result));
  }
}

export const deleteListItem = (item) => {
  return async (dispatch) => {
    const query = await db.list
      .where({ id: item.id })
      .delete();

    query && dispatch(handleDeleteModelClose(item));
  }
}

export const getItemDetail = (item) => {
  return (dispatch) => {
    dispatch(setSelectedListForEditing(item));
  }
}

const setItemLists = (dataList) => {
  return {
    type: 'GET_ALL_LIST_SEARCH',
    dataList
  };
}

export const setSelectedListForEditing = (item) => {
  return {
    type: 'SET_SELECTED_LIST_FOR_EDITING',
    item
  }
}

export const clearSelecteedTodoForEditing = () => {
  return {
    type: 'CLEAR_SELECTED_LIST_FOR_EDITING',
  };
}

export const handleDeleteModelClose = (item) => {
  return {
    type: 'HANDLE_DELETE_MODEL_CLOSE',
    item,
  };
}
