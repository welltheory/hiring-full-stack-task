import { Duration } from '@temporalio/common';

export type WorkflowStartDefinitionOptions = {
  memo?: Record<string, any>;
  startDelay?: Duration;
  workflowId?: string;
  workflowIdPrefix?: string;
};

export type WorkflowStartParams<T = any> = {
  data: T;
  options?: WorkflowStartDefinitionOptions;
};

export type WorkflowExecuteParams<T = any> = {
  data: T;
  options?: WorkflowStartDefinitionOptions;
};

export type WorkflowStartPayload<T = any> = {
  handle: string;
};

export interface IWorkflowSyncDefinition<
  T extends WorkflowExecuteParams,
  P = any
> {
  provideWorkflowId?: (params: T) => string | Promise<string>;
  execute: (params: T) => Promise<P>;
}

export interface IWorkflowAsyncDefinition<
  T extends WorkflowExecuteParams,
  P = any
> {
  provideWorkflowId?: (params: T) => string | Promise<string>;
  start: (params: T) => Promise<WorkflowStartPayload<P>>;
}