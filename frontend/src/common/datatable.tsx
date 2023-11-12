import Book from "@/model/Book";
import OverFlowMenuItem from "@/model/OverFlowMenuItem";
import React from "react";
import { Link } from "react-router-dom";

interface DataTableProps {
  data: any;
  idName: string;
  overflowMenu: OverFlowMenuItem[];
}
const BASE_URL = `http://localhost:1205/api/v1`;

const DataTable: React.FC<DataTableProps> = ({
  data,
  idName,
  overflowMenu,
}) => {
  if (data.length == 0) return <h2 className="text-center"> No Data </h2>;
  const nonHeading = new Set([
    "version",
    "description",
    "semesterApplicable",
    "createdBy",
    "createdDate",
    "updatedBy",
    "updatedDate",
    "issuedBy"
  ]);

  let headings = Object.keys(data[0]);
  headings = headings.filter((heading) => !nonHeading.has(heading));
  const styleHeading = headings.map((heading) =>
    heading.replace(/([A-Z])/g, " $1").trim()
  );

  const columStyle = "border border-gray-300 p-3";

  return (
    <table className="table-auto w-full text-center border-collapse border border-gray-300">
      <thead>
        <tr>
          {styleHeading.map((heading, index) => (
            <th key={index} className={columStyle}>
              {heading}
            </th>
          ))}
          {overflowMenu.length > 0 && <th className={columStyle}>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => (
          <React.Fragment key={index}>
            <tr>
              {headings.map((heading, index) => (
                <td key={index} className={columStyle}>
                  {heading === "image" ? (
                    <img
                      src={`${BASE_URL}${d[heading as keyof Book]}`}
                      alt="No image"
                      className="h-20 w-full"
                    />
                  ) : (
                    <p>{d[heading as keyof Book]}</p>
                  )}
                </td>
              ))}
              {overflowMenu.length > 0 && (
                <td className={columStyle}>
                  <div className="relative group inline-block text-left">
                    <button className="px-2 py-1 bg-gray-300 rounded ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 6a2 2 0 100-4 2 2 0 000 4zM10 12a2 2 0 100-4 2 2 0 000 4zM10 18a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    <div className="absolute hidden text-gray-600 group-hover:block origin-top-right right-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="py-2">
                        {overflowMenu.map((menu, index) => {
                          return menu.path ? (
                            <Link
                              to={menu.path + d[idName as keyof Book]}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                              key={index}
                            >
                              {menu.label}
                            </Link>
                          ) : (
                            <button
                              className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                              onClick={() => {
                                if (menu.callBack)
                                  menu.callBack(
                                    String(d[idName as keyof Book])
                                  );
                              }}
                            >
                              {menu.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </td>
              )}
            </tr>
            {/* <tr>
                <td colSpan={headings.length} className="text-left">
                    hello
                </td>
            </tr> */}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
