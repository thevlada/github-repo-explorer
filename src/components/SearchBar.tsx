import React, { useState, useCallback } from 'react';
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
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search repositories...',
  defaultValue = 'react',
}) => {
  const [searchValue, setSearchValue] = useState(defaultValue);

  const handleSearch = useCallback(() => {
    onSearch(searchValue.trim());
  }, [onSearch, searchValue]);

  const handleClear = useCallback(() => {
    setSearchValue('');
    onSearch('');
  }, [onSearch]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch} edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
};
