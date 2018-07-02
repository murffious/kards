import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          MAstery Self Evaluation Score
          Tests are guides 
          - Class checkpoints
          - W# Schools quizzes
          - Can you build something with it YES OR NO
          - Pluralsight has a couple of free ones
          - 
          Why self eval ?
          You determine best wehre you are at.

          having others look at your work 
RANGE 
   Google Copy PAaste to Independent Problem Sovler 
          0 - 10 I am clueless
          11 - 20 It barely makes sense
          21 - 30 It makes sense a tiny bit
          31-40 I am starting to wrap my head around it
          41 -50 I get it to the point that it makes sense 
          51 - 60 I could use it by making it owrk with copy and paste for sure.
          61 - 70 I could likely do most the work and some copy and paste 
          71- 80 - I have to Google when I get stuck 
          81- 90 - I can use it without Googling or Copy and paste
          91 - 100 I could teach others about  it write it and use it with no errors Only write in this list if you can teach/explain it to a newbie outloud and write the code with no help or errors. 
        </Typography>

        Settings :  every day remind you to google how to write clean code and use your code editor to help you do that 
        variable names 
        function complexity 
        TDD 
        Style guide 
        Avoid comboy coding and speghettie code
        be dedicated to CARING about code and 
        Readability and Comprehesion by other programmers 
        Mastery of this skill set takes time so reviewing amd going back over stuff in more depth is key essential
        W3 schools list radnom selections
        <Typography component="p">
Skills paste from JOb applications - focus on that while studyiing certian topics and when you are ready for the job you want you will have those skills at least parially developed
TO DO - just a quick way to track and plan out what your plan for the week or day is while looking at the task compelted table 

        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);