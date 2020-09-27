import Chart from "react-google-charts";
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";

function Customchart() {
    const data = useSelector(state => state.cashFlow.sankeyData);
    const [t] = useTranslation();
  return (
    <Grid container style={{overflowY: 'scroll'}} alignItems="stretch">
      <Grid item xs={12}>
        <Typography  className="customChart" variant="h6">
          Sankey Diagram
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {!data&&<Typography   className="customChart" variant="subtitle2">
          {t('No Data Available . Please Provide the Details')}
        </Typography>}
      </Grid>
      <Grid item xs={12}>
        <div className="customChart" >
          {data&&<Chart
            height={'300px'}
            chartType="Sankey"
            loader={<div>Loading Chart</div>}
            data={data}
            rootProps={{ 'data-testid': '1' }}
            />}
        </div>
      </Grid>
  </Grid>
  );
}

export default Customchart;
