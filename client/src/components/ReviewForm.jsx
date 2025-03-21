import { Button } from "@mui/material";
import StarRating from "../components/StarRating";

function ReviewForm() {

    
    return ( <form>
<StarRating></StarRating>
<textarea rows="5"></textarea>
<Button>Skicka kommentar</Button>
    </form> );
}

export default ReviewForm;





