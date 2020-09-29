import Chart from 'react-google-charts'
import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import * as actions from '../../redux/actions/actions'

function Customchart () {
  const dispatch = useDispatch()
  const data = useSelector(state => state.cashFlow.sankeyData)
  const [chartData, setChartData] = React.useState([])
  const [showChart, setShowChart] = React.useState(false)
  useEffect(() => {
    if (data.length > 0) {
      setChartData(data)
      setShowChart(true)
      dispatch(actions.saveSankeyData([]))
    }
  }, [data])
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
        {!showChart && <Typography className="customChart" variant="subtitle2">
          {t('No Data Available . Please Provide the Details')}
        </Typography>}
      </Grid>
      <Grid item xs={12}>
        <div className="customChart" >
          {showChart && <Chart
            height={'300px'}
            chartType="Sankey"
            loader={<div>Loading Chart</div>}
            data={chartData}
            rootProps={{ 'data-testid': 'sankeyChartCustom' }}
            options={{}}
          />}
        </div>
      </Grid>
    </Grid>
  )
}

export default Customchart
