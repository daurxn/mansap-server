export const jwt_config = {
  secret: process.env.SECRET_KEY!,
  expired: process.env.EXPIRES_IN!,
};
