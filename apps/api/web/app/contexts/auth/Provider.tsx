// Import Dependencies
import { useEffect, useReducer, ReactNode } from "react";

// Local Imports
import { setSession } from "@/utils/jwt";
import { AuthProvider as AuthContext, AuthContextType } from "./context";
import { useLoginMutation } from "@/state/api/auth";
// ----------------------------------------------------------------------

interface AuthAction {
  type:
  | "INITIALIZE"
  | "LOGIN_REQUEST"
  | "LOGIN_SUCCESS"
  | "LOGIN_ERROR"
  | "LOGOUT";
  payload?: Partial<AuthContextType>;
}

// Initial state
const initialState: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
  login: async () => { },
  logout: async () => { },
};

// Reducer handlers
const reducerHandlers: Record<
  AuthAction["type"],
  (state: AuthContextType, action: AuthAction) => AuthContextType
> = {
  INITIALIZE: (state, action) => ({
    ...state,
    isAuthenticated: action.payload?.isAuthenticated ?? false,
    isInitialized: true,
    user: action.payload?.user ?? null,
  }),

  LOGIN_REQUEST: (state) => ({
    ...state,
    isLoading: true,
  }),

  LOGIN_SUCCESS: (state, action) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    user: action.payload?.user ?? null,
  }),

  LOGIN_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload?.errorMessage ?? "An error occurred",
    isLoading: false,
  }),

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

// Reducer function
const reducer = (
  state: AuthContextType,
  action: AuthAction,
): AuthContextType => {
  const handler = reducerHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loginMutation] = useLoginMutation()
  useEffect(() => {
    const init = async () => {
      try {
        const authToken = window.localStorage.getItem("authToken");

        if (authToken) {
          setSession(authToken);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
          },
        });
      }
    };

    init();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const { data: response, error } = await loginMutation({
        email: credentials.username,
        password: credentials.password
      })

      if (error && !response) {
        throw new Error("Connection Error!");
      }

      if (!response?.success) {
        throw new Error(`${response?.error?.name}: ${response?.error?.message}`);
      }

      const { access_token } = response.data

      if (
        typeof access_token !== "string"
      ) {
        throw new Error("Response is not valid");
      }

      setSession(access_token);

      dispatch({
        type: "LOGIN_SUCCESS",
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          errorMessage: err instanceof Error ? err.message : "Login failed",
        },
      });
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  if (!children) {
    return null;
  }

  return (
    <AuthContext
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}
