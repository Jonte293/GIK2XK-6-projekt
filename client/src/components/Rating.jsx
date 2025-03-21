function Rating( rating) {
    return( <>
    <h4>Betyg: {rating.rating.score}</h4>
    <p>Rescension: {rating.rating.review}</p>
    <p>Skrivet den: {rating.rating.createdAt}</p>
    <p>Skrivet av: {rating.rating.user}</p>
    </>
    );
}
export default Rating;