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
   *     summary: Refresh token
   *     description: Refresh token 
   *     tags: ["Token"]
   *     headers:
   *       - Authorization:
   *         type: string
   *         description: The token to refresh
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token refreshed successfully 
   *       401:

   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  router.post("/refresh", logger, async (req: Request, res: Response) => {
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
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
      let data = {
        id: user_result?._id,
        name: user_result?.name,
        email: user_result?.email,
        provider: user_result?.provider,
        image: user_result?.image,
        bio: user_result?.bio,
      };

      const resultat = {
        accessToken: new JWToken().generateAccessToken(data, jwt),
        refreshToken: new JWToken().generateRefreshToken(data, jwt),
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
