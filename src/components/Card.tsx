import { Card, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CustomCard({ title, children, testID }) {
  return (
    <Card className="card" id={testID} data-testid={testID}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" id={`${testID}LB`} data-testid={`${testID}LB`}>{title}</Typography>
        </Grid>
        {children}
      </Grid>
    </Card>
  );
}

CustomCard.propTypes = {
  title: PropTypes.string,
  testID: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CustomCard;
