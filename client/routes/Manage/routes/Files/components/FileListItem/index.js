import React, { PureComponent, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';

const iconButtonElement = (
  <IconButton
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>删除</MenuItem>
  </IconMenu>
);

class FileListItem extends PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      name,
      fullname,
    } = this.props;

    return (
      <ListItem
        rightIconButton={rightIconMenu}
        primaryText={
          <p>{name}</p>
        }
        secondaryText={
          <p>{fullname}</p>
        }
      />
    );
  }
}

FileListItem.propTypes = {
  name: PropTypes.string,
  fullPath: PropTypes.string,
};

FileListItem.defaultProps = {

};

export default FileListItem;