import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, process.env.JWR_REFRESH_SECRET!, {
    expiresIn: "7d"
  });
};
