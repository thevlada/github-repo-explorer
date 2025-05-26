# GitHub Repository Explorer

A modern React application for exploring and searching GitHub repositories with a focus on React-related projects. Built with TypeScript, Material UI, and Apollo Client for GraphQL API integration.

## 🚀 Features

- **Repository Search**: Search for repositories by name with flexible search terms
- **Real-time Data**: Fetches live data from GitHub's GraphQL API v4
- **Responsive Design**: Modern, mobile-friendly UI built with Material UI
- **Pagination**: Load more repositories with infinite scroll-like pagination
- **Repository Details**: View stars, forks, description, primary language, and last update
- **Direct Links**: Click repository names to visit the actual GitHub repository
- **Loading States**: Skeleton loading and proper error handling
- **Code Quality**: ESLint, Prettier, and pre-commit hooks for consistent code

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Framework**: Material UI v6 with CSS-in-JS styling
- **GraphQL Client**: Apollo Client v3
- **API**: GitHub GraphQL API v4
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Containerization**: Docker with multi-stage builds
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js 16+ and npm
- Docker (optional, for containerization)
- GitHub Personal Access Token (already configured)

## 🚀 Quick Start

### Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-repo-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm install -g serve
serve -s build
```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t github-repo-explorer .
   ```

2. **Run the container**
   ```bash
   docker run -p 8080:80 github-repo-explorer
   ```

3. **Access the application**
   Navigate to [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Search input component
│   ├── RepositoryItem.tsx  # Individual repository card
│   └── RepositoryList.tsx  # Repository list with pagination
├── hooks/              # Custom React hooks
│   └── useRepositories.ts  # Repository data fetching hook
├── services/           # External service integrations
│   ├── apolloClient.ts # Apollo Client configuration
│   └── queries.ts      # GraphQL queries
├── types/              # TypeScript type definitions
│   └── repository.ts   # Repository-related types
├── utils/              # Utility functions
│   └── formatters.ts   # Number and date formatting
└── App.tsx            # Main application component
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## 🎨 Design Decisions

### Architecture
- **Domain-Driven Design**: Clear separation of concerns with dedicated folders for types, services, hooks, and components
- **Custom Hooks**: Business logic abstracted into reusable hooks
- **Component Composition**: Small, focused components that are easy to test and maintain

### Styling
- **CSS-in-JS**: Material UI's styled components for type-safe, theme-aware styling
- **Responsive Design**: Mobile-first approach with Material UI's responsive utilities
- **Consistent Theming**: Centralized theme configuration for colors, typography, and spacing

### Data Management
- **Apollo Client**: Efficient GraphQL client with caching and error handling
- **Type Safety**: Full TypeScript integration for API responses and component props
- **Error Boundaries**: Graceful error handling with user-friendly messages

### Code Quality
- **ESLint**: Enforces coding standards and catches potential issues
- **Prettier**: Consistent code formatting across the project
- **Pre-commit Hooks**: Automated linting and formatting before commits
- **TypeScript**: Static type checking for better developer experience

## 🔑 API Configuration

The application uses GitHub's GraphQL API v4 with a Personal Access Token. The token is currently hardcoded for development purposes but should be moved to environment variables for production:

```typescript
// In production, use:
const token = process.env.REACT_APP_GITHUB_TOKEN;
```

## 🐳 Docker Configuration

The application includes a multi-stage Dockerfile for optimized production builds:

- **Build Stage**: Installs dependencies and builds the React application
- **Production Stage**: Serves the built application with Nginx
- **Optimizations**: Minimal Alpine Linux images, static asset caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or modifications
- `chore:` - Build process or auxiliary tool changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub GraphQL API](https://docs.github.com/en/graphql) for providing the data
- [Material UI](https://mui.com/) for the excellent component library
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL integration
- [Create React App](https://create-react-app.dev/) for the initial project setup
