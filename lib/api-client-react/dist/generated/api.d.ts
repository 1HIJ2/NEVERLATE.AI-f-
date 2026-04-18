import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Assignment, AssignmentInput, AssignmentSummary, DailyPlan, ErrorResponse, HealthStatus } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List assignments
 */
export declare const getListAssignmentsUrl: () => string;
export declare const listAssignments: (options?: RequestInit) => Promise<Assignment[]>;
export declare const getListAssignmentsQueryKey: () => readonly ["/api/assignments"];
export declare const getListAssignmentsQueryOptions: <TData = Awaited<ReturnType<typeof listAssignments>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAssignments>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAssignments>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAssignmentsQueryResult = NonNullable<Awaited<ReturnType<typeof listAssignments>>>;
export type ListAssignmentsQueryError = ErrorType<unknown>;
/**
 * @summary List assignments
 */
export declare function useListAssignments<TData = Awaited<ReturnType<typeof listAssignments>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAssignments>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create assignment
 */
export declare const getCreateAssignmentUrl: () => string;
export declare const createAssignment: (assignmentInput: AssignmentInput, options?: RequestInit) => Promise<Assignment>;
export declare const getCreateAssignmentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAssignment>>, TError, {
        data: BodyType<AssignmentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAssignment>>, TError, {
    data: BodyType<AssignmentInput>;
}, TContext>;
export type CreateAssignmentMutationResult = NonNullable<Awaited<ReturnType<typeof createAssignment>>>;
export type CreateAssignmentMutationBody = BodyType<AssignmentInput>;
export type CreateAssignmentMutationError = ErrorType<unknown>;
/**
 * @summary Create assignment
 */
export declare const useCreateAssignment: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAssignment>>, TError, {
        data: BodyType<AssignmentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAssignment>>, TError, {
    data: BodyType<AssignmentInput>;
}, TContext>;
/**
 * @summary Update assignment
 */
export declare const getUpdateAssignmentUrl: (id: number) => string;
export declare const updateAssignment: (id: number, assignmentInput: AssignmentInput, options?: RequestInit) => Promise<Assignment>;
export declare const getUpdateAssignmentMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAssignment>>, TError, {
        id: number;
        data: BodyType<AssignmentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateAssignment>>, TError, {
    id: number;
    data: BodyType<AssignmentInput>;
}, TContext>;
export type UpdateAssignmentMutationResult = NonNullable<Awaited<ReturnType<typeof updateAssignment>>>;
export type UpdateAssignmentMutationBody = BodyType<AssignmentInput>;
export type UpdateAssignmentMutationError = ErrorType<ErrorResponse>;
/**
 * @summary Update assignment
 */
export declare const useUpdateAssignment: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAssignment>>, TError, {
        id: number;
        data: BodyType<AssignmentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateAssignment>>, TError, {
    id: number;
    data: BodyType<AssignmentInput>;
}, TContext>;
/**
 * @summary Delete assignment
 */
export declare const getDeleteAssignmentUrl: (id: number) => string;
export declare const deleteAssignment: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteAssignmentMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAssignment>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAssignment>>, TError, {
    id: number;
}, TContext>;
export type DeleteAssignmentMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAssignment>>>;
export type DeleteAssignmentMutationError = ErrorType<ErrorResponse>;
/**
 * @summary Delete assignment
 */
export declare const useDeleteAssignment: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAssignment>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAssignment>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get assignment dashboard summary
 */
export declare const getGetAssignmentSummaryUrl: () => string;
export declare const getAssignmentSummary: (options?: RequestInit) => Promise<AssignmentSummary>;
export declare const getGetAssignmentSummaryQueryKey: () => readonly ["/api/assignments/summary"];
export declare const getGetAssignmentSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getAssignmentSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAssignmentSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAssignmentSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAssignmentSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getAssignmentSummary>>>;
export type GetAssignmentSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get assignment dashboard summary
 */
export declare function useGetAssignmentSummary<TData = Awaited<ReturnType<typeof getAssignmentSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAssignmentSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get today's study recommendations
 */
export declare const getGetDailyRecommendationsUrl: () => string;
export declare const getDailyRecommendations: (options?: RequestInit) => Promise<DailyPlan>;
export declare const getGetDailyRecommendationsQueryKey: () => readonly ["/api/assignments/recommendations/today"];
export declare const getGetDailyRecommendationsQueryOptions: <TData = Awaited<ReturnType<typeof getDailyRecommendations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDailyRecommendations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDailyRecommendations>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDailyRecommendationsQueryResult = NonNullable<Awaited<ReturnType<typeof getDailyRecommendations>>>;
export type GetDailyRecommendationsQueryError = ErrorType<unknown>;
/**
 * @summary Get today's study recommendations
 */
export declare function useGetDailyRecommendations<TData = Awaited<ReturnType<typeof getDailyRecommendations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDailyRecommendations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map