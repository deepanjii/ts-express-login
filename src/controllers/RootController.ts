import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.loggedIn) {
    next();
    return;
  } else {
    res.status(403);
    res.send('Forbidden route');
  }
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <h1>You are logged in</h1>
          <a href="/auth/logout">logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <h1>You need to login</h1>
          <a href="/auth/login">login</a>
        </div>
      `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to the protected router, user');
  }
}