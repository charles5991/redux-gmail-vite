import { useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';

import dateFormat from '../utils/dateFormat';
import { getListSearch, getItemDetail, deleteListItem } from '../store/actions/list';

function ListSearches({
  onClickItem,
  ...props
}){
  const [openList, setOpenList] = useState(false);
  const [openListOnce, setOpenListOnce] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [selectedItemForDeleting, setSelectedItemForDeleting] = useState({});

  const onClickOpenDialog = (item) => {
    setSelectedItemForDeleting(item);
    setOpenDialogDelete(true);
  }

  const onDeleteConfirm = () => {
    props.deleteListItem(selectedItemForDeleting);
    setOpenDialogDelete(false);
  }

  const onCollapseList = () => {
    if(!openListOnce){
      props.getListSearch();
      setOpenListOnce(true);
    }
    setOpenList(!openList);
  }

  const onCloseDialog = () => {
    setOpenDialogDelete(false);
  }

  const onClickItemDetail = (item) => {
    props.getItemDetail(item);
    onClickItem?.(item);
  }

  const parseDate = (date) => (
    <time
      dateTime={date}
      title={dateFormat( date, { dateStyle: 'full', timeStyle: 'medium' })}
    >
      {dateFormat(date, { dateStyle: 'medium' })}
    </time>
  );

  return (
    <>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper', padding: 0, marginTop: '9px', border: '1px solid #ccc' }}
        component="nav"
      >
        <ListItemButton
          onClick={onCollapseList}
        >
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {openList && <hr className="m-0" />}

        <Collapse
          className="collapseList"
          in={openList}
          timeout="auto"
        >
          {(props.dataList || []).map((item) => 
            <List key={item.id} dense component="div" disablePadding>
              <ListItem
                secondaryAction={
                  <>
                    <Tooltip
                      arrow
                      placement="top"
                      PopperProps={{ disablePortal: true }}
                      title="View"
                    >
                      <IconButton onClick={() => onClickItemDetail(item)} edge="end" size="small" aria-label="view">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      arrow
                      placement="top"
                      PopperProps={{ disablePortal: true }}
                      title="Delete"
                    >
                      <IconButton onClick={() => onClickOpenDialog(item)} edge="end" size="small" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PlaceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={parseDate(item.created_at)}
                  title={item.title}
                />
              </ListItem>
            </List>
          )}

          {props.dataList?.length < 1 && 
            <Alert severity="info" className="empty-info">No data</Alert>
          }
        </Collapse>
      </List>

      <Dialog
        open={openDialogDelete}
        onClose={onCloseDialog}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure to delete {selectedItemForDeleting?.title || "this item"} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Button onClick={onDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dataList: state.listSearch.dataList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSearch: () => {
      dispatch(getListSearch());
    },
    getItemDetail: (item) => {
      dispatch(getItemDetail(item));
    },
    deleteListItem: (item) => {
      dispatch(deleteListItem(item));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((ListSearches));
