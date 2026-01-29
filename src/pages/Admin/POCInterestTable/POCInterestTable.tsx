import { IPOCInterest } from "./types";
import { Link } from "react-router-dom";
import { useGetAllPOCInterestsQuery } from "../../../redux/features/APIEndpoints/POCInterestApi/POCInterestApi";

export default function POCInterestTable(): JSX.Element {
  const { data, isLoading } = useGetAllPOCInterestsQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p>Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold mb-6">POC Interest Submissions</h1>

      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Full Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Country
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Participating As
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Duration
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((submission: IPOCInterest, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {submission.full_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {submission.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {submission.country}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {submission.participating_as}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {submission.duration}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`poc-interest-details/${submission._id}`}
                    className="border-[1px] border-gray-300 hover:border-gray-500 rounded-md px-3 py-1"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
