import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { apolloClient } from './services/apolloClient';
import { useRepositories } from './hooks/useRepositories';
import { SearchBar } from './components/SearchBar';
import { RepositoryList } from './components/RepositoryList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

const AppContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const AppContent: React.FC = () => {
  const {
    repositories,
    loading,
    error,
    totalCount,
    hasNextPage,
    searchRepositories,
    loadMore,
    currentSearchTerm,
  } = useRepositories();

  return (
    <AppContainer maxWidth="lg">
      <Header>
        <Typography variant="h4" component="h1" gutterBottom>
          GitHub Repository Explorer
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover and explore React repositories on GitHub
        </Typography>
      </Header>

      <SearchBar onSearch={searchRepositories} />

      <RepositoryList
        repositories={repositories}
        loading={loading}
        error={error}
        totalCount={totalCount}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
        currentSearchTerm={currentSearchTerm}
      />
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
