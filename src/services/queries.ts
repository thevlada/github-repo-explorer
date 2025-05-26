import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          url
          stargazerCount
          forkCount
          description
          primaryLanguage {
            name
            color
          }
          updatedAt
        }
      }
    }
  }
`;
