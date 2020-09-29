import Chart from 'react-google-charts'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

function Customchart () {
  const data = useSelector(state => state.cashFlow.sankeyData)
  const [t] = useTranslation()
  return (
    <Grid container alignItems="stretch">
      <Grid item xs={12}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6">
                      Sankey Diagram
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {!data && <Typography className="customChart" variant="subtitle2">
          {t('No Data Available . Please Provide the Details')}
        </Typography>}
      </Grid>
      <Grid item xs={12}>
        <div className="customChart" >
          {data && <Chart
            height={'300px'}
            chartType="Sankey"
            loader={<div>Loading Chart</div>}
            data={data}
            rootProps={{ 'data-testid': 'sankeyChartCustom' }}
          />}
        </div>
      </Grid>
    </Grid>
  )
}

export default Customchart
