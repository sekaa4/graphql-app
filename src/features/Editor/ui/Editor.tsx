import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress, IconButton, TextareaAutosize } from '@mui/material';
import { t } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSearchBarInput } from '@/features/SearchBar';
import { useAppSelector } from '@/shared/hooks';

import { fetchGraphQlDataByAnyAPI } from '../api/graphQlDataByAnyAPI';
import { RequestObj } from '../types/RequestObj.type';
import cls from './editor.module.css';

type motionState = {
  activeVertical?: boolean;
  activeHorizontal?: boolean;
  deltaLeft?: null | number;
  deltaTop?: null | number;
  delta?: null | number;
  width?: null | number;
  height?: null | number;
};

export const Editor = () => {
  const [schemaSDL, setSchemaSDL] = useState<string>('');
  const [variablesSDL, setVariablesSDL] = useState<string>('{}');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const urlAPI = useAppSelector(getSearchBarInput);
  const [getGraphQlData, { data, error, isLoading }] = fetchGraphQlDataByAnyAPI();
  const { t } = useTranslation('common');
  const [motion, setMotion] = useState<motionState>({
    activeVertical: false,
    activeHorizontal: false,
    deltaLeft: null,
    deltaTop: null,
    delta: null,
    width: null,
    height: null,
  });

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

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      let params: Partial<motionState> = {};
      if (motion.activeVertical) {
        const { deltaLeft, delta } = motion;
        const { clientX } = e;
        params.width = clientX - (deltaLeft || 0) - (delta || 0);
      } else if (motion.activeHorizontal) {
        const { deltaTop, delta } = motion;
        const { clientY } = e;
        params.height = clientY - (deltaTop || 0) - (delta || 0);
      }
      setMotion((motion) => ({ ...motion, ...params }));
    },
    [motion]
  );
  const mouseUp = useCallback(() => {
    setMotion((motion) => ({
      ...motion,
      activeVertical: false,
      activeHorizontal: false,
    }));
  }, []);

  const mouseDown = useCallback((e: React.MouseEvent) => {
    const el = e.target as HTMLDivElement;
    const dataResize = el.dataset?.resize;
    const parent = el.closest(`[data-id=${dataResize}]`);
    const coords: DOMRect | undefined = parent?.getBoundingClientRect();
    let params: Partial<motionState> = {};

    if (dataResize === 'resize-vertical') {
      const { width, left } = coords ?? {};
      const delta: number = e.clientX - (width || 0) - (left || 0);
      params = { activeVertical: true, width, deltaLeft: left, delta };
    }
    if (dataResize === 'resize-horizontal') {
      const { height, top } = coords ?? {};
      const delta: number = e.clientY - (height || 0) - (top || 0);
      params = { activeHorizontal: true, height, deltaTop: top, delta };
    }
    setMotion((motion: motionState) => ({ ...motion, ...params }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [mouseDown, mouseUp, mouseMove]);

  return (
    <>
      <div className={cls.left} style={{ width: motion?.width + 'px' }} data-id="resize-vertical">
        <div
          className={cls.editorarea}
          data-id="resize-horizontal"
          style={{ height: motion?.height + 'px' }}
        >
          <div className={cls.editor}>
            <TextareaAutosize
              placeholder="Write GraphQl request here"
              value={schemaSDL}
              onChange={handleChange}
              className={cls.textareawrapper}
            />
          </div>
          <div className={cls.tools}>
            <div className={cls.icon}>
              <IconButton onClick={handleButtonClick}>
                <SendIcon fontSize="large" color="info" />
              </IconButton>
            </div>
          </div>
          <div
            data-resize="resize-horizontal"
            className={cls['resizer-horizontal']}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          ></div>
        </div>
        <div className={cls.settings}>
          <div className={cls.header}>
            <Button>{t('variables')}</Button>
            <Button>{t('headers')}</Button>
          </div>
          {true && (
            <TextareaAutosize
              minRows={20}
              cols={30}
              placeholder="Write GraphQl Variables here"
              value={variablesSDL}
              onChange={handleChangeVariables}
            />
          )}
        </div>
        <div
          data-resize="resize-vertical"
          className={cls['resizer-vertical']}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        ></div>
      </div>
      <div className={cls.right}>
        {errorMessage && <div>{errorMessage}</div>}
        {!errorMessage && isLoading && <CircularProgress />}
        {!errorMessage && !isLoading && data && (
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        {!errorMessage &&
          !isLoading &&
          error &&
          'data' in error &&
          error.status !== 'PARSING_ERROR' && (
            <div>
              <pre>{JSON.stringify(error.data, null, 2)}</pre>
            </div>
          )}
        {!errorMessage && !isLoading && error && 'message' in error && (
          <div>{JSON.stringify(error)}</div>
        )}
        {error && 'data' in error && error.status === 'PARSING_ERROR' && (
          <div>{t('parseingError')}</div>
        )}
      </div>
    </>
  );
};
