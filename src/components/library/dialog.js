import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import * as actions from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

export default function CustomModal (props) {
  const dispatch = useDispatch()
  const { openState, incomeList, currentIncomeSource, resetModal } = props
  const { currentExpense: { name, amount }, currentExpenseList } = props
  const classes = useStyles()
  const [t] = useTranslation()
  const [open, setOpen] = useState(openState)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [incomeSources, setIncomeSources] = useState('')
  const [enableDropdown, setEnableDropdown] = useState(true)
  const [currentIncomeList, setCurrentIncomeList] = useState({})
  const [totalIncome, setTotalIncome] = useState(0)
  const [expensesList, setExpensesList] = useState(currentExpenseList)

  useEffect(() => { // useeffect for income list from Expense component
    const localOptions = []
    const localCurrentIncomeList = {}
    Object.keys(incomeList).map((key) => {
      if (key === currentIncomeSource) { return '' }
      localOptions.push({ label: key, value: incomeList[key] })
      localCurrentIncomeList[key] = incomeList[key]
      return ''
    })
    updateExpenseList(currentIncomeSource, name, incomeList[currentIncomeSource])
    setTotalIncome(incomeList[currentIncomeSource])
    setCurrentIncomeList({ ...localCurrentIncomeList })
    setOptions([...localOptions])
  }, [incomeList])

  const updateExpenseList = (incomeName, expenseName, currentAmount) => { // store income contribution for a specific expense
    let localExpensesList = { ...expensesList }
    if (localExpensesList[expenseName]) {
      localExpensesList[expenseName].push({ incomeName, amount: currentAmount })
    } else {
      localExpensesList = {
        ...localExpensesList,
        [expenseName]: [{ incomeName, amount: currentAmount }]
      }
    }
    const localIncomeSources = { ...incomeSources }
    localIncomeSources.text = `| ${incomeName} : ${currentAmount} | `
    setIncomeSources(localIncomeSources)
    setExpensesList(localExpensesList)
  }
  const updateIncomeSources = (incomeName, expenseName, currentAmount) => { // update the dispaly text and store contributions from each incomes
    const localIncomeSources = { ...incomeSources }
    if (localIncomeSources.text) {
      localIncomeSources.text += `${incomeName} : ${currentAmount} | `
    } else {
      localIncomeSources.text = `| ${incomeName} : ${currentAmount} | `
    }
    if (localIncomeSources.data && localIncomeSources.data[expenseName]) {
      localIncomeSources.data[expenseName].push({ incomeName, amount: currentAmount })
    } else {
      localIncomeSources.data = {
        ...localIncomeSources.data,
        [expenseName]: [{ incomeName, amount: currentAmount }]
      }
    }
    setIncomeSources(localIncomeSources)
  }
  const updateOptions = (value, balance) => { // update dropdown options
    const localOptions = []
    for (var i = 0; i < options.length; i++) {
      if (options[i].label === value) {
        if (balance) {
          localOptions.push({ label: options[i].label, value: balance })
        }
      } else {
        localOptions.push({ label: options[i].label, value: options[i].value })
      }
    }
    setOptions(localOptions)
  }

  const handleOptionChange = (event) => { // hanlder for dropdown change
    const value = event.target.value
    if (value) {
      const income = totalIncome + currentIncomeList[value]
      if (income >= parseInt(amount)) {
        const balance = income - totalIncome - (parseInt(amount) - totalIncome)
        const contribution = currentIncomeList[value] - balance
        setEnableDropdown(false)
        updateIncomeSources(value, name, contribution)
        updateOptions(value, balance)
        setSelectedOption(value)
        if (balance <= 0) {
          delete currentIncomeList[value]
        } else {
          currentIncomeList[value] = balance
        }
        setCurrentIncomeList({ ...currentIncomeList })
      } else {
        updateIncomeSources(value, name, currentIncomeList[value])
        setSelectedOption('')
        updateOptions(value)
        setTotalIncome(income)
        delete currentIncomeList[value]
        setCurrentIncomeList({ ...currentIncomeList })
      }
    }
  }
  const cancelExpense = () => { // close dialog box
    setOpen(false)
    resetModal()
    setIncomeSources('')
  }
  const addExpense = () => { // store the addtitional details in the redux
    const data = {
      expenseDetails: incomeSources,
      expensesList,
      options,
      currentIncomeList
    }
    dispatch(actions.sendExpenseData(data))
    cancelExpense()
  }
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Grid container >
            <Grid item xs={12}>
              <div style={{ paddingBottom: 10 }}>
                <AppBar position="static" color="transparent">
                  <Toolbar>
                    <Typography variant="button" display="block" style={{ fontWeight: 700 }}>
                      {`${t('Amount Exceeded current income Source')} ::`}
                    </Typography>
                  </Toolbar>
                </AppBar>
              </div>
              <div >
                <Typography className="paddingBottom" variant="subtitle2" display="block">
                  {`${t('Contributed Income source(s)')} : ${incomeSources.text}` }
                </Typography>
                <Typography className="paddingBottom" variant="subtitle2" display="block">
                  {`${t('Current Expense(s)')} : | ${name} : ${amount} | ` }
                </Typography>
                { enableDropdown ? <Typography className="paddingBottom" variant="caption" display="block">
                  {`${t('Expense not valid. Please select another income')} :`}
                </Typography>
                  : <Typography className="paddingBottom" variant="caption" display="block">
                    {`${t('Expense is valid. Please continue to add')} :`}
                  </Typography>
                }
              </div>
            </Grid>
            <Grid item xs={12}>
              {enableDropdown &&
                <div className="paddingBottom">
                  <TextField
                    id="outlined-select-expense"
                    select
                    label={t('Select')}
                    value={selectedOption}
                    inputProps={{
                      'data-testid': 'dialogSelect'
                    }}
                    size="small"
                    onChange={handleOptionChange}
                    helperText={t('Select income source')}
                    variant="outlined"
                  >
                    {options.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              }
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <div style={{ padding: '5px 0px 15px 16px' }} >
                    <Button
                      variant="contained"
                      color="primary"
                      data-testid= 'dialogAddButton'
                      size="small"
                      disabled={enableDropdown}
                      onClick={addExpense}>
                                    Add
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  )
}

CustomModal.propTypes = {
  openState: PropTypes.bool,
  incomeList: PropTypes.object,
  currentIncomeSource: PropTypes.string,
  resetModal: PropTypes.func,
  currentExpenseList: PropTypes.object,
  currentExpense: PropTypes.object
}
