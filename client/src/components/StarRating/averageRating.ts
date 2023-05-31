import { IRating } from "../../store/RatingStore"

export const averageRating = (ratings: IRating[]): number => {
    const ratingScores = ratings.map(item => item.rating)
    const ratingSum = ratingScores.reduce((a, b) => a + b, 0);
    return ratingSum / ratings.length
}