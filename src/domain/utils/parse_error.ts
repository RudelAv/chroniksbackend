import { NextFunction, Response } from "express";
import { array } from "zod";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // Add to all route through server/ts middleware
  next();
};

/**
 * @openapi
 * components:
 *   schemas:
 *     DefaultError:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         message:
 *           type: string
 */

export async function parseError(result: Object, res: Response) {
  switch (result) {
    case "P2000":
      /**
       * @swagger
       * components:
       *   responses:
       *     ContentTooLarge:
       *       description: Content Too Large
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       *
       */
      return res.status(413).json({
        code: "413",
        message: "Content Too Large",
      });
    case "P1000":
      /**
       * @swagger
       * components:
       *   responses:
       *     InvalidCredentials:
       *       description: Invalid credentials
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       *
       */
      return res.status(400).json({
        code: "400",
        message: "Invalid credentials", //dans le formulaire
      });
    case "P2002":
      /**
       * @swagger
       * components:
       *   responses:
       *     UsedEmail:
       *       description: Email already used by an account!
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(409).json({
        code: "409",
        message: "Email already used by an account!",
      });
    case "P2003":
      return res.status(403).json({
          code: "403",
          message: "Forbidden: You cannot modify this profile.",
        });
    case "P2013":
        return res.status(403).json({
          code: "403",
          message: "Forbidden: You cannot get this profile.",
        });
    case "P2004":
      /**
       * @swagger
       * components:
       *   responses:
       *     FailedDependency:
       *       description: Failed Dependency
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(424).json({
        code: "424",
        message: "Failed Dependency",
      });

    case "P2005":
      /**
       * @swagger
       * components:
       *   responses:
       *     Forbidden:
       *       description: Forbidden
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(403).json({
        code: "403",
        message: "Forbidden: You cannot update this post.",
      });
    case "P2006":
      /**
       * @swagger
       * components:
       *   responses:
       *     AlreadyLiked:
       *       description: Already Liked
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(403).json({
        code: "403",
        message: "Forbidden: You already liked this post.",
      });
    case "P2008":
      /**
       * @swagger
       * components:
       *   responses:
       *     AlreadySaved:
       *       description: Already Saved
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(403).json({
        code: "403",
        message: "Forbidden: You already saved this post.",
      });
    case "P2007":
      /**
       * @swagger
       * components:
       *   responses:
       *     UnprocessableContent:
       *       description: Unprocessable Content
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(422).json({
        code: "422",
        message: "Unprocessable Content",
      });

    case "P2007":
      /**
       * @swagger
       * components:
       *   responses:
       *     NotAcceptable:
       *       description: Not Acceptable
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(406).json({
        code: "406",
        message: "Not Acceptable",
      });
    case "P2001":
    case null:
    case "P2025":
      /**
       * @swagger
       * components:
       *   responses:
       *     NotFound:
       *       description: Not Found
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(404).json({
        code: "404",
        message: "Not Found",
      });
    case "P2020":
      /**
       * @swagger
       * components:
       *   responses:
       *     NotAcceptable:
       *       description: Not Acceptable
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      return res.status(406).json({
        code: "406",
        message: "Not Acceptable",
      });
    default:
      /**
       * @swagger
       * components:
       *   responses:
       *     NotContent:
       *       description: Not Content
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/DefaultError'
       */
      if (Array.isArray(result) && result.length == 0) {
        return res.status(204).json({
          code: "204",
          message: "Not Content",
        });
      }
      return res.status(res.statusCode).json(result);
  }
}

export function logError(msg:String) {
  console.log("\x1b[31m" + msg + "\x1b[0m");
}
