import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2,
    },
    padding: {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
  });

class FormDialog extends React.Component {
    constructor (props) {
        super(props)
    }
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
           <Badge color="primary" badgeContent={86} className={classes.margin}>
        <Button variant="contained" onClick={this.handleClickOpen}>KARD Score</Button>
      </Badge>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Rate Myslef</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Pearson's Law: "That which is measured improves. That which is measured and reported improves exponentially." - Karl Pearson

"When performance is measured, performance improves. When performance is measured and reported back, the rate of improvement accelerates." - Thomas S. Monson


            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Self Eval Skill Score"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Keep Coding
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Score Me
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog);