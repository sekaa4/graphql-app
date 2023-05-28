/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getCoreStaticSideProps } from '@/shared/lib/ssr';

import cls from './404.module.css';

const NoteFoundPage = () => {
  const { t } = useTranslation(['error']);
  const errorMessage = t('error');
  const backWelcome = t('backWelcome');
  const { replace, push, route } = useRouter();

  const handleClick = () => {
    push('/');
  };

  useEffect(() => {
    replace(route, '/404');
  }, [route]);

  return (
    <Box className={cls.main}>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Grid container className={cls.container}>
          <Grid item sx={{ gap: '10px', p: 0 }}>
            <Typography variant="h2" sx={{ textAlign: 'center', fontSize: '6rem' }}>
              404
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', pb: 2 }}>
              {errorMessage}
            </Typography>
            <Button variant="contained" sx={{ m: '0 auto', display: 'flex' }} onClick={handleClick}>
              {backWelcome}
            </Button>
          </Grid>
          <Grid>
            <Image
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt="error image"
              width={500}
              height={250}
              priority
              className={cls.image}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const getStaticProps = getCoreStaticSideProps(['common', 'error']);

export default NoteFoundPage;
