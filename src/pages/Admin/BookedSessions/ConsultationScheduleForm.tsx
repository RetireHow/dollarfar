// components/ConsultationScheduleForm.tsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetScheduleConfigQuery,
  useUpdateScheduleConfigMutation,
} from "../../../redux/features/APIEndpoints/ScheduleConfigApi/ShceduleConfigApi";
import RedStar from "../../../components/UI/RedStar";
import { showApiErrorToast } from "../../../utils/showApiErrorToast";
import { Select } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";

import timezoneMap from "../../RetirementCalculator/timezone.json"; // IANA ↔ Windows mapping
import { DataLoadingError } from "../../../components/UI/DataLoadingError";

const standardTimezoneMap = timezoneMap.map((tz) => ({
  label: tz.tz_windows,
  value: tz.tz_iana,
}));

type DayName =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface WorkingHour {
  day: DayName;
  start: string;
  end: string;
}

interface Break {
  day: DayName;
  start: string;
  end: string;
  reason: string;
}

interface BlockedDate {
  date: string;
  reason: string;
}

interface BlockedTimeRange {
  date: string;
  start: string;
  end: string;
  reason: string;
}

interface ConsultationScheduleConfig {
  _id: string;

  // ✅ NEW FIELDS
  name: string;
  email: string;
  country: string;
  state: string;

  consultantTZ: { label: string; value: string };
  slotDurationMinutes: string;
  workingHours: WorkingHour[];
  breaks: Break[];
  blockedDates: BlockedDate[];
  blockedTimeRanges: BlockedTimeRange[];
}

const weekdays: DayName[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ConsultationScheduleFormSkeleton: React.FC = () => {
  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded mb-[2.5rem] animate-pulse">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Consultation Time Slots Configuration
      </h2>

      {/* -------- Consultant Information -------- */}
      <div className="mb-6">
        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>

        {/* Name */}
        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>

        {/* Email */}
        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>

        {/* Country */}
        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>

        {/* State */}
        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Timezone Select -------- */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Slot Duration -------- */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="h-5 w-44 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Working Hours -------- */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Working hours rows */}
        {[1, 2].map((_, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-3">
            <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
            <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
            <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded ml-2"></div>
          </div>
        ))}

        {/* Add Working Hour button */}
        <div className="mt-2 h-8 w-36 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Breaks -------- */}
      <div className="mb-6">
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>

        {/* Breaks rows */}
        {[1].map((_, idx) => (
          <div
            key={idx}
            className="mb-4 p-3 border dark:border-gray-700 rounded"
          >
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="mt-2">
              <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}

        {/* Add Break button */}
        <div className="mt-2 h-8 w-28 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Blocked Dates -------- */}
      <div className="mb-6">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>

        {/* Blocked dates rows */}
        {[1].map((_, idx) => (
          <div
            key={idx}
            className="mb-4 p-3 border dark:border-gray-700 rounded"
          >
            <div className="flex items-center gap-2">
              <div className="h-9 w-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="mt-2">
              <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}

        {/* Add Blocked Date button */}
        <div className="mt-2 h-8 w-40 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Blocked Time Ranges -------- */}
      <div className="mb-6">
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>

        {/* Blocked time ranges rows */}
        {[1].map((_, idx) => (
          <div
            key={idx}
            className="mb-4 p-3 border dark:border-gray-700 rounded"
          >
            <div className="flex items-center gap-2">
              <div className="h-9 w-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-9 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="mt-2">
              <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}

        {/* Add Blocked Range button */}
        <div className="mt-2 h-8 w-44 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>

      {/* -------- Save Button -------- */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

const ConsultationScheduleForm: React.FC = () => {
  const [config, setConfig] = useState<ConsultationScheduleConfig>({
    _id: "",
    name: "",
    email: "",
    country: "",
    state: "",

    consultantTZ: {
      label: "(UTC-05:00) Eastern Time (US & Canada)",
      value: "America/Toronto",
    },
    slotDurationMinutes: "30",
    workingHours: weekdays.map((day) => ({
      day,
      start: "09:00",
      end: "17:00",
    })),
    breaks: [],
    blockedDates: [],
    blockedTimeRanges: [],
  });

  const [showError, setShowError] = useState(false);

  const {
    data: fetchedConfigData,
    isLoading,
    isError: isConfigDataError,
    refetch: refetchConfiguration,
  } = useGetScheduleConfigQuery(undefined);

  const [
    updateScheduleConfig,
    {
      isLoading: updatingScheduleConfig,
      isError: isUpdateScheduleConfigError,
      error: updateScheduleConfigError,
    },
  ] = useUpdateScheduleConfigMutation(undefined);

  // ❗ FIX: Deep clone RTK returned frozen data
  useEffect(() => {
    if (!isLoading && fetchedConfigData?.data) {
      const unfrozen = JSON.parse(JSON.stringify(fetchedConfigData.data));

      // Handle migration from string array to object array for blockedDates
      const blockedDates = unfrozen.blockedDates || [];
      const migratedBlockedDates =
        Array.isArray(blockedDates) &&
        blockedDates.length > 0 &&
        typeof blockedDates[0] === "string"
          ? blockedDates.map((date: string) => ({ date, reason: "" }))
          : blockedDates;

      setConfig({
        ...unfrozen,
        blockedDates: migratedBlockedDates,
        consultantTZ: {
          label: unfrozen?.consultantTZ,
          value: unfrozen?.consultantTZ_IANA,
        },
      });
    }
  }, [isLoading, fetchedConfigData]);

  // -------------------------------
  // Working Hours Update
  // -------------------------------
  const handleWorkingHourChange = (
    index: number,
    field: "day" | "start" | "end",
    value: string
  ) => {
    setConfig((prev) => {
      const updated = [...prev.workingHours];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, workingHours: updated };
    });
  };

  const handleAddWorkingHour = () => {
    setConfig((prev) => ({
      ...prev,
      workingHours: [
        ...prev.workingHours,
        { day: "Monday", start: "10:00", end: "16:00" },
      ],
    }));
  };

  const handleRemoveWorkingHour = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      workingHours: prev.workingHours.filter((_, i) => i !== index),
    }));
  };

  // -------------------------------
  // Breaks Update
  // -------------------------------
  const handleBreakChange = (
    index: number,
    field: "day" | "start" | "end" | "reason",
    value: string
  ) => {
    setConfig((prev) => {
      const newBreaks = prev.breaks.map((b, i) =>
        i === index ? { ...b, [field]: value } : b
      );

      return { ...prev, breaks: newBreaks };
    });
  };

  // -------------------------------
  // Blocked Date Update
  // -------------------------------
  const handleBlockedDateChange = (
    index: number,
    field: "date" | "reason",
    value: string
  ) => {
    setConfig((prev) => {
      const updated = prev.blockedDates.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      );
      return { ...prev, blockedDates: updated };
    });
  };

  // -------------------------------
  // Blocked Time Range Update
  // -------------------------------
  const handleBlockedTimeRangeChange = (
    index: number,
    field: "date" | "start" | "end" | "reason",
    value: string
  ) => {
    setConfig((prev) => {
      const updated = prev.blockedTimeRanges.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      );
      return { ...prev, blockedTimeRanges: updated };
    });
  };

  // -------------------------------
  // Submit Handler
  // -------------------------------
  useEffect(() => {
    if (
      !updatingScheduleConfig &&
      isUpdateScheduleConfigError &&
      updateScheduleConfigError
    ) {
      showApiErrorToast(updateScheduleConfigError);
    }
  }, [
    updatingScheduleConfig,
    isUpdateScheduleConfigError,
    updateScheduleConfigError,
  ]);

  const handleSubmit = async () => {
    const {
      name,
      email,
      country,
      state,
      consultantTZ,
      slotDurationMinutes,
      workingHours,
    } = config;
    if (
      !name ||
      !email ||
      !country ||
      !state ||
      !consultantTZ ||
      !slotDurationMinutes ||
      workingHours.length < 1
    ) {
      toast.error("Please fill in the required fields!");
      return setShowError(true);
    }
    // console.log("Form Data=============> ", config);
    const res = await updateScheduleConfig({
      configId: config._id,
      data: {
        ...config,
        consultantTZ: config.consultantTZ.label,
        consultantTZ_IANA: config.consultantTZ.value,
      },
    });
    if (res?.error) return;
    toast.success("Consultation schedule is updated successfully.", {
      autoClose: 5000,
    });
  };

  const toggleErrorBorderColor = (value: string | boolean, field: string) => {
    if (field === "slotDurationMinutes") {
      return showError && !value
        ? "border-[2px] p-2 w-full rounded border-red-500 outline-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-red-500"
        : "border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600";
    }
  };

  // Decide what to render
  if (isLoading && !isConfigDataError) {
    return <ConsultationScheduleFormSkeleton />;
  }

  if (!isLoading && isConfigDataError) {
    return (
      <DataLoadingError
        title="Failed to load schedule configuration"
        errorMessage="There is something wrong!"
        onRetry={refetchConfiguration}
      />
    );
  }

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded mb-[2.5rem]">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Consultation Time Slots Configuration
      </h2>

      {/* -------- Provider Info -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 dark:text-white">
          Consultant Information <RedStar />
        </h3>

        <input
          className="border p-2 w-full rounded mb-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Name"
          value={config.name}
          onChange={(e) => setConfig({ ...config, name: e.target.value })}
        />

        <input
          type="email"
          className="border p-2 w-full rounded mb-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Email"
          value={config.email}
          onChange={(e) => setConfig({ ...config, email: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded mb-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Country"
          value={config.country}
          onChange={(e) => setConfig({ ...config, country: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="State / Province"
          value={config.state}
          onChange={(e) => setConfig({ ...config, state: e.target.value })}
        />
      </div>

      {/* -------- Provider Timezone -------- */}
      <div className="mb-4">
        <div className="font-semibold mb-1 flex justify-between items-center">
          <p className="dark:text-white">
            Your Timezone <RedStar />
          </p>
          {showError && !config?.consultantTZ.value && (
            <p className="text-red-500">Required*</p>
          )}
        </div>
        <Select
          size="large"
          status={showError && !config.consultantTZ.value ? "error" : ""}
          className="w-full h-[50px] dark:[&_.ant-select-selector]:bg-gray-700 dark:[&_.ant-select-selector]:border-gray-600 dark:[&_.ant-select-selection-placeholder]:text-gray-400 dark:[&_.ant-select-selection-item]:text-white"
          value={config.consultantTZ?.value}
          onChange={(
            _,
            option:
              | { label: string; value: string }
              | { label: string; value: string }[]
          ) => {
            // Assert that option is a single object (not array) for single select
            const singleOption = option as { label: string; value: string };
            setConfig({ ...config, consultantTZ: singleOption });
          }}
          options={standardTimezoneMap}
          suffixIcon={
            <Icon
              className="text-[1.5rem] text-gray-600 dark:text-gray-400"
              icon="iconamoon:arrow-down-2"
            />
          }
          placeholder="Type City & select timezone. e.g., Toronto"
          showSearch={true}
          allowClear
        ></Select>
      </div>

      {/* -------- Slot Duration -------- */}
      <div className="mb-4">
        <div className="font-semibold mb-1 flex justify-between items-center">
          <p className="dark:text-white">
            Slot Duration (minutes)
            <RedStar />
          </p>
          {showError && !config.slotDurationMinutes && (
            <p className="text-red-500">Required*</p>
          )}
        </div>
        <input
          type="number"
          className={`${toggleErrorBorderColor(
            config.slotDurationMinutes,
            "slotDurationMinutes"
          )} dark:text-white`}
          placeholder="Please enter slot duration"
          value={config.slotDurationMinutes}
          name="slotDurationMinutes"
          onChange={(e) =>
            setConfig({
              ...config,
              slotDurationMinutes: e.target.value,
            })
          }
          onWheel={(e) => (e.target as HTMLFormElement).blur()}
        />
      </div>

      {/* -------- Working Hours -------- */}
      <div className="mb-6">
        <div className="font-semibold mb-1 flex justify-between items-center">
          <p className="dark:text-white">
            Working Hours <RedStar />
          </p>
          {showError && !config.workingHours.length && (
            <p className="text-red-500">Working hour is required*</p>
          )}
        </div>

        {config.workingHours.map((wh, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <select
              className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={wh.day}
              onChange={(e) =>
                handleWorkingHourChange(idx, "day", e.target.value)
              }
            >
              {weekdays.map((d) => (
                <option key={d} className="dark:bg-gray-700">
                  {d}
                </option>
              ))}
            </select>

            <input
              type="time"
              className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={wh.start}
              onChange={(e) =>
                handleWorkingHourChange(idx, "start", e.target.value)
              }
            />

            <span className="dark:text-white">-</span>

            <input
              type="time"
              className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={wh.end}
              onChange={(e) =>
                handleWorkingHourChange(idx, "end", e.target.value)
              }
            />

            <button
              className="text-red-500 ml-2 dark:text-red-400"
              onClick={() => handleRemoveWorkingHour(idx)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Add Working Hour */}
        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 text-white rounded"
          onClick={handleAddWorkingHour}
        >
          Add Working Hour
        </button>
      </div>

      {/* -------- Breaks -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 dark:text-white">Breaks</h3>

        {config.breaks.map((b, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 mb-4 p-3 border rounded dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <select
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={b.day}
                onChange={(e) => handleBreakChange(idx, "day", e.target.value)}
              >
                {weekdays.map((d) => (
                  <option key={d} className="dark:bg-gray-700">
                    {d}
                  </option>
                ))}
              </select>

              <input
                type="time"
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={b.start}
                onChange={(e) =>
                  handleBreakChange(idx, "start", e.target.value)
                }
              />
              <span className="dark:text-white">-</span>
              <input
                type="time"
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={b.end}
                onChange={(e) => handleBreakChange(idx, "end", e.target.value)}
              />

              <button
                className="text-red-500 dark:text-red-400"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    breaks: prev.breaks.filter((_, i) => i !== idx),
                  }))
                }
              >
                Remove
              </button>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Reason for break (optional)"
                value={b.reason || ""}
                onChange={(e) =>
                  handleBreakChange(idx, "reason", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 text-white rounded"
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              breaks: [
                ...prev.breaks,
                { day: "Monday", start: "", end: "", reason: "" },
              ],
            }))
          }
        >
          Add Break
        </button>
      </div>

      {/* -------- Blocked Dates -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 dark:text-white">Blocked Dates</h3>

        {config.blockedDates.map((d, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 mb-4 p-3 border rounded dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={d.date}
                onChange={(e) =>
                  handleBlockedDateChange(idx, "date", e.target.value)
                }
              />

              <button
                className="text-red-500 dark:text-red-400"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    blockedDates: prev.blockedDates.filter((_, i) => i !== idx),
                  }))
                }
              >
                Remove
              </button>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Reason for blocking this date (optional)"
                value={d.reason || ""}
                onChange={(e) =>
                  handleBlockedDateChange(idx, "reason", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 text-white rounded"
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              blockedDates: [
                ...prev.blockedDates,
                {
                  date: new Date().toISOString().slice(0, 10),
                  reason: "",
                },
              ],
            }))
          }
        >
          Add Blocked Date
        </button>
      </div>

      {/* -------- Blocked Time Ranges -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 dark:text-white">
          Blocked Time Ranges
        </h3>

        {config.blockedTimeRanges.map((r, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 mb-4 p-3 border rounded dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={r.date}
                onChange={(e) =>
                  handleBlockedTimeRangeChange(idx, "date", e.target.value)
                }
              />

              <input
                type="time"
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={r.start}
                onChange={(e) =>
                  handleBlockedTimeRangeChange(idx, "start", e.target.value)
                }
              />

              <span className="dark:text-white">-</span>

              <input
                type="time"
                className="border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={r.end}
                onChange={(e) =>
                  handleBlockedTimeRangeChange(idx, "end", e.target.value)
                }
              />

              <button
                className="text-red-500 dark:text-red-400"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    blockedTimeRanges: prev.blockedTimeRanges.filter(
                      (_, i) => i !== idx
                    ),
                  }))
                }
              >
                Remove
              </button>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Reason for blocking this time range (optional)"
                value={r.reason || ""}
                onChange={(e) =>
                  handleBlockedTimeRangeChange(idx, "reason", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 text-white rounded"
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              blockedTimeRanges: [
                ...prev.blockedTimeRanges,
                {
                  date: new Date().toISOString().slice(0, 10),
                  start: "",
                  end: "",
                  reason: "",
                },
              ],
            }))
          }
        >
          Add Blocked Range
        </button>
      </div>

      {/* -------- Save Button -------- */}
      <button
        className={`px-4 py-2 text-white rounded min-w-full duration-300 ${
          updatingScheduleConfig
            ? "bg-gray-300 dark:bg-gray-600"
            : "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
        }`}
        onClick={handleSubmit}
        disabled={updatingScheduleConfig}
      >
        {updatingScheduleConfig ? "Saving..." : "Save Configuration"}
      </button>
    </div>
  );
};

export default ConsultationScheduleForm;
