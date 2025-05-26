export interface Repository {
  id: string;
  name: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  description?: string;
  primaryLanguage?: {
    name: string;
    color: string;
  };
  updatedAt: string;
}

export interface RepositorySearchResult {
  search: {
    repositoryCount: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
    nodes: Repository[];
  };
}

export interface SearchVariables {
  query: string;
  first?: number;
  after?: string;
  before?: string;
}
