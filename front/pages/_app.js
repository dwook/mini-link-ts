import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import wrapper from '../store';
import GlobalStyle from '../src/style/global';
import theme from '../src/style/theme';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1, user-scalable=no"
      />
    </Head>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
