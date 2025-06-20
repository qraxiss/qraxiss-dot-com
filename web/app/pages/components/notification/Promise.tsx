// Import Dependencies
import { toast } from "sonner";

// Local Imports
import { Button } from "@/components/ui";

// ----------------------------------------------------------------------

interface PromiseData {
  name: string;
}

const promise = () =>
  new Promise<PromiseData>((resolve) =>
    setTimeout(() => resolve({ name: "Todo" }), 2000),
  );

export function PromiseExample() {
  return (
    <div className="max-w-xl">
      <Button
        onClick={() =>
          toast.promise(promise, {
            loading: "Loading...",
            success: (data) => {
              return `${data.name} toast has been added`;
            },
            error: "Error",
            className: "soft-color",
          })
        }
      >
        Default
      </Button>
    </div>
  );
}
