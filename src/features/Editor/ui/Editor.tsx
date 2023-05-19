import { Button, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';

import { getSearchBarInput } from '@/features/SearchBar';
import { useAppSelector } from '@/shared/hooks';

import { fetchGraphQlDataByAnyAPI } from '../api/graphQlDataByAnyAPI';
import { RequestObj } from '../types/RequestObj.type';

export const Editor = () => {
  const [schemaSDL, setSchemaSDL] = useState<string>('');
  const urlAPI = useAppSelector(getSearchBarInput);
  const [getGraphQlData, { data, error, isLoading }] = fetchGraphQlDataByAnyAPI();
  const requestObj: RequestObj = {
    url: urlAPI,
    request: schemaSDL,
    variables: {},
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSchemaSDL(value);
  };
  const handleButtonClick = () => {
    getGraphQlData(requestObj);
  };

  return (
    <>
      <section>
        <TextareaAutosize
          minRows={20}
          cols={30}
          placeholder="Write GraphQl request here"
          value={schemaSDL}
          onChange={handleChange}
        />
        <div>
          <Button variant="contained" onClick={handleButtonClick}>
            Sent
          </Button>
        </div>
      </section>
      <section>
        {isLoading && <div>Loading...</div>}
        {!isLoading && data && <div>{JSON.stringify(data)}</div>}
        {!isLoading && error && 'data' in error && error.status !== 'PARSING_ERROR' && (
          <div>{JSON.stringify(error.data)}</div>
        )}
        {!isLoading && error && 'message' in error && <div>{JSON.stringify(error)}</div>}
        <div></div>
      </section>
    </>
  );
};
