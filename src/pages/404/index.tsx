import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getCoreStaticSideProps } from '@/shared/lib/ssr';

import cls from './404.module.css';

const NoteFoundPage = () => {
  const { t } = useTranslation(['error']);
  const errorMessage = t('error');
  const backWelcome = t('backWelcome');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              404
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {errorMessage}
            </Typography>
            <Button variant="contained" sx={{ m: '0 auto', display: 'flex' }}>
              {backWelcome}
            </Button>
          </Grid>
          <Grid xs={6}>
            <Image
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const getStaticProps = getCoreStaticSideProps(['common', 'error']);

export default NoteFoundPage;
