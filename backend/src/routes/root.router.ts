import { Router } from 'express';
import { envs } from '$envs';

export enum Service {
  LOCAL = 'local',
  BACKGROUND = 'background',
  MAIN = 'main',
};

export type RouterRegistration = {
  service: Service;
  path: string;
  router: Router;
};

export type RegisterRouterParams = {
  service: Service;
  path: string;
  router: Router;
};

class RootRouter {
  private static instance: RootRouter;
  private rootRouter: Router;
  private registration: Map<string, RouterRegistration> = new Map();

  private constructor() {
    this.rootRouter = Router();
  }

  public static getInstance(): RootRouter {
    if (!RootRouter.instance) {
      RootRouter.instance = new RootRouter();
    }
    return RootRouter.instance;
  }

  private registerRouter(params: RegisterRouterParams): void {
    const service = envs.service === 'local'
      ? Service.LOCAL
      : params.service;
    const shouldRegister = envs.service === service;
    if (!shouldRegister) return;

    this.registration.set(params.path, {
      service: params.service,
      path: params.path,
      router: params.router,
    });
    this.rootRouter.use(params.path, params.router);
    console.log(`🔧 Registered router for ${params.service} at ${params.path}`);
  }

  public registerMainRouter(params: Omit<RegisterRouterParams, 'service'>): void {
    this.registerRouter({
      service: Service.MAIN,
      path: params.path,
      router: params.router,
    });
  }

  public registerBackgroundRouter(params: Omit<RegisterRouterParams, 'service'>): void {
    this.registerRouter({
      service: Service.BACKGROUND,
      path: params.path,
      router: params.router,
    });
  }

  public getRouter(): Router {
    return this.rootRouter;
  }
}

export default RootRouter;