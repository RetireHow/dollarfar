import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useGetSinglePOCInterestQuery } from "../../../redux/features/APIEndpoints/POCInterestApi/POCInterestApi";
import { IPOCInterest } from "./types";

export default function POCInterestDetails(): JSX.Element {
  const { pocInterestId } = useParams<{ pocInterestId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSinglePOCInterestQuery(pocInterestId);
  const submission: IPOCInterest = data?.data || {};

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-4"></div>
        <p className="text-gray-600">Loading submission details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
            Back to List
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              POC Interest Submission Details
            </h1>
            <p className="text-gray-600">
              Detailed information for {submission.first_name}'s submission
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                submission.ack
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {submission.ack ? "✓ Acknowledged" : "✗ Not Acknowledged"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              <Icon icon="mdi:account-circle" className="inline-block mr-2" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    First Name
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {submission.first_name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {submission.email}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Country
                  </label>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:map-marker-outline"
                      className="text-gray-400"
                    />
                    <p className="text-lg font-medium text-gray-900">
                      {submission.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* POC Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              <Icon
                icon="mdi:clipboard-check-outline"
                className="inline-block mr-2"
              />
              POC Participation Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Participation Type
                </label>
                <div className="flex items-center gap-2">
                  <Icon
                    icon={
                      submission.participating_as === "Individual"
                        ? "mdi:account"
                        : submission.participating_as === "Couple"
                        ? "mdi:account-group"
                        : "mdi:account-multiple"
                    }
                    className="text-teal-500"
                  />
                  <p className="text-lg font-medium text-gray-900">
                    {submission.participating_as}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Duration
                </label>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:calendar-clock" className="text-green-500" />
                  <p className="text-lg font-medium text-gray-900">
                    {submission.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personas Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              <Icon
                icon="mdi:tag-multiple-outline"
                className="inline-block mr-2"
              />
              Selected Personas
            </h2>
            <div className="flex flex-wrap gap-2">
              {submission?.persona?.map((persona, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                >
                  <Icon icon="mdi:check-circle-outline" className="mr-2" />
                  {persona}
                </span>
              ))}
            </div>
          </div>

          {/* Validation Goal Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              <Icon icon="mdi:target" className="inline-block mr-2" />
              Validation Goal
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {submission.what_to_validate}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Submission ID: {pocInterestId}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
