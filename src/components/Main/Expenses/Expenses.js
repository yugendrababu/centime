import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import React, { useState, useEffect } from 'react'
import CustomModal from '../../library/dialog'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/actions'
import { useTranslation } from 'react-i18next'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import EditIcon from '@material-ui/icons/Edit'

function Expenses () {
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [disabledSubmit, setDisabledSubmit] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [listItems, setListItems] = useState([])
  const [incomeList, setIncomeList] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [open, setOpen] = useState(false)
  const [expensesList, setExpensesList] = useState({})
  const incomeFlowData = useSelector(state => state.cashFlow.incomeFlowData)
  const modifiedExpenseData = useSelector(state => state.cashFlow.modifiedExpenseData)
  useEffect(() => { // get income values  from redux
    if (incomeFlowData.length) {
      const localList = {}
      let localTotalAmount = 0
      incomeFlowData.map((data) => {
        if (localList[data.name]) {
          localList[data.name] += parseInt(data.amount)
        } else {
          localList[data.name] = parseInt(data.amount)
        }
        localTotalAmount += parseInt(data.amount)
        return ''
      })
      const localOptions = []
      Object.keys(localList).map((key) => {
        localOptions.push({ label: key, value: localList[key] })
        return ''
      })
      setDisabled(false)
      setIncomeList({ ...localList })
      setTotalAmount(localTotalAmount)
      setOptions([...localOptions])
    }
  }, [incomeFlowData])
  useEffect(() => { // get additional details when entered amount is greater than the income - from dialog component
    if (modifiedExpenseData) {
      const { expenseDetails, expensesList: list, options: updatedOptions, currentIncomeList } = modifiedExpenseData
      setExpensesList(list)
      listItems.push({ name, amount, expenseDetails, selectedOption })
      setTotalAmount(previousState => previousState - parseInt(amount))
      setListItems([...listItems])
      setToIntitalState()
      setOptions(updatedOptions)
      setIncomeList(currentIncomeList)
      console.log(expenseDetails, list, updatedOptions)
    }
  }, [modifiedExpenseData])
  const handleOptionChange = (event) => { // handler for saving income selection for dropdown
    const value = event.target.value
    if (value) {
      setSelectedOption(value)
    }
  }
  const handleChange = (option) => (event) => { // handler for saving expense name and amount
    const value = event.target.value
    if (option === 'name') {
      setName(value)
    } else {
      setAmount(value)
    }
  }
  const handleClose = () => { // close dialog
    setOpen(false)
  }
  const handleOpen = () => { // open dialog
    setOpen(true)
  }
  const setToIntitalState = () => { // set to empty values
    setName('')
    setAmount('')
    setSelectedOption('')
  }
  const getValues = (expense, array) => { // handler to grab contribution list for array
    const list = []
    array.map(item => {
      list.push([item.incomeName, expense, parseInt(item.amount)])
    })
    return list
  }
  const saveValues = () => { // send contribution list to redux
    let contributionList = [['From', 'To,', 'cash']]
    Object.keys(expensesList).map(key => {
      contributionList = [...contributionList, ...getValues(key, expensesList[key])]
    })
    listItems.map(item => {
      if (item.expenseDetails && item.expenseDetails.data) {
        contributionList = [...contributionList, ...getValues(item.name, item.expenseDetails.data[item.name])]
      }
    })
    dispatch(actions.saveSankeyData([...contributionList]))
    if (totalAmount <= 0) {
      setDisabledSubmit(true)
    }
  }
  const updateOptions = (value, balance) => { // update dropdown values
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
  const pushToExpenseList = () => { // store income and expense contributions
    let localExpensesList = { ...expensesList }
    if (localExpensesList[name]) {
      localExpensesList[name].push({ incomeName: selectedOption, amount })
    } else {
      localExpensesList = {
        ...localExpensesList,
        [name]: [{ incomeName: selectedOption, amount }]
      }
    }
    setExpensesList(localExpensesList)
  }
  const addIncomeDetails = () => { // add expense details to list item
    const localAmount = parseInt(amount)
    if (totalAmount < localAmount) {
      let text = ''
      const dues = totalAmount - localAmount
      let localExpensesList = { ...expensesList }
      Object.keys(incomeList).map((key) => {
        if (localExpensesList[name]) {
          localExpensesList[name].push({ incomeName: key, amount: incomeList[key] })
        } else {
          localExpensesList = {
            ...localExpensesList,
            [name]: [{ incomeName: key, amount: incomeList[key] }]
          }
        }
        text += `| ${key} : ${incomeList[key]} | `
      })
      text += `, Dues=| ${dues} |`
      listItems.push({ name, amount, expenseDetails: { text } })
      setListItems([...listItems])
      setIncomeList({})
      setExpensesList(localExpensesList)
      setTotalAmount(dues)
      setToIntitalState()
      return
    }
    if (localAmount > incomeList[selectedOption] && totalAmount >= localAmount) {
      handleOpen()
      return
    }
    pushToExpenseList()
    listItems.push({ name, amount, selectedOption })
    setTotalAmount(previousState => previousState - localAmount)
    setListItems([...listItems])
    setToIntitalState()
    const remainingAmount = incomeList[selectedOption] - localAmount
    if (remainingAmount) {
      incomeList[selectedOption] = incomeList[selectedOption] - localAmount
      updateOptions(selectedOption, remainingAmount)
    } else {
      delete incomeList[selectedOption]
      updateOptions(selectedOption)
    }
    setIncomeList(incomeList)
  }
  const updateExpenseList = (expense, resetInputs) => { // update list itemd - during edit item and delete Item
    let localTotalamount = 0
    const localOptions = []
    const copyIncomeList = { ...incomeList }
    const localExpenseList = { ...expensesList }
    const localExpense = [...localExpenseList[expense.name]]
    let currentIndex = ''
    let currentExpense = 0
    if (expense.expenseDetails) {
      expense.expenseDetails.data[expense.name].map((item, index) => {
        if (copyIncomeList[item.incomeName]) {
          copyIncomeList[item.incomeName] += parseInt(item.amount)
        } else {
          copyIncomeList[item.incomeName] = parseInt(item.amount)
        }
        currentExpense += parseInt(item.amount)
      })
      currentExpense = expense.amount - currentExpense
    }

    for (let index = 0; index < localExpense.length; index++) {
      const element = localExpense[index]
      if (element.amount === (currentExpense || expense.amount) && element.incomeName === expense.selectedOption) {
        if (copyIncomeList[expense.selectedOption]) {
          copyIncomeList[expense.selectedOption] += parseInt(element.amount)
        } else {
          copyIncomeList[expense.selectedOption] = parseInt(element.amount)
        }
        currentIndex = index
        break
      }
    }
    localExpense.splice(currentIndex, 1)

    if (localExpense.length) {
      localExpenseList[expense.name] = localExpense
    } else {
      delete localExpenseList[expense.name]
    }

    Object.keys(copyIncomeList).map(key => {
      localTotalamount += copyIncomeList[key]
      localOptions.push({ label: key, value: copyIncomeList[key] })
    })
    setIncomeList(copyIncomeList)
    setTotalAmount(localTotalamount)
    setOptions(localOptions)
    setExpensesList(localExpenseList)
    if (resetInputs) {
      setToIntitalState()
    }
  }
  const deleteItem = (currentIndex, value) => { // handler for delete list item
    listItems.splice(currentIndex, 1)
    setListItems([...listItems])
    updateExpenseList(value, true)
  }
  const editItem = (index, value) => { // handler for edit list item
    setName(value.name)
    setAmount(value.amount)
    setSelectedOption(value.selectedOption)
    updateExpenseList(value, false)
    listItems.splice(index, 1)
    setListItems([...listItems])
  }
  const getValue = (value, option) => { // format list item display
    if (value && !option) {
      return `(From : ${value})`
    }
    if (value && option) {
      return ', ' + t('Expense') + ' ' + t('Split') + ' = ' + value
    }
    return ''
  }
  return (
    <Grid container >
      <Grid item xs={12}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6">
              {t('Enter the Expense Details') }
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <div style={{ paddingLeft: 16 }} >
          <Typography variant="caption" >
            {`${t('Total available amount')} : ${totalAmount || '0'}` }
          </Typography>
          {selectedOption && <Typography variant="caption" style={{ marginLeft: 81 }} >
            {`${t('Available amount for')} ${selectedOption} : ${incomeList[selectedOption]}` }
          </Typography>}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="TextFieldPadding">
          <TextField
            id="expense-1"
            label={t('Enter Name')}
            value={name}
            variant="outlined"
            inputProps={{
              'data-testid': 'expenseName'
            }}
            size="small"
            disabled={disabled || !(totalAmount > 1)}
            className="TextFieldPaddingRight"
            onChange={handleChange('name')} />
          <TextField
            id="outlined-select-expense"
            select
            label={t('Select')}
            value={selectedOption}
            size="small"
            inputProps={{
              'data-testid': 'expenseSource'
            }}
            onChange={handleOptionChange}
            className="TextFieldPaddingRight"
            helperText={t('Select income source')}
            variant="outlined"
            disabled={disabled || !(totalAmount > 1)}
          >
            {options.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="amount1"
            variant="outlined"
            label={t('Enter Amount')}
            type="number"
            size="small"
            inputProps={{
              'data-testid': 'expenseAmount'
            }}
            className="TextFieldPaddingRight"
            disabled={disabled || !(totalAmount > 1)}
            value={amount}
            onChange={handleChange('amount')} />
          <Button
            variant="contained"
            color="primary"
            disabled={!(name && amount && selectedOption)}
            size="medium"
            onClick={addIncomeDetails}>
                            ADD
          </Button>

        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="listItems">
          <List dense>
            {listItems.map((value, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${t('Expense')} (${index + 1}) : ${value.name} , ${value.amount} ${value.expenseDetails && value.expenseDetails.text ? getValue(value.expenseDetails.text, true) : getValue(value.selectedOption)}`}
                />
                {!disabledSubmit && <IconButton data-testid='expenseEditItem' onClick={() => { editItem(index, value) }} edge="end" className='editItem' aria-label="delete">
                  <EditIcon />
                </IconButton>}
                {!disabledSubmit && <ListItemSecondaryAction data-testid='expenseDeleteItem' onClick={() => { deleteItem(index, value) }} >
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>}
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <div style={{ paddingBottom: 15, paddingLeft: 16 }} >
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!(listItems.length > 0) || disabledSubmit}
                onClick={saveValues}>
                {t('Submit')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {open &&
            <CustomModal
              openState={open}
              currentExpense={{ name, amount }}
              incomeList={incomeList}
              resetModal={handleClose}
              currentExpenseList={expensesList}
              currentIncomeSource={selectedOption}/>}
    </Grid>
  )
}

export default Expenses
