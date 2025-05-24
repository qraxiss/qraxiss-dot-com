import { Input } from "@/components/ui";

const Custom = () => {
  return (
    <div className="max-w-xl">
      <Input className="rounded-full" placeholder="Enter Username" />
      <Input
        unstyled
        classNames={{
          root: "mt-4",
          input:
            "bg-gray-150 focus:ring-primary-500/50 dark:bg-dark-900 dark:placeholder:text-dark-200/70 rounded-lg px-3 py-2 placeholder:text-gray-400 focus:ring-3",
        }}
        placeholder="Enter Username"
      />
    </div>
  );
};

export { Custom };
