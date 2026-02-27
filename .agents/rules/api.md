---
name: API & Data Flow
description: Rules for TanStack Query, Axios, and Server State management
---

# API & Data Logic

## Folder Structure (The "Service" Layer)
Every feature in `src/module/<feature>/api` must contain exactly these 4 sub-folders:
1.  `api/`: Pure Axios calls (e.g., `getProfile`, `updateSettings`).
2.  `types/`: TypeScript interfaces (Response, Payload, Params).
3.  `query/`: Hooks using `useQuery` (GET).
4.  `mutation/`: Hooks using `useMutation` (POST, PATCH, PUT, DELETE).

---

## The "Gold Standard" Patterns

### 1. Global Registry Rule
- **Single Source of Truth:** Never hardcode string keys in hooks.
- Use `QUERY_REGISTRY` and `MUTATION_REGISTRY` from `@/constants/apiRegistry`.
- **Query Keys:** Always use array-based keys: `queryKey: [QUERY_REGISTRY.getProfile, params]`.
- Use `QueryOptions` and `MutationOptions` from `/src/types/api.ts` for options type.

### 2. Query Hook Pattern
**Location:** `src/module/<feature>/api/query/use-get-<entity>.ts`.
```typescript
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";

import { ProfileResponse } from "./type";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetProfile = (
    options?: QueryOptions<ProfileResponse>,
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getProfile],
        queryFn: () => getProfile(),
        retry: false,
        ...options,
    });
};
```
- If api contains query parameter then add in the 1st arguments of the hook, and second would be for options

### 3. Mutation Hook Pattern
**Location:** `src/module/<feature>/api/mutatoin/use-<action>-<entity>.ts`.
```typescript
import { useMutation } from "@tanstack/react-query";
import { login} from "./api";

import { LoginPayload, LoginRespons } from "./type";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useLogin = (
    options?: MutationOptions<LoginResponse, LoginPayload>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.login],
        mutationFn: (payload) => login(payload),
        ...options,
    });
};
```

## Essential Rules for AI
1. **Strict Payload Rule:** Mutations in TanStack Query only take one argument. If you need to pass an ID and a body, wrap them in an object: `mutationFn: ({ id, data }) => api.patch(id, data)`.

2. **No Direct Axios:** Never use `api.get` inside a component. Components only talk to `useQuery` or `useMutation`.

3. **Void Types:** If an API has no response, use `void` (e.g., `MutationOptions<void, Payload>`).

4. **Error Handling:** Use the `onError` callback in options to trigger `toast.error()` (from `/src/hooks/useToast.ts`) globally which are not 401. 401 Error is handle by global query client.

5. **Success:** Use the `onSucess` callback in options to perform action if needed and trigger `toast.scuess()` to display message.

- If there is no response use `void` instead (e.g `options?: MutationOptions<LogoutResponse, void>`)
- If there is not payload still define type as null
- In the case of `DELETE` or `PATCH` API where there need for `:id` to make API call then add 1st argument for parameter and define api function like `(payload) => updateProduct({ payload, params })`

## References
- **TanStack v5 Docs:** https://tanstack.com/query/v5/docs/framework/react/overview
- **Axios Interceptor:** `@/lib/api/axios.ts`