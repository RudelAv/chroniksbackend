import { NextFunction, Request, Response } from "express";
import { JWToken } from "../jwt/jwt";
import { verifyBanToken } from "../utils/verifyBanToken";

/**
 * @openapi
 * components:
 *   responses:
 *     Unauthorized:
 *      description: you haven't authorization to access this ressource
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DefaultError'
 *     UserLogout:
 *      description: you are log out
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DefaultError'
 *     BadAccessToken:
 *      description: your access token is no longer valid. please authenticate again
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DefaultError'
 *
 */
export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const jwt = require("jsonwebtoken");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      code: "401",
      message: "Unauthorized",
    });
  }
  const banToken = await verifyBanToken(token, "accessToken");
  if (banToken) {
    return res.status(400).json({
      code: "400",
      message: "User logout",
    });
  }

  const verify = new JWToken().verifyAccessToken(token, jwt);

  if (verify == "error") {
    return res.status(400).json({
      code: "400",
      message: "Bad Access Token",
    });
  } else {
    req.body.token = token;
    req.body.userConnect = verify;
    next();
  }
}
