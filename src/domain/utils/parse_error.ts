import { Response } from 'express'
import { array } from 'zod';

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

/**
 * @swagger
 * components:
 *   responses:
 *     PassExamError:
 *       summary: TimeExamError
 *       description: TimeExamError or ChatGptError
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DefaultError'
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
        case "UnauthorizedError":
                /**
                 * @swagger
                 * components:
                 *   responses:
                 *     UnauthorizedError:
                 *       summary: UnauthorizedError
                 *       description: Not sufficient right to do this action
                 *       content:
                 *         application/json:
                 *           schema:
                 *             $ref: '#/components/schemas/DefaultError'
                 */
                return res.status(401).json({
                    code: "401",
                    message: "Not sufficient right to do this action",
                });
       

        case "ValidationError":
            /**
             * @swagger
             * components:
             *   responses:
             *     SyntaxError:
             *       summary: ValidationError
             *       description: Invalid credentials
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/DefaultError'
             */
            return res.status(400).json({
                code: "400",
                message: "Invalid credentials",
            });
        case "P1000":
        case "CastError":
        case "BSONError":
            /**
             * @swagger
             * components:
             *   responses:
             *     BSONError:
             *       summary: BSONError
             *       description: Invalid credentials
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/DefaultError'
             */
            return res.status(400).json({
                code: "400",
                message: "Invalid credentials",
            });
        case "MongoServerError":
            /**
             * @swagger
             * components:
             *   responses:
             *     MongoServerError:
             *       summary: MongoServerError
             *       description: ID already used !
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/DefaultError'
             */
            return res.status(409).json({
                code: "409",
                message: "ID already used !",
            });
        case "P2002":
            /**
             * @swagger
             * components:
             *   responses:
             *     UsedEmail:
             *       summary: UsedEmail
             *       description: Email already used by an account
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
        case "P2004":
        case "ValidationError":
             /**
             * @swagger
             * components:
             *   responses:
             *     ValidationError:
             *       summary: ValidationError
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
        case "P2006":
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
        case "SessionDescriptionError":
            /**
             * @swagger
             * components:
             *   responses:
             *     SessionDescriptionError:
             *       description: "Not Acceptable : Session description not acceptable"
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/DefaultError'
             */
            return res.status(406).json({
                code: "406",
                message: "Not Acceptable : Session description not acceptable",
            });
        case "UnknowEvent":
            return res.status(404).json({
                code: "404",
                message: "Even not found"
            });
        case "UnHotorize":
            return res.status(401).json({
                code: '401',
                message: "Acces Denied"
            })
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
