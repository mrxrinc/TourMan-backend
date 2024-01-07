export default function getUserReviewsData(reviews) {
  if (reviews.length === 0) {
    return {
      reviewsCount: 0,
      overallRate: 0,
    };
  }

  const reviewsCount = reviews.length;
  const ratingSum = reviews.reduce((total, review) => total + review.rate, 0);
  const overallRate = ratingSum / reviewsCount;

  return {
    reviewsCount,
    overallRate,
  };
}

export const uniqueSuffix =
  Date.now() +
  '-' +
  Math.round(Math.random() * 1e9)
    .toString(36)
    .substring(2);
