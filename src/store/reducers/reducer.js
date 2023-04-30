const listSearch = (
  state = {
    dataList: [],
    selectedTaskToEditOrAdd: {},
  }, action) => {
    switch (action.type) {
      case 'GET_ALL_LIST_SEARCH':
        return { ...state, dataList: action.dataList };

      case 'SET_SELECTED_LIST_FOR_EDITING':
        return {
          ...state,
          selectedTaskToEditOrAdd: action.item
        };

      case 'CLEAR_SELECTED_LIST_FOR_EDITING':
        return {
          ...state,
          selectedTaskToEditOrAdd: {},
        };

      case 'HANDLE_DELETE_MODEL_CLOSE':
        let dataList = state.dataList;
        const id = action?.item?.id;
        if(id){
          dataList = state.dataList.filter(f => f.id !== id);
        }
        
        return {
          ...state,
          dataList,
        };

      default:
        return state;
  }
}

export default listSearch;
