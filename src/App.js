import React from 'react';
import Header from './components/Header/Header'
import Grid from '@material-ui/core/Grid';
import Customchart from './components/Main/SankeyDiagram';
import IncomeAndExpenses from './components/Main/IncomeAndExpenses';
import Paper from '@material-ui/core/Paper';
import './App.css';

function App() {
  return (
    <div style={{overflowY: 'scroll',backgroundColor: 'rgb(172 177 188 / 30%)'}}>
      <Grid container alignItems="stretch" >
        <Grid item xs={12}  md={12}>
          <Header/>
        </Grid>
        <Grid item xs={12} md={6} >
          <div className="incomePaperSytle">
              <IncomeAndExpenses />
          </div>
        </Grid>
        <Grid item xs={12}  md={6}>
          <Paper elevation={3} className="paperStyle">
            <Customchart />
          </Paper> 
        </Grid>
     </Grid>
  </div>

  );
}

export default App;
