import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  maxWidth: 600,
  width: '100%',
}));

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  defaultValue?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search repositories...',
  defaultValue = 'react',
  debounceMs = 500,
}) => {
  const [searchValue, setSearchValue] = useState(defaultValue);

  // Debounced search effect
  useEffect(() => {
    // Don't search for empty strings or strings shorter than 3 characters
    if (searchValue.trim().length === 0) {
      onSearch('');
      return;
    }

    if (searchValue.trim().length < 3) {
      return;
    }

    const timeoutId = setTimeout(() => {
      onSearch(searchValue.trim());
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onSearch, debounceMs]);

  // Trigger initial search on mount
  useEffect(() => {
    if (defaultValue && defaultValue.length >= 3) {
      onSearch(defaultValue);
    }
  }, [defaultValue, onSearch]);

  const handleClear = useCallback(() => {
    setSearchValue('');
  }, []);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && searchValue.trim().length >= 3) {
        onSearch(searchValue.trim());
      }
    },
    [onSearch, searchValue]
  );

  return (
    <SearchContainer>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        helperText={
          searchValue.length > 0 && searchValue.length < 3
            ? 'Type at least 3 characters to search'
            : ''
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
};
