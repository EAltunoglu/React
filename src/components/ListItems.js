import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//

const styles = ({
  itemImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
  },
  itemData: {
    marginLeft: 20
  }
});

class ListItems extends Component {
  render() {
    const { classes } = this.props;
    const items = this.props.items.items;
    console.log(this.props.items);
    return (
      <Grid container>
        {items.map((item, index) => {
          const { data, createdAt, type } = item;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={data.imageUrl}
                      alt="item"
                      className={classes.itemImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.itemData}>
                      
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{data.title}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== items.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

ListItems.propTypes = {
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(ListItems);
