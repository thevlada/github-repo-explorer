import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import { Repository } from '../types/repository';
import { RepositoryItem } from './RepositoryItem';

const ListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
}));

const LoadMoreContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error: any;
  totalCount: number;
  hasNextPage: boolean;
  onLoadMore: () => void;
  currentSearchTerm: string;
}

const RepositoryListSkeleton: React.FC = () => (
  <Box>
    {Array.from({ length: 5 }).map((_, index) => (
      <Box key={index} sx={{ marginBottom: 2 }}>
        <Skeleton variant="rectangular" height={120} />
      </Box>
    ))}
  </Box>
);

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  loading,
  error,
  totalCount,
  hasNextPage,
  onLoadMore,
  currentSearchTerm,
}) => {
  if (error) {
    return (
      <ListContainer>
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          Error loading repositories: {error.message}
        </Alert>
      </ListContainer>
    );
  }

  if (!currentSearchTerm.trim()) {
    return (
      <ListContainer>
        <EmptyStateContainer>
          <Typography variant="h6" gutterBottom>
            Start typing to search repositories
          </Typography>
          <Typography variant="body2">
            Enter at least 3 characters to begin searching GitHub repositories
          </Typography>
        </EmptyStateContainer>
      </ListContainer>
    );
  }

  if (loading && repositories.length === 0) {
    return (
      <ListContainer>
        <RepositoryListSkeleton />
      </ListContainer>
    );
  }

  if (repositories.length === 0 && !loading) {
    return (
      <ListContainer>
        <Alert severity="info">
          No repositories found for "{currentSearchTerm}". Try a different
          search term.
        </Alert>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <StatsContainer>
        <Typography variant="body2" color="text.secondary">
          Found {totalCount.toLocaleString()} repositories for "
          {currentSearchTerm}" • Showing {repositories.length}
        </Typography>
      </StatsContainer>

      {repositories.map((repository) => (
        <RepositoryItem key={repository.id} repository={repository} />
      ))}

      {hasNextPage && (
        <LoadMoreContainer>
          <Button
            variant="outlined"
            onClick={onLoadMore}
            disabled={loading}
            startIcon={loading && <CircularProgress size={16} />}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </LoadMoreContainer>
      )}
    </ListContainer>
  );
};
