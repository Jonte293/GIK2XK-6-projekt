import { Box, Typography } from '@mui/material';

export default function HomeBanner({ title, image, text }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        height: 600,
        mb:3,
/*         backgroundColor: 'rgb(231, 71, 60)',  */
        color: 'white', 
        textShadow: '1px 1px 4px black',
      }}
    >
      <Typography sx={{
        m: 4,
       fontWeight:"bold", 
       fontSize: 50,
    }}>
        {title}
      </Typography>

      <Typography sx={{
        m: 4,
       fontWeight:"bold", 
       fontSize: 50,
    }}>
        {text}
      </Typography>
      <Box component="img" src={image} alt="Erbjudande" sx={{ height: '100%' }} />
    </Box>
  );
}