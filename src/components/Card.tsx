import { Card, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

type CustomCardProps = {
  title?: string;
  children: ReactNode;
  testID?: string;
  onClick?: () => void;
};

function CustomCard({ title, children, testID, onClick }: CustomCardProps) {
  return (
    <Card className="card" id={testID} data-testid={testID} onClick={onClick}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" id={`${testID}LB`} data-testid={`${testID}LB`}>{title}</Typography>
        </Grid>
        {children}
      </Grid>
    </Card>
  );
}


export default CustomCard;
