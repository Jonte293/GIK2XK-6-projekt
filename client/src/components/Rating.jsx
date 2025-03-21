function Rating( rating) {
    return( <><h4>{rating.score}</h4>
    <p>{rating.review}</p>
    <p>Skrivet den: {rating.createdAt}</p>
    <p>Skrivet av: {rating.user}</p>
    </>
    );
}
export default Rating;