import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

// 当前活动的菜单实例
let openInstance = null;
let hasPrepare = false;
let menuContainer = null;

function isDescendant(parent, child) {
   let node = child.parentNode;
   while (node != null) {
     if (node == parent) {
         return true;
     }
     node = node.parentNode;
   }
   return false;
}

function getPosition2Document(e) {
  let posx = 0;
  let posy = 0;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + 
                       document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + 
                       document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}

function closeCurrent() {
  if (!openInstance) return;

  openInstance.close();
  menuContainer.innerHTML = '';
  openInstance = null;
}

function positonMenu(x, y, menu) {
  const clickCoordsX = x;
  const clickCoordsY =  y;

  const menuWidth = menu.offsetWidth + 4;
  const menuHeight = menu.offsetHeight + 4;

  const documentWidth = document.body.clientWidth;
  const documentHeight = document.body.clientHeight;

  if ( (documentWidth - clickCoordsX) < menuWidth ) {
    menu.style.left = documentWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if ( (documentHeight - clickCoordsY) < menuHeight ) {
    menu.style.top = documentHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}

function preventMenuOfContextMenu(event) {
  console.log('1');
  if (event.target === menuContainer || isDescendant(menuContainer, event.target)) {
    event.preventDefault();
  }
}

class ContextMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.onContextMenu = this.onContextMenu.bind(this);

    this.state = {
      showMenu: false,
      clickX: 0,
      clickY: 0,
    };
  }

  close() {
    this.setState({
      showMenu: false,
    });
  }

  onContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    const nativeEvent = event.nativeEvent;
    const pos = getPosition2Document(nativeEvent);
    if (openInstance === this) {
      this.setState({
        clickX: pos.x,
        clickY: pos.y,
      });
    } else {
      closeCurrent();

      this.setState({
        showMenu: true,
        clickX: pos.x,
        clickY: pos.y,
      }, () => {
        openInstance = this;
      });
    }
  }
  
  componentDidMount() {
    if (hasPrepare) return;

    menuContainer = document.createElement('div');
    menuContainer.className = "context-menu-container";
    menuContainer.style.position = 'absolute';
    document.body.appendChild(menuContainer);
    document.addEventListener('contextmenu', preventMenuOfContextMenu, false);
    document.addEventListener('click', closeCurrent);
    hasPrepare = true;
  }

  // componentDidUpdate() {
  //   const { clickX, clickY } = this.state;
  //   if (this.state.showMenu) {
  //     render(this.props.menu, menuContainer);
  //     positonMenu(clickX, clickY, menuContainer);
  //   } else {
  //     menuContainer.innerHTML = '';
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.showMenu) return false;
  
    const { clickX, clickY } = nextState;
    if (this.state.showMenu !== nextState.showMenu) {
      // 显示状态改变，渲染
      render(this.props.menu, menuContainer);
    }
    positonMenu(clickX, clickY, menuContainer);

    return false;
  }

  render() {
    return (
      <div className="ContextMenu" onContextMenu={this.onContextMenu}>
        {this.props.children}
      </div>
    );
  }
}

ContextMenu.propTypes = {
  menu: PropTypes.element,
};

ContextMenu.defaultProps = {

};

export default ContextMenu;