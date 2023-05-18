import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReportIcon from '@mui/icons-material/Report';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, Paper, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import { searchBarActions } from '../model/slice/searchBarSlice';

interface SearchBarProps {
  isError: boolean;
  isLoading: boolean;
}

export const SearchBar = (props: SearchBarProps) => {
  const { isError, isLoading } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const curSearchBarInput = useAppSelector((state) => state.searchBarState.curSearchBarInput);
  const isValidAPI = useAppSelector((state) => state.searchBarState.isValidAPI);

  const handleClick = useCallback(() => {
    dispatch(searchBarActions.changeSearchBarInput(searchValue));
  }, [dispatch, searchValue]);
  return (
    <Paper component="div" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <TextField
        sx={{ ml: 1, flex: 1 }}
        variant="standard"
        size="small"
        label={
          (isError && t('apiError')) ||
          (isValidAPI && t('apiSuccess')) ||
          (isLoading && t('apiLoading')) ||
          'API'
        }
        placeholder={(isError && t('apiPlaceholderError')) || t('apiPlaceholder')}
        inputProps={{ 'aria-label': 'api for documentation' }}
        value={searchValue}
        color={isValidAPI ? 'success' : 'primary'}
        error={isError}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {isValidAPI && !isError && <DoneAllIcon color="success" />}
      {!isValidAPI && isError && <ReportIcon color="error" />}

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleClick}
        color="info"
        disabled={curSearchBarInput === searchValue}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
