# Redux API Implementation Prompt

> **IMPORTANT NOTE:** After completing this prompt, read [[AFTER]] -> obsidian/docs/base/AFTER.md.

## Context

You are working with a NestJS backend and React frontend that uses Redux Toolkit Query (RTK Query) for state management. The system generates TypeScript API clients from Swagger/OpenAPI specifications.

## Task

When the user says "I added an API" or "I added new endpoints", automatically follow these steps:

### Automatic Workflow

1. **API Generation**

   ```bash
   yarn generate
   ```

2. **Check Changes with Git**

   ```bash
   git diff web/api/services/
   git diff web/api/models/
   ```

3. **Detect New or Modified Services**
   - Which services were added?
   - Which services have new functions?
   - Which new types/models were added?

4. **Perform Automatic Redux Implementation**

### 1. For New API Services

If a new API service was created (e.g., `ProductsService`):

1. **Create RTK Query Slice** - `web/state/api/[serviceName].ts`:

   ```typescript
   import { createApi } from '@reduxjs/toolkit/query/react';
   import { [ServiceName]Service, [ResponseTypes], [RequestTypes] } from '@/api';
   
   export const [serviceName]Api = createApi({
       reducerPath: '[serviceName]Api',
       baseQuery: async ({ queryFn }) => {
           try {
               const data = await queryFn();
               return { data };
           } catch (error) {
               return { error };
           }
       },
       endpoints: (builder) => ({
           // Add endpoints here
       }),
   });
   
   export const { 
       // Export generated hooks here
   } = [serviceName]Api;
   ```

2. **Update Reducer** - `web/state/reducer.ts`:
   - Import the new API: `import { [serviceName]Api } from './api/[serviceName]';`
   - Add to rootReducer: `[serviceName]Api.reducerPath: [serviceName]Api.reducer,`

3. **Update Store** - `web/state/store.ts`:
   - Add to middleware array: `[serviceName]Api.middleware`

### 2. For New Functions in Existing Services

If new functions were added to an existing service:

1. **Update RTK Query slice** - add new endpoints
2. **Export new hooks**
3. **No reducer/store changes needed**

## Example Implementation

Given: "I added getProducts and createProduct functions to ProductsController"

You would:

1. Create `web/state/api/products.ts`:

```typescript
import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductsService, ProductDto, CreateProductDto } from '@/api';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: async ({ queryFn }) => {
        try {
            const data = await queryFn();
            return { data };
        } catch (error) {
            return { error };
        }
    },
    endpoints: (builder) => ({
        getProducts: builder.query({
            queryFn: async function getProducts() {
                try {
                    return {
                        data: await ProductsService.productsControllerGetProducts()
                    }
                } catch (error: any) {
                    return { error }
                }
            }
        }),
        createProduct: builder.mutation({
            queryFn: async function createProduct(productDto: CreateProductDto) {
                try {
                    return {
                        data: await ProductsService.productsControllerCreateProduct(productDto)
                    }
                } catch (error: any) {
                    return { error }
                }
            }
        })
    }),
});

export const { 
    useGetProductsQuery,
    useCreateProductMutation 
} = productsApi;
```

2. Update `web/state/reducer.ts`:

```typescript
// Add import
import { productsApi } from './api/products';

// Add to rootReducer
const rootReducer = {
    // ... existing reducers
    [productsApi.reducerPath]: productsApi.reducer,
};
```

3. Update `web/state/store.ts`:

```typescript
// Create middleware variable
const productsMiddleware = productsApi.middleware;

// Add to middleware concat
.concat(
    ...[authMiddleware, logsMiddleware, productsMiddleware]
)
```

## Important Notes

- Always check if the generated API service exists in `web/api/services/`
- Use the exact naming convention from generated services
- Use `builder.query` for GET requests
- Use `builder.mutation` for POST/PUT/DELETE requests
- Always wrap service calls in try-catch blocks
- Export all generated hooks using the pattern: `use[FunctionName]Query` or `use[FunctionName]Mutation`

## Usage

User can simply say:

- "I added an API"
- "I added new endpoints"
- "I added new functions to backend"

You will automatically:

1. Run `yarn generate`
2. Check what changed with git diff
3. Find new services or functions
4. Perform necessary Redux implementations
5. Update imports/exports

## Example Scenario

**User:** "I added a new products API to backend"

**You will:**

```bash
# 1. Generate APIs
yarn generate

# 2. Check changes
git diff web/api/services/
git diff web/api/models/

# 3. Detect that ProductsService was added
# 4. Automatically create web/state/api/products.ts
# 5. Update reducer.ts and store.ts
```
