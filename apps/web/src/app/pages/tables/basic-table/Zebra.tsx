// Local Imports
import { Table, THead, TBody, Th, Tr, Td } from "@/components/ui";

// ----------------------------------------------------------------------

const cols = ["#", "Name", "Job", "FAVORITE COLOR"];

interface Data {
  uid: string;
  name: string;
  job: string;
  favColor: string;
}

const data: Data[] = [
  {
    uid: "1",
    name: "Cy Ganderton",
    job: "Quality Control Specialist",
    favColor: "Blue",
  },
  {
    uid: "2",
    name: "Hart Hagerty",
    job: "Desktop Support Technician",
    favColor: "Purple",
  },
  {
    uid: "3",
    name: "Brice Swyre",
    job: "Tax Accountant",
    favColor: "Red",
  },
  {
    uid: "4",
    name: "Marjy Ferencz",
    job: "Office Assistant I",
    favColor: "Crimson",
  },
];

export function Zebra() {
  return (
    <div className="hide-scrollbar min-w-full overflow-x-auto">
      <Table zebra className="w-full text-left rtl:text-right">
        <THead>
          <Tr>
            {cols.map((title, index) => (
              <Th
                key={index}
                className="dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-l-lg last:ltr:rounded-r-lg first:rtl:rounded-r-lg last:rtl:rounded-l-lg"
              >
                {title}
              </Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {data.map((tr) => (
            <Tr key={tr.uid}>
              <Td className="ltr:rounded-l-lg rtl:rounded-r-lg">{tr.uid}</Td>
              <Td>{tr.name}</Td>
              <Td>{tr.job}</Td>
              <Td className="ltr:rounded-r-lg rtl:rounded-l-lg">
                {tr.favColor}
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
