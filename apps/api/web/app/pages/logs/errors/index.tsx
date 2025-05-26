// Local Imports
import { Page } from "@/components/shared/Page";
import { LogShow } from "../PostContent";
import { useGetErrorLogsQuery } from "@/state/api/logs";
import { useEffect } from "react"; // CHANGE !!
// ----------------------------------------------------------------------

export default function Errors() {
  const { data, refetch } = useGetErrorLogsQuery(1000) // CHANGE !!

  useEffect(() => { // CHANGE !!
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, []); // CHANGE !!

  return (
    <Page title="Logs">
      <div className="transition-content grid w-full grid-cols-12 px-(--margin-x) lg:gap-6">
        <div className="col-span-12 pt-6 lg:pb-6">
          <LogShow items={data?.data || []} error={true} />
        </div>
      </div>
    </Page>
  );
}
