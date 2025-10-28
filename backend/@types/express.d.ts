declare global {
  namespace Express {
    interface User {
      id: string;
    }

    export interface Request {
      /**
       * Authenticated user object
       *
       * Populated by the authentication middleware when X-Auth-User-Id header is present.
       * Contains only the user ID - fetch full user data if needed.
       *
       * @example
       * const userId = req.user.id;
       */
      user?: User;
    }

    export interface AuthenticatedRequest extends Request {
      user: User;
    }
  }
}

export {};