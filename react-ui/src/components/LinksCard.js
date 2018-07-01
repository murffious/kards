import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Likes from './LinksLikes';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

class LinksCard extends Component {
  constructor (props) {
      super(props)
  }
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  render () {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
      return (
    <div>
        <Typography variant="headline" component="h2">
           Links for Learning
          </Typography>
      <Card className={classes.card}>
        <CardContent>
        <List>
          {[0, 1, 2, 3].map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <Likes />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
}


LinksCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(LinksCard);