import React, { useState } from 'react'
import logo from './../../logo.png'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { Paper } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

function Header () {
  const [t, i18n] = useTranslation()
  const [selectedOption, setSelectedOption] = useState('en')
  const options = [
    {
      label: 'English',
      value: 'en'
    },
    {
      label: 'French',
      value: 'fr'
    }
  ]
  const handleOptionChange = (event) => {
    const value = event.target.value
    setSelectedOption(value)
    i18n.changeLanguage(value)
  }
  const resetApp = () => {
    window.location.reload()
  }
  return (
    <Grid container >
      <Grid item xs={12} md={10}>
        <div className="App-header" >
          <img src={logo} className="App-logo" alt="logo" style={{ height: 'inherit' }}/>
        </div>
      </Grid>
      <Grid item xs={6} md={1} >
        <div className="App-header">
          <Paper className="resetButton">
            <Button
              size="large"
              onClick={resetApp}>
              { t('Reset')}
            </Button>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={6} md={1} >
        <div className="App-header">
          <Paper className="language">
            <TextField
              id="outlined-select-language"
              select
              label={t('Language')}
              value={selectedOption}
              size="small"
              onChange={handleOptionChange}
              variant="filled"
              inputProps={{
                'data-testid': 'languageSelect'
              }}
              InputProps={{
                disableUnderline: true
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Paper>

        </div>
      </Grid>
    </Grid>
  )
}

export default Header
