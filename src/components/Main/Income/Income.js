import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/actions'
import { useTranslation } from 'react-i18next'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import EditIcon from '@material-ui/icons/Edit'

function Income () {
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [listItems, setListItems] = useState([])
  const [enableEdit, setEnableEdit] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const apiListItems = useSelector((state) => state.cashFlow.apiData)
  useEffect(() => { // fetch data from mock api
    dispatch(actions.getApiData())
  }, [])

  useEffect(() => { // set list items from mock api data
    if (apiListItems.length > 0) {
      setListItems(apiListItems)
    }
  }, [apiListItems])
  const handleChange = (option) => (event) => { // handler for saving income name and amount
    const value = event.target.value
    if (option === 'name') {
      setName(value)
    } else {
      setAmount(value)
    }
  }
  const saveValues = () => { // save incomes values to redux
    dispatch(actions.saveincomeFlowData(listItems))
    setDisabled(true)
  }
  const clearValues = () => { // handler for clearing all income values
    setListItems([])
  }
  const addIncomeDetails = () => { // handler for adding income values as list item
    listItems.push({ name, amount })
    setListItems([...listItems])
    setName('')
    setAmount('')
    if (enableEdit) {
      setEnableEdit(false)
    }
  }
  const deleteItem = (currentIndex) => { // handler for deleting list item
    listItems.splice(currentIndex, 1)
    setListItems([...listItems])
  }
  const editItem = (index) => { // handler for editing list item
    setName(listItems[index].name)
    setAmount(listItems[index].amount)
    setEnableEdit(true)
    deleteItem(index)
  }
  return (
    <Grid container >
      <Grid item xs={12}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6">
              {t('Enter the Income Details') }
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <div className="TextFieldPadding">
          <TextField
            id="income-1"
            label={t('Enter Name')}
            size="small"
            value={name}
            inputProps={{
              'data-testid': 'incomeName'
            }}
            disabled={disabled}
            variant="outlined"
            className="TextFieldPaddingRight"
            onChange={handleChange('name')} />
          <TextField
            id="amount-1"
            variant="outlined"
            label={t('Enter Amount')}
            size="small"
            type="number"
            disabled={disabled}
            inputProps={{
              min: 1,
              'data-testid': 'incomeAmount'
            }}
            className="TextFieldPaddingRight"
            value={amount}
            onChange={handleChange('amount')} />
          <Button
            variant="contained"
            color="primary"
            disabled={!(name && amount)}
            size="medium"
            onClick={addIncomeDetails}>
            {enableEdit ? 'EDIT' : 'ADD'}

          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="listItems">

          <List dense>
            {listItems.map((value, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${t('Income Source')} (${index + 1}) : ${value.name} , ${value.amount}`}
                />
                {!disabled && <IconButton onClick={() => { editItem(index) }} edge="end" className='editItem' aria-label="delete">
                  <EditIcon />
                </IconButton>}
                {!disabled && <ListItemSecondaryAction onClick={() => { deleteItem(index) }} >
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
            <div style={{ padding: '5px 0px 15px 16px' }} >
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!(listItems.length > 1) || disabled}
                onClick={saveValues}>
                                    Save Info
              </Button>
            </div>
          </Grid>
          <Grid item>
            <div style={{ padding: '5px 0px 15px 15px' }}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                disabled={disabled}
                onClick={clearValues}>
                                    Clear Info
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Income
