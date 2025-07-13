import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Job = {
  __typename?: 'Job';
  completedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: JobStatus;
  submittedAt: Scalars['String']['output'];
};

export enum JobStatus {
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Queued = 'QUEUED',
  Succeeded = 'SUCCEEDED'
}

export type Mutation = {
  __typename?: 'Mutation';
  uploadImage: Job;
};


export type MutationUploadImageArgs = {
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  job: Job;
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  jobStatus: JobStatus;
};


export type SubscriptionJobStatusArgs = {
  id: Scalars['ID']['input'];
};

export type UploadImageMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'Job', id: string, name: string, status: JobStatus, submittedAt: string, completedAt?: string | null } };

export type JobQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type JobQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, name: string, status: JobStatus, submittedAt: string, completedAt?: string | null } };

export type JobStatusSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type JobStatusSubscription = { __typename?: 'Subscription', jobStatus: JobStatus };


export const UploadImageDocument = gql`
    mutation uploadImage($name: String!) {
  uploadImage(name: $name) {
    id
    name
    status
    submittedAt
    completedAt
  }
}
    `;
export const JobDocument = gql`
    query job($id: ID!) {
  job(id: $id) {
    id
    name
    status
    submittedAt
    completedAt
  }
}
    `;
export const JobStatusDocument = gql`
    subscription jobStatus($id: ID!) {
  jobStatus(id: $id)
}
    `;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    uploadImage(variables: UploadImageMutationVariables, options?: C): Promise<UploadImageMutation> {
      return requester<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, variables, options) as Promise<UploadImageMutation>;
    },
    job(variables: JobQueryVariables, options?: C): Promise<JobQuery> {
      return requester<JobQuery, JobQueryVariables>(JobDocument, variables, options) as Promise<JobQuery>;
    },
    jobStatus(variables: JobStatusSubscriptionVariables, options?: C): AsyncIterable<JobStatusSubscription> {
      return requester<JobStatusSubscription, JobStatusSubscriptionVariables>(JobStatusDocument, variables, options) as AsyncIterable<JobStatusSubscription>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;

// This additional logic appended by playwright-graphql cli to ensure seamless integration
import { getSdkRequester } from 'playwright-graphql';

export type APIRequestContext = Parameters<typeof getSdkRequester>[0];
export type RequesterOptions = Parameters<typeof getSdkRequester>[1] | string;
export type RequestHandler = Parameters<typeof getSdkRequester>[2];

export const getClient = (apiContext: APIRequestContext, options?: RequesterOptions, requestHandler?: RequestHandler) => getSdk(getSdkRequester(apiContext, options, requestHandler));

export type GqlAPI = ReturnType<typeof getClient>;

