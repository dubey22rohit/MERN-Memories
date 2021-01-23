import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../controller/secret.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustom = token.length < 500;
    let decodedData;
    if (token && isCustom) {
      decodedData = jwt.verify(token, JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
