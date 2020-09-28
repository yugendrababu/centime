import React from 'react';
import { render ,fireEvent  ,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Header from '../Header';
import configureStore from '../../../redux/store/store';
//import { Provider } from 'react-redux';
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


test('test for RESET button text', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/RESET/i);
  expect(linkElement).toBeInTheDocument();
});

test('test for Language select', () => {
    const { getByTestId } = render(<Header />);
    const Input = getByTestId('languageSelect');
    expect(Input).toHaveValue('en');
});
test('test for Language select', () => {
    const { getByTestId } = render(<Header />);
    const Input = getByTestId('languageSelect');
    fireEvent.change(Input, { target: { value: 'fr' } });
    expect(Input).toHaveValue('fr');
});