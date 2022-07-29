import './App.css';
import React, { lazy, Suspense }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Flex } from '@chakra-ui/react';
import loading from './assets/images/logo_demo.gif';

import Home from './pages/Home';
import Login from './pages/Login';
import Enquire from './pages/Enquire';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';

import Nav from './components/Nav';
import NavDashboard from './components/NavDashboard';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const Nav = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./components/Nav')), 2500);
//   });
// });

function App() {
  return (
    <ApolloProvider client={client}>
      
      <Router>
        <div className="App">
          <Suspense fallback={
            <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={loading}
            backgroundSize={'cover'}
            backgroundPosition={''}></Flex>
            }>
            <Nav />
            </Suspense>
            <Routes>
              {/* <switch> */}
              <Route 
                path="/dashboard" 
                element={<NavDashboard />} 
              />
              {/* </switch> */}
            
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/enquire" 
                element={<Enquire />} 
              />
              <Route 
                path="/2dashboard" 
                element={<Dashboard />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
