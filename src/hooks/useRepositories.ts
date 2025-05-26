import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../services/queries';
import { RepositorySearchResult, SearchVariables } from '../types/repository';

interface UseRepositoriesResult {
  repositories: RepositorySearchResult['search']['nodes'];
  loading: boolean;
  error: any;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  searchRepositories: (searchTerm: string) => void;
  loadMore: () => void;
  refetch: () => void;
  currentSearchTerm: string;
}

export const useRepositories = (): UseRepositoriesResult => {
  const [currentSearchTerm, setCurrentSearchTerm] = useState('react');
  const [variables, setVariables] = useState<SearchVariables>({
    query: 'react in:name sort:stars-desc',
    first: 20,
  });

  const { data, loading, error, fetchMore, refetch } = useQuery<
    RepositorySearchResult,
    SearchVariables
  >(SEARCH_REPOSITORIES, {
    variables,
    notifyOnNetworkStatusChange: true,
    skip: !variables.query, // Skip query if no search term
  });

  const searchRepositories = useCallback((newSearchTerm: string) => {
    setCurrentSearchTerm(newSearchTerm);

    // If search term is empty, don't perform search
    if (!newSearchTerm.trim()) {
      setVariables({ query: '', first: 20 });
      return;
    }

    const newQuery = `${newSearchTerm.trim()} in:name sort:stars-desc`;

    setVariables({
      query: newQuery,
      first: 20,
    });
  }, []);

  const loadMore = useCallback(() => {
    if (data?.search.pageInfo.hasNextPage && variables.query) {
      fetchMore({
        variables: {
          ...variables,
          after: data.search.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            search: {
              ...fetchMoreResult.search,
              nodes: [...prev.search.nodes, ...fetchMoreResult.search.nodes],
            },
          };
        },
      });
    }
  }, [data, fetchMore, variables]);

  return {
    repositories: data?.search.nodes || [],
    loading,
    error,
    totalCount: data?.search.repositoryCount || 0,
    hasNextPage: data?.search.pageInfo.hasNextPage || false,
    hasPreviousPage: data?.search.pageInfo.hasPreviousPage || false,
    searchRepositories,
    loadMore,
    refetch,
    currentSearchTerm,
  };
};
