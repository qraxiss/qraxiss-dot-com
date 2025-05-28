// Import Dependencies
import { useReducer, useEffect } from "react";

// Local Imports
import {
  AddProductFormContextProvider,
  FormState,
  FormAction,
} from "./AddProductFormContext";
import type { DeltaStatic } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------

// Lazy initialization function for Delta (SSR-safe)
const createDelta = (): DeltaStatic => {
  // Return a valid Delta-like object
  return { ops: [] };
};

// SSR-safe initial state
const getInitialState = (): FormState => ({
  formData: {
    general: {
      title: "",
      sku: "",
      price: 0,
      category_id: "",
      brand_id: "",
      inStock: true,
      selling_type: "",
    },
    description: {
      short_description: "",
      description: createDelta(),
      meta_title: "",
      meta_description: "",
      meta_keywords: [],
    },
    images: {
      gallery: [],
      cover: "",
    },
  },
  stepStatus: {
    general: {
      isDone: false,
    },
    description: {
      isDone: false,
    },
    images: {
      isDone: false,
    },
  },
});

const reducerHandlers = {
  SET_FORM_DATA: (state: FormState, action: FormAction) => {
    if (action.type !== "SET_FORM_DATA") return state;
    return {
      ...state,
      formData: {
        ...state.formData,
        ...action.payload,
      },
    };
  },
  SET_STEP_STATUS: (state: FormState, action: FormAction) => {
    if (action.type !== "SET_STEP_STATUS") return state;
    return {
      ...state,
      stepStatus: {
        ...state.stepStatus,
        ...action.payload,
      },
    };
  },
  HYDRATE_DELTA: (state: FormState, action: FormAction) => {
    if (action.type !== "HYDRATE_DELTA") return state;
    return {
      ...state,
      formData: {
        ...state.formData,
        description: {
          ...state.formData.description,
          description: createDelta(),
        },
      },
    };
  },
};

const reducer = (state: FormState, action: FormAction): FormState =>
  reducerHandlers[action.type]?.(state, action) || state;

export function AddProductFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  // Client-side hydration sonrası Delta'yı oluştur
  useEffect(() => {
    // Check if we're on client and Delta needs to be hydrated
    if (typeof window !== 'undefined' && 
        state.formData.description.description &&
        Object.keys(state.formData.description.description).length === 0) {
      dispatch({ type: "HYDRATE_DELTA" });
    }
  }, []);

  const value = { state, dispatch };

  return (
    <AddProductFormContextProvider value={value}>
      {children}
    </AddProductFormContextProvider>
  );
}