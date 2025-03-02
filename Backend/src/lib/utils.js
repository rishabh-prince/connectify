import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try{
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwttoken", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  })
 return token;
}catch (error) {
  console.error("Error generating token:", error);
  }
};
