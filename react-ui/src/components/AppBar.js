import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faHtml5, faCss3Alt, faJs, faNodeJs, faGithubSquare, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faDatabase, faLaptop, faCode, faTerminal } from '@fortawesome/free-solid-svg-icons'
import Stepper from './Stepper';
import Stepper2 from './Stepper2';
import ContentMasteryCard from './ContentMasteryCard';
import LinksCard from './LinksCard';
import Kard from './Kard';
import Badge from '@material-ui/core/Badge';
import MasteryEval from './MasteryEval';


library.add(fab, faHtml5, faCss3Alt, faJs, faNodeJs, faDatabase, faGithubSquare, faLinkedinIn, faGoogle, faLaptop, faCode, faTerminal )

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    expand: false
  };

  handleExpand = () => {
    this.setState(state => ({ expand: !state.expand }));
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              KARDS - A Learning Mastery Tool 
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          
          <List>
          <ListItem button onClick={this.handleExpand}>
          <Badge className={classes.margin} badgeContent={4} color="primary">
        
          <FontAwesomeIcon size="lg" icon={['fab', 'html5']} />
        </Badge>
            <ListItemText inset primary="HTML" />
            {this.state.expand ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          </List>
          <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <ListItemText inset primary="Elements" />
              </ListItem>
              <ListItem button className={classes.nested}>
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <ListItemText inset primary="HTML Documents" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          {/* <List>{otherMailFolderListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Stepper />
          <ContentMasteryCard />
          <LinksCard />
          <div >
          <Kard />
          </div>
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
