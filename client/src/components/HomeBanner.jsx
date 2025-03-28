import { Box, Button, Typography } from '@mui/material';

/* En banner-komponent till hemsidan som använder Box- och Typography-komponenter från mui */
export default function HomeBanner({ title, image, text, text2}) {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(180deg, rgb(231, 71, 60), rgba(228, 228, 228, 0.7))',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        height: 600,
        padding: 0,
        margin: 0,
        flexGrow: 1,
        color: 'rgb(255, 255, 255)',
        textShadow: '2px 2px 3px black',
      }}
    >
      <Box
        component='span'
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          fontWeight: 'bold',
          display: 'inline-block',
        }}
      >
        <Typography
          variant='h2'
          sx={{
            m: 4,
            fontSize: 50,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            ml: 5,
            borderRadius: 2,
            backgroundColor: 'rgb(231, 71, 60)',
            width: 256,
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: 30, m: 4 }}>
            {text}
          </Typography>
        </Box>

        <Typography sx={{ fontWeight: 'bold', fontSize: 30, m: 4 }}>
          {text2}
        </Typography>
      </Box>
      <Box
        component='img'
        src={image}
        alt='Erbjudande'
        sx={{ height: '100%' }}
      />
    </Box>
  );
}
