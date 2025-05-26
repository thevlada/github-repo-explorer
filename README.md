# GitHub Repository Explorer

A modern React application for exploring and searching GitHub repositories with a focus on React-related projects. Built with TypeScript, Material UI, and Apollo Client for GraphQL API integration.

## 🚀 Features

- **Smart Search**: Search-as-you-type with debouncing after 3 characters (500ms delay)
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

- Node.js 22+ and npm
- GitHub Personal Access Token (see setup instructions below)
- Docker (optional, for containerization)

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

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your GitHub Personal Access Token:
   ```env
   REACT_APP_GITHUB_TOKEN=your_github_personal_access_token_here
   ```
   
   **To get a GitHub Personal Access Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a descriptive name (e.g., "GitHub Repo Explorer")
   - Select the `public_repo` scope (or `repo` for private repositories)
   - Click "Generate token"
   - Copy the token and paste it in your `.env` file

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm install -g serve
serve -s build
```

### Docker Deployment

1. **Set up environment variables**
   Make sure your `.env` file is configured with your GitHub token (see step 3 above)

2. **Build the Docker image**
   ```bash
   docker build --build-arg REACT_APP_GITHUB_TOKEN=$(grep REACT_APP_GITHUB_TOKEN .env | cut -d '=' -f2) -t github-repo-explorer .
   ```

3. **Run the container**
   ```bash
   docker run -p 8080:80 github-repo-explorer
   ```

4. **Access the application**
   Navigate to [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Search input with debouncing
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

## 🔍 Search Functionality

The application features an intelligent search system:

- **Minimum Characters**: Search begins after typing 3 characters
- **Debouncing**: 500ms delay to prevent excessive API calls
- **Real-time Results**: Automatic search as you type
- **Visual Feedback**: Helper text guides users on minimum requirements
- **Empty State Handling**: Clear messaging when no search term is entered

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

### Search Optimization
- **Debouncing**: Prevents API spam while maintaining responsive feel
- **Minimum Character Threshold**: Reduces meaningless searches
- **Smart State Management**: Handles empty states and loading gracefully

### Code Quality
- **ESLint**: Enforces coding standards and catches potential issues
- **Prettier**: Consistent code formatting across the project
- **Pre-commit Hooks**: Automated linting and formatting before commits
- **TypeScript**: Static type checking for better developer experience

## 🔑 API Configuration

The application uses GitHub's GraphQL API v4 with a Personal Access Token stored in environment variables:

```typescript
// Environment variable usage
const token = process.env.REACT_APP_GITHUB_TOKEN;
```

**Security Note**: Never commit your `.env` file to version control. The `.env` file is included in `.gitignore` to prevent accidental commits.

## 🐳 Docker Configuration

The application includes a multi-stage Dockerfile for optimized production builds:

- **Build Stage**: Installs dependencies and builds the React application
- **Production Stage**: Serves the built application with Nginx
- **Optimizations**: Minimal Alpine Linux images, static asset caching

**Environment Variables in Docker**: Use `--env-file .env` when running the container to pass environment variables.

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
