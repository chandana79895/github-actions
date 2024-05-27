import { Card, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CustomCard({ title, children }) {
  return (
    <Card className="card">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3">{title}</Typography>
        </Grid>
        {children}
      </Grid>
    </Card>
  );
}

CustomCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CustomCard;
