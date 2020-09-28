import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import React,{useState,useEffect} from 'react'; 
import CustomModal from '../../library/dialog'
import { useDispatch } from "react-redux";
import * as actions from '../../../redux/actions/actions';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";




function Expenses(){
    const dispatch = useDispatch();
    const [t] = useTranslation();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [disabledSubmit,setDisabledSubmit] = useState(false)
    const [options , setOptions] = useState([])
    const [selectedOption,setSelectedOption] = useState('');
    const [listItems,setListItems] = useState([]);
    const [incomeList,setIncomeList] =useState({});
    const [totalAmount, setTotalAmount]=useState(0);
    const [open, setOpen] = useState(false);
    const [contributionList,setContributionList] =useState([['From','To,','cash']]);
   const cashFlowData = useSelector(state => state.cashFlow.cashFlowData);
    useEffect(()=>{
        if(cashFlowData.length){
            const localList={};
            let localTotalAmount=0;
            cashFlowData.map((data)=>{
                if(localList[data.name]){
                    localList[data.name]+=parseInt(data.amount);
                }else{
                    localList[data.name]=parseInt(data.amount);
                }
                localTotalAmount+=parseInt(data.amount);
                return '';
            })
            let localOptions = [];
            Object.keys(localList).map((key)=>{
                localOptions.push({label:key,value:localList[key]});
                return '';
            })
            setDisabled(false)
            setIncomeList({...localList});
            setTotalAmount(localTotalAmount);
            setOptions([...localOptions]);
        }
    },[cashFlowData])
    const handleOptionChange =  (event) => {
        const value = event.target.value
        if(value){
            setSelectedOption(value)
        }
    };
    const handleChange = (option) => (event) => {
        const value = event.target.value
        if(option ==='name'){
            setName(value)
        }
        else{
            setAmount(value)
        }
    };
    const handleClose = () => {
        setOpen(false);
      };
    const handleOpen = () => {
      setOpen(true);
    };
    const setToIntitalState = ()=>{
        setName('');
        setAmount('');
        setSelectedOption('')
    }
    const saveValues =()=>{
        dispatch(actions.saveSankeyData(contributionList));
        setDisabledSubmit(true);
    }
    const updateOptions = (value,balance) =>{
        let localOptions=[];
        for (var i = 0; i < options.length; i++) {
            if (options[i].label === value) {
                if(balance){
                    localOptions.push({label:options[i].label,value:balance});
                }
            }
            else{
                localOptions.push({label:options[i].label,value:options[i].value});
            }
        }
        setOptions(localOptions);         
    }
    const addIncomeDetails= () =>{
        let localAmount = parseInt(amount);
        if(totalAmount<localAmount){
            let text = '';
            const dues = totalAmount-localAmount;
            Object.keys(incomeList).map((key)=>{
                contributionList.push([`${key}`,`${name}`,incomeList[key]]);
                setContributionList(contributionList);
                text+=`| ${key} : ${incomeList[key]} | ` 
            })
            text+=`, Dues=| ${dues} |`
            listItems.push({name,amount,expenseDetails:text});
            setListItems([...listItems]);
            setIncomeList({});
            setTotalAmount(dues);
            setToIntitalState();
            return;
        }
        if(localAmount>incomeList[selectedOption]&&totalAmount>=localAmount){
            handleOpen();
            return;
        }
        contributionList.push([`${selectedOption}`,`${name}`,localAmount]);
        setContributionList(contributionList)
        listItems.push({name,amount,selectedOption});
        setTotalAmount((previousState=>previousState-localAmount));
        setListItems([...listItems]);
        setToIntitalState();
        const remainingAmount =incomeList[selectedOption]-localAmount
        if(remainingAmount){
            incomeList[selectedOption]=incomeList[selectedOption]-localAmount;
            updateOptions(selectedOption,remainingAmount)
        }else{
            delete incomeList[selectedOption];
            updateOptions(selectedOption)
        }
        setIncomeList(incomeList);
    }
    const addExpenseDetails= (data)=>{
        const {expenseDetails,contributionList:list,options:updatedOptions,currentIncomeList} =data;
        setContributionList(list)
        listItems.push({name,amount,expenseDetails});
        setTotalAmount((previousState=>previousState-parseInt(amount)));
        setListItems([...listItems]);
        setToIntitalState();
        setOptions(updatedOptions)
        setIncomeList(currentIncomeList);
        console.log(expenseDetails,list,updatedOptions)
    }
    const getValue = (value,option)=>{
        if(value&&!option){
            return `(From : ${value})`
        }
        if(value&&option){
            return ', '+t("Expense")+' '+t("Split")+' = '+value;
        }
        return '';
    }
    return(
        <Grid  container >
            <Grid item xs={12}>
                <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography variant="h6">
                    {t("Enter the Expense Details") }
                    </Typography>
                </Toolbar>
            </AppBar>
            </Grid>
            <Grid item xs={12}>
                <div style={{paddingLeft:16}} >
                <Typography variant="caption" >
                {`${t('Total available amount')} : ${totalAmount||'0'}` }
                </Typography>
                {selectedOption&&<Typography variant="caption" style={{marginLeft: 81}} >
                {`${t("Available amount for")} ${selectedOption} : ${incomeList[selectedOption]}` }
                </Typography>}
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="TextFieldPadding">
                   <TextField 
                        id="expense-1" 
                        label={t("Enter Name")} 
                        value={name}
                        variant="outlined"
                        inputProps={{
                            'data-testid': 'expenseName'
                          }}
                        size="small" 
                        disabled={disabled||!(totalAmount>1)}
                        className="TextFieldPaddingRight"
                        onChange={handleChange('name')} />
                   <TextField
                        id="outlined-select-expense"
                        select
                        label={t("Select")}
                        value={selectedOption}
                        size="small"
                        inputProps={{
                            'data-testid': 'expenseSource'
                          }} 
                        onChange={handleOptionChange}
                        className="TextFieldPaddingRight"
                        helperText={t("Select income source")}
                        variant="outlined"
                        disabled={disabled ||!(totalAmount>1)}
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
                        label={t("Enter Amount")}
                        type="number"
                        size="small"
                        inputProps={{
                            'data-testid': 'expenseAmount'
                          }}
                        className="TextFieldPaddingRight"
                        disabled={disabled||!(totalAmount>1)}
                        value={amount} 
                        onChange={handleChange('amount')} />
                    <Button 
                        variant="contained" 
                        color="primary"
                        disabled={!(name&&amount&&selectedOption)} 
                        size="medium"  
                        onClick={addIncomeDetails}>
                            ADD
                    </Button>

                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="listItems">                    
                   <List dense>
                        {listItems.map((value,index)=>(
                            <ListItem key={index}>
                                <ListItemText
                                primary={`${t("Expense")} (${index+1}) : ${value.name} , ${value.amount} ${value.expenseDetails? getValue(value.expenseDetails,true) : getValue(value.selectedOption)}`}
                                />
                                {/* <ListItemSecondaryAction onClick={()=>{deleteItem(index)}}>
                                    <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction> */}
                            </ListItem>
                            ))}    
                    </List>
                </div>             
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <div style={{paddingBottom:15,paddingLeft:16}} >
                            <Button 
                                variant="contained" 
                                color="primary"
                                size="small" 
                                disabled={!(listItems.length>0)||disabledSubmit}
                                onClick={saveValues}>
                                    {t('Submit')}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            {open&&
            <CustomModal 
              openState={open}
              currentExpense={{name,amount}}
              incomeList={incomeList}
              resetModal={handleClose}
              addExpenseDetails={addExpenseDetails}
              currentContributionList={contributionList}
              currentIncomeSource={selectedOption}/>}
        </Grid>
    )
}

export default Expenses;