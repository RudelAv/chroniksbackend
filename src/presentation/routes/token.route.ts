import express from "express";
import { Request, Response } from "express";
import { JWToken } from "../../domain/jwt/jwt";
import { verifyBanToken } from "../../domain/utils/verifyBanToken";
import { logger } from "../../domain/utils/parse_error";
import { BanTokensModel } from "../../../mongoose/models/BanTokens";
import { UserModel } from "../../../mongoose/models/User";
import { exclude } from "../../domain/utils/excludeColumn";

export default function TokenRouter() {
  const router = express.Router();

  /**
   * @swagger
   * /api/v1/token/refresh:
   *   post:
   *     tags: ["Token"]
   *     summary: Get a set usernames
   *     description: "Generate & Recommend usernames for user based on his name"
   *     responses:
   *       "200":
   *          description: OK
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  code:
   *                    type: string
   *                  message:
   *                    $ref: '#/components/schemas/AuthenticateTokens'
   *       "404":
   *         $ref: '#/components/responses/NotFound'
   *       "401":
   *         $ref: '#/components/responses/Unauthorized'
   *       "400":
   *         $ref: '#/components/responses/UserLogout'
   */
  router.post("/refresh", logger, async (req: Request, res: Response) => {
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({
        code: "401",
        message: "Unauthorized",
      });
    }
    const banToken = await verifyBanToken(token, "refreshToken");
    if (banToken) {
      return res.status(400).json({
        code: "400",
        message: "User logout",
      });
    }

    const verify = new JWToken().verifyRefreshToken(token, jwt);
    console.log(verify);
    if (verify == "error") {
      return res.status(400).json({
        code: "400",
        message: "Bad Token",
      });
    } else {
      const user_result = await UserModel.findById(verify.id);
      console.log("user_result", user_result);
      const user_result_data = exclude(user_result, ['password', 'createdAt', 'updatedAt', 'savedPosts']);

      const resultat = {
        accessToken: new JWToken().generateAccessToken(user_result_data, jwt),
        refreshToken: new JWToken().generateRefreshToken(user_result_data, jwt),
      };
      console.log("resultat", resultat);
      return res.status(200).json({
        code: "200",
        message: resultat,
      });

    }
  });

  return router;
}
