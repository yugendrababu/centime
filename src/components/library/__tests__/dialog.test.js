import React from 'react';
import { render ,fireEvent  ,screen} from '@testing-library/react';
import CustomModal from '../dialog';
import i18n from "i18next";
import {initReactI18next  } from "react-i18next";
import  en from '../../../translations/en';
import  fr from '../../../translations/fr';

i18n
  .use(initReactI18next) //passing i18next to down react components
  .init({
    resources: {
      en,
      fr
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
const incomeList ={
    salary:400,
    stocks:1200,
    funds:1300
}
const contributionList=[['From','To,','cash']];
const selectedOption='salary'
const currentExpense={name:'bill',amount:1200};
const handleClose = jest.fn();
const addExpenseDetails =jest.fn()
const component = <CustomModal 
    openState={true}
    currentExpense={currentExpense}
    incomeList={incomeList}
    resetModal={handleClose}
    addExpenseDetails={addExpenseDetails}
    currentContributionList={contributionList}
    currentIncomeSource={selectedOption}
/>

test('test for Amount Exceeded current income Source text', () => {
  const { getByText } = render(component );
  const element = getByText(/Amount Exceeded current income Source/i);
  expect(element).toBeInTheDocument();
});

test('test for Contributed Income source(s)', () => {
    const { getByText } = render(component);
    const element = getByText(`Contributed Income source(s) : | salary : 400 |`);
    expect(element).toBeInTheDocument();
});

test('test for current expense', () => {
    const { getByText } = render(component);
    const element = getByText(`Current Expense(s) : | bill : 1200 |`);
    expect(element).toBeInTheDocument();
});

test('test for valid message', () => {
    const { getByText } = render(component);
    const element = getByText(`Expense not valid. Please select another income :`);
    expect(element).toBeInTheDocument();
});

test('test for select', () => {
    const { getByText } = render(component);
    
    const element = getByText(`Expense not valid. Please select another income :`);
    expect(element).toBeInTheDocument();
});

test('test for select empty', () => {
    const { getByTestId } = render( component );
      const Input = getByTestId('dialogSelect');
      expect(Input).toHaveValue('');
})

test('test for select option', () => {
    const { getByTestId ,getByText } =  render( component );
      const Input = getByTestId('dialogSelect');
      fireEvent.change(Input, { target: { value: 'stocks' } });
      expect(Input).toHaveValue('');
})

test('test for select option text change', () => {
    const { getByTestId ,getByText } =  render( component );
      const Input = getByTestId('dialogSelect');
      fireEvent.change(Input, { target: { value: 'stocks' } });
      const element = getByText(`Contributed Income source(s) : | salary : 400 | stocks : 800 |`);
      expect(element).toBeInTheDocument();
})
test('test for select option text change', () => {
    const { getByTestId ,getByText } =  render( component );
      const Input = getByTestId('dialogSelect');
      fireEvent.change(Input, { target: { value: 'stocks' } });
      const element = getByText(`Expense is valid. Please continue to add :`);
      expect(element).toBeInTheDocument();
})

test('test for add button', () => {
    const { getByTestId } = render(component);
    const element = getByTestId('dialogAddButton');
    expect(element).toBeInTheDocument();
});

test('test for add button action', () => {
    const { getByTestId  } =  render( component );
    const Input = getByTestId('dialogSelect');
    fireEvent.change(Input, { target: { value: 'stocks' } });
    const element = getByTestId('dialogAddButton');
    fireEvent.click(element);
})
test('test for select options amount exceeded', () => {
    const { getByTestId  } =  render( 
        <CustomModal 
        openState={true}
        currentExpense={{name:'bill',amount:1700}}
        incomeList={incomeList}
        resetModal={handleClose}
        addExpenseDetails={addExpenseDetails}
        currentContributionList={contributionList}
        currentIncomeSource={selectedOption}
    />
     );
    const Input = getByTestId('dialogSelect');
    fireEvent.change(Input, { target: { value: 'stocks' } });
    fireEvent.change(Input, { target: { value: 'funds' } });
    const element = getByTestId('dialogAddButton');
    fireEvent.click(element);
})

