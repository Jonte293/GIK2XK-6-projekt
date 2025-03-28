import { Button, Rating, TextField } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState } from 'react';

function RatingForm({ onSave }) {
  const emptyRating = {
    review: '',
    score: null,
    productId: 1,
    userId: 4,
  };
  const [rating, setRating] = useState(emptyRating);

  return (
    <form>
      <div>
        <TextField
          value={rating.review}
          onChange={(e) => setRating({ ...rating, review: e.target.value })}
          sx={{ mt: 1, mb: 1 }}
          label='Skriv din recension'
          name='review'
          fullWidth
          multiline
          rows={3}
        />
      </div>
      <div>
        <Rating
          value={rating.score}
          onChange={(e) => setRating({ ...rating, score: e.target.value })}
        />
      </div>
      <Button
        startIcon={<EditNoteIcon />}
        variant='contained'
        onClick={() => {
          onSave(rating);
          setRating(emptyRating); 
        }}
      >
        Publicera recension
      </Button>
    </form>
  );
}

export default RatingForm;

