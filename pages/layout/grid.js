import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import grid from '../layout/grid.css'


import slide2 from '../../static/images/slide2.jpg';

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 3}px`,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
});

function CSSGrid(props) {
    const { classes } = props;

    return (
        <div>

            <div className={grid.redFont}>tesing extenal css with color red</div>

            <img  src={slide2} height={300} width={300}/>
            <Typography variant="subtitle1" gutterBottom>
                Material-UI Grid:
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>xs=8</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Typography variant="subtitle1" gutterBottom>
                CSS Grid Layout:
            </Typography>
            <div className={classes.container}>
                <div style={{ gridColumnEnd: 'span 3' }}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </div>
                <div style={{ gridColumnEnd: 'span 3' }}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </div>
                <div style={{ gridColumnEnd: 'span 3' }}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </div>
                <div style={{ gridColumnEnd: 'span 3' }}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </div>
                <div style={{ gridColumnEnd: 'span 8' }}>
                    <Paper className={classes.paper}>xs=8</Paper>
                </div>
                <div style={{ gridColumnEnd: 'span 4' }}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </div>
            </div>
        </div>
    );
}

CSSGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CSSGrid);