import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
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
};

class Kard extends Component {
    constructor (props) {
        super(props)
    }
    state = {
        age: "",
      };
    

  render () {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {bull}KARD{bull}
          </Typography>
          <Typography variant="headline" component="h2">
            HOW
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           WHY
          </Typography>
          <Typography component="p">
            WHAT<br />
            {/* {'"a benevolent smile"'} */}
          </Typography>
        </CardContent>
        <CardActions>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        </CardActions>
      </Card>
    </div>
  );
};
}

Kard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Kard);