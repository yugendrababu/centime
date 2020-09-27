import { Grid } from '@material-ui/core';
import React from 'react';
import Expenses from './Expenses/Expenses';
import Income from './Income/Income';
import Paper from '@material-ui/core/Paper';


function IncomeAndExpenses(){
return(
    <Grid container>
        <Grid item xs={12}>
         <Paper elevation={3}>
           <Income />
         </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{marginTop:15,marginBottom:15}}>
           <Expenses />
         </Paper>
        </Grid>
    </Grid>
)
}

export default IncomeAndExpenses;