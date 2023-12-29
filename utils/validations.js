export function calculateReviews(reviews) {
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

export function validateUser(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
