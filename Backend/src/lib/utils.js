import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try{
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwttoken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
  })
 return token;
}catch (error) {
  console.error("Error generating token:", error);
  }
};
