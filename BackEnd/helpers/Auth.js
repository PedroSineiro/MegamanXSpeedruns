
import jwt from 'jsonwebtoken';

export const respondWithToken = (user, res) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, isReviewer: user.isReviewer },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      isReviewer: user.isReviewer,
    },
  });
};
