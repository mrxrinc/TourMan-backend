export default function getUserReviewsData(reviews) {
  if (reviews.length === 0)
    return {
      reviewsCount: 0,
      overallRate: 0,
    };
  const rateArray = [];
  let reviewsCount = 0;
  for (const item in reviews) {
    rateArray.push(reviews[item].rate);
    reviewsCount++;
  }
  const ratingSum = rateArray.reduce((total, val) => total + val);
  const overallRate = ratingSum / rateArray.length;
  return {
    reviewsCount,
    overallRate,
  };
}
