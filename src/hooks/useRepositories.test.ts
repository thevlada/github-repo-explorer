import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ReactNode } from 'react';
import { useRepositories } from './useRepositories';
import { SEARCH_REPOSITORIES } from '../services/queries';

const createWrapper = (mocks: any[]) => {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => {
    const React = require('react');
    return React.createElement(
      MockedProvider,
      { mocks, addTypename: false },
      children
    );
  };
};

describe('useRepositories', () => {
  it('should initialize with default values', () => {
    const mocks = [
      {
        request: {
          query: SEARCH_REPOSITORIES,
          variables: {
            query: 'react in:name sort:stars-desc',
            first: 20,
          },
        },
        result: {
          data: {
            search: {
              repositoryCount: 0,
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: null,
                endCursor: null,
              },
              nodes: [],
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useRepositories(), {
      wrapper: createWrapper(mocks),
    });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.totalCount).toBe(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.currentSearchTerm).toBe('react');
  });

  it('should handle empty search term', () => {
    const mocks: any[] = [];

    const { result } = renderHook(() => useRepositories(), {
      wrapper: createWrapper(mocks),
    });

    act(() => {
      result.current.searchRepositories('');
    });

    expect(result.current.currentSearchTerm).toBe('');
    expect(result.current.repositories).toEqual([]);
  });

  it('should handle search term with only whitespace', () => {
    const mocks: any[] = [];

    const { result } = renderHook(() => useRepositories(), {
      wrapper: createWrapper(mocks),
    });

    act(() => {
      result.current.searchRepositories('   ');
    });

    expect(result.current.currentSearchTerm).toBe('   ');
    expect(result.current.repositories).toEqual([]);
  });

  it('should update search term when searching', () => {
    const mocks: any[] = [];

    const { result } = renderHook(() => useRepositories(), {
      wrapper: createWrapper(mocks),
    });

    act(() => {
      result.current.searchRepositories('vue');
    });

    expect(result.current.currentSearchTerm).toBe('vue');
  });

  it('should provide all required functions and properties', () => {
    const mocks: any[] = [];

    const { result } = renderHook(() => useRepositories(), {
      wrapper: createWrapper(mocks),
    });

    expect(typeof result.current.searchRepositories).toBe('function');
    expect(typeof result.current.loadMore).toBe('function');
    expect(typeof result.current.refetch).toBe('function');
    expect(Array.isArray(result.current.repositories)).toBe(true);
    expect(typeof result.current.loading).toBe('boolean');
    expect(typeof result.current.totalCount).toBe('number');
    expect(typeof result.current.hasNextPage).toBe('boolean');
    expect(typeof result.current.hasPreviousPage).toBe('boolean');
    expect(typeof result.current.currentSearchTerm).toBe('string');
  });

  it('should not load more when query is empty', () => {
    const mocks: any[] = [];

    const { result } = renderHook(() => useRepositories(), {
      wrapper: createWrapper(mocks),
    });

    // Clear search term
    act(() => {
      result.current.searchRepositories('');
    });

    // Try to load more with empty query - should not crash
    act(() => {
      result.current.loadMore();
    });

    expect(result.current.repositories).toEqual([]);
  });
});
