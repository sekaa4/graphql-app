import { Button, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';

import { getSearchBarInput } from '@/features/SearchBar';
import { useAppSelector } from '@/shared/hooks';

import { fetchGraphQlDataByAnyAPI } from '../api/graphQlDataByAnyAPI';
import { RequestObj } from '../types/RequestObj.type';

export const Editor = () => {
  const [schemaSDL, setSchemaSDL] = useState<string>('');
  const [variablesSDL, setVariablesSDL] = useState<string>('{}');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const urlAPI = useAppSelector(getSearchBarInput);
  const [getGraphQlData, { data, error, isLoading }] = fetchGraphQlDataByAnyAPI();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSchemaSDL(value);
  };

  const handleChangeVariables = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setVariablesSDL(value);
  };
  const handleButtonClick = () => {
    try {
      const requestObj: RequestObj = {
        url: urlAPI,
        request: schemaSDL,
        variables: JSON.parse(variablesSDL),
      };

      getGraphQlData(requestObj);
      setErrorMessage(``);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Variables are invalid JSON: ${error.message}`);
      }
    }
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
        <div>
          <TextareaAutosize
            minRows={20}
            cols={30}
            placeholder="Write GraphQl Variables here"
            value={variablesSDL}
            onChange={handleChangeVariables}
          />
        </div>
      </section>
      <section>
        {errorMessage && <div>{errorMessage}</div>}
        {!errorMessage && isLoading && <div>Loading...</div>}
        {!errorMessage && !isLoading && data && <div>{JSON.stringify(data)}</div>}
        {!errorMessage &&
          !isLoading &&
          error &&
          'data' in error &&
          error.status !== 'PARSING_ERROR' && <div>{JSON.stringify(error.data)}</div>}
        {!errorMessage && !isLoading && error && 'message' in error && (
          <div>{JSON.stringify(error)}</div>
        )}
        <div></div>
      </section>
    </>
  );
};
