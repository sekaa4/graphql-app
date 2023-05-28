import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress, IconButton, TextareaAutosize } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getSearchBarInput } from '@/features/SearchBar';
import { fetchSchemaByAPI } from '@/features/SideBar/api/shemaByAnyAPI';
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
  const [variablesSDL, setVariablesSDL] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const urlAPI = useAppSelector(getSearchBarInput);
  const [getGraphQlData, { data, error, isLoading }] = fetchGraphQlDataByAnyAPI();
  const [, { data: currentSchema, isError: isErrorSchema }] = fetchSchemaByAPI({
    fixedCacheKey: 'schemaByAPI',
  });
  const [isOpen, setStatusOpen] = useState<boolean>(false);
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
  const [isMove, setIsMove] = useState<boolean>(false);

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
        variables: (urlAPI && schemaSDL && variablesSDL && JSON.parse(variablesSDL)) || '',
      };

      getGraphQlData(requestObj);
      setErrorMessage(``);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Variables are invalid JSON: ${error.message}`);
      }
    }
  };

  const mouseUp = useCallback(() => {
    setIsMove(false);
    setMotion((motion) => ({
      ...motion,
      activeVertical: false,
      activeHorizontal: false,
    }));
  }, []);

  const calculateWidth = (e: React.MouseEvent, width: number = 0) => {
    const target = e.target as HTMLDivElement;
    const elem = target.closest('[data-id="resizer-container"]');
    return elem?.clientWidth && (100 * width) / elem?.clientWidth;
  };

  const mouseDown = useCallback((e: React.MouseEvent) => {
    setIsMove(true);
    const el = e.target as HTMLDivElement;
    const dataResize = el.dataset?.resize;
    const parent = el.closest(`[data-id=${dataResize}]`);
    const coords: DOMRect | undefined = parent?.getBoundingClientRect();
    let params: Partial<motionState> = {};

    if (dataResize === 'resize-vertical') {
      const { width, left } = coords ?? {};
      const delta: number = e.clientX - (width || 0) - (left || 0);
      params = { activeVertical: true, deltaLeft: left, delta };
      params.width = calculateWidth(e, width);
    }
    if (dataResize === 'resize-horizontal') {
      const { height, top } = coords ?? {};
      const delta: number = e.clientY - (height || 0) - (top || 0);
      params = { activeHorizontal: true, height, deltaTop: top, delta };
    }
    setMotion((motion: motionState) => ({ ...motion, ...params }));
  }, []);

  const move = (e: React.MouseEvent) => {
    if (isMove && e.buttons === 1) {
      let params: Partial<motionState> = {};
      if (motion.activeVertical) {
        const { deltaLeft, delta } = motion;
        const { clientX } = e;
        const widthPx = clientX - (deltaLeft || 0) - (delta || 0);
        const widthPercent = calculateWidth(e, widthPx);
        if (widthPercent) {
          params.width = widthPercent < 30 ? 30 : widthPercent;
        }
      } else if (motion.activeHorizontal) {
        const { deltaTop, delta } = motion;
        const { clientY } = e;
        params.height = clientY - (deltaTop || 0) - (delta || 0);
      }
      setMotion((motion) => ({ ...motion, ...params }));
    }
  };

  useEffect(() => {
    if (error && 'data' in error && error.status === 'PARSING_ERROR') {
      toast.error(t('parseingError'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [error, t]);

  useEffect(() => {
    setErrorMessage('');
  }, [urlAPI]);

  return (
    <div className={cls['resizer-container']} onMouseMove={move} data-id="resizer-container">
      <div className={cls.left} style={{ width: motion?.width + '%' }} data-id="resize-vertical">
        <div
          className={cls.editorarea}
          data-id="resize-horizontal"
          style={{ height: motion?.height + 'px' }}
        >
          <div className={cls.editor}>
            <TextareaAutosize
              placeholder={t('editorPlaceholder')}
              value={schemaSDL}
              onChange={handleChange}
              minRows={20}
              className={cls.textareawrapper}
            />
          </div>
          <div className={cls.tools}>
            <div className={cls.icon}>
              <IconButton onClick={handleButtonClick} disabled={isErrorSchema || !currentSchema}>
                <SendIcon
                  fontSize="large"
                  color={isErrorSchema || !currentSchema ? 'disabled' : 'success'}
                />
              </IconButton>
            </div>
          </div>
        </div>
        <div data-resize="resize-horizontal" className={cls['resizer-horizontal']}></div>
        <div className={cls.settings}>
          <div className={cls.header}>
            <Button
              onClick={() => {
                setStatusOpen(!isOpen);
              }}
            >
              {t('variables')}
            </Button>
          </div>
          {isOpen && (
            <TextareaAutosize
              minRows={6}
              placeholder={t('variablesPlaceholder')}
              value={variablesSDL}
              onChange={handleChangeVariables}
              className={cls.textareawrapper}
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
        <>
          {errorMessage && <div>{errorMessage}</div>}
          {!errorMessage && isLoading && <CircularProgress className={cls['circular-progress']} />}
          {!errorMessage && !isLoading && data && (
            <div>
              <div>{JSON.stringify(data, null, 2)}</div>
            </div>
          )}
          {!errorMessage &&
            !isLoading &&
            error &&
            'data' in error &&
            error.status !== 'PARSING_ERROR' &&
            error.data && (
              <div>
                <div>{JSON.stringify(error.data, null, 2)}</div>
              </div>
            )}
          {!errorMessage && !isLoading && error && 'message' in error && (
            <div>{JSON.stringify(error)}</div>
          )}
        </>
      </div>
    </div>
  );
};
