export default function calculateReviews(reviews) {
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
