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
}

interface DisabledTimeRange {
  date: string;
  start: string;
  end: string;
}

interface ConsultationScheduleConfig {
  _id: string;

  // ✅ NEW FIELDS
  name: string;
  email: string;
  country: string;
  state: string;

  providerTimezone: { label: string; value: string };
  slotDurationMinutes: string;
  workingHours: WorkingHour[];
  breaks: Break[];
  disabledDates: string[];
  disabledTimeRanges: DisabledTimeRange[];
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

const ConsultationScheduleForm: React.FC = () => {
  const timezones = (Intl as any).supportedValuesOf("timeZone");
  const [config, setConfig] = useState<ConsultationScheduleConfig>({
    _id: "",
    name: "",
    email: "",
    country: "",
    state: "",

    providerTimezone: { label: "America/Toronto", value: "America/Toronto" },
    slotDurationMinutes: "30",
    workingHours: weekdays.map((day) => ({
      day,
      start: "09:00",
      end: "17:00",
    })),
    breaks: [],
    disabledDates: [],
    disabledTimeRanges: [],
  });

  const [showError, setShowError] = useState(false);

  const { data: fetchedConfigData, isLoading } =
    useGetScheduleConfigQuery(undefined);

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
      setConfig({
        ...unfrozen,
        providerTimezone: {
          label: unfrozen?.providerTimezone,
          value: unfrozen?.providerTimezone,
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
    field: "day" | "start" | "end",
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
  // Disabled Time Range Update
  // -------------------------------
  const handleDisabledTimeRangeChange = (
    index: number,
    field: "date" | "start" | "end",
    value: string
  ) => {
    setConfig((prev) => {
      const updated = prev.disabledTimeRanges.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      );
      return { ...prev, disabledTimeRanges: updated };
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
      providerTimezone,
      slotDurationMinutes,
      workingHours,
    } = config;
    if (
      !name ||
      !email ||
      !country ||
      !state ||
      !providerTimezone ||
      !slotDurationMinutes ||
      workingHours.length < 1
    ) {
      toast.error("Please fill in the required fields!");
      return setShowError(true);
    }
    const res = await updateScheduleConfig({
      configId: config._id,
      data: { ...config, providerTimezone: config.providerTimezone.value },
    });
    if (res?.error) return;
    toast.success("Consultation schedule is updated successfully.", {
      autoClose: 5000,
    });
  };

  const toggleErrorBorderColor = (value: string | boolean, field: string) => {
    if (field === "slotDurationMinutes") {
      return showError && !value
        ? "border-[2px] p-2 w-full rounded border-red-500 outline-red-500 focus:ring-red-500"
        : "border p-2 w-full rounded";
    } else if (field === "providerTime") {
      return showError && !value
        ? "border-[2px] p-2 w-full rounded border-red-500 outline-red-500 focus:ring-red-500"
        : "border p-2 w-full rounded";
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow rounded mb-[2.5rem]">
      <h2 className="text-xl font-bold mb-4">
        Consultation Schedule Configuration
      </h2>

      {/* -------- Provider Info -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Consultant Information</h3>

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Name"
          value={config.name}
          onChange={(e) => setConfig({ ...config, name: e.target.value })}
        />

        <input
          type="email"
          className="border p-2 w-full rounded mb-3"
          placeholder="Email"
          value={config.email}
          onChange={(e) => setConfig({ ...config, email: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Country"
          value={config.country}
          onChange={(e) => setConfig({ ...config, country: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="State / Province"
          value={config.state}
          onChange={(e) => setConfig({ ...config, state: e.target.value })}
        />
      </div>

      {/* -------- Provider Timezone -------- */}
      <div className="mb-4">
        <div className="font-semibold mb-1 flex justify-between items-center">
          <p>
            Your Timezone <RedStar />
          </p>
          {showError && !config?.providerTimezone && (
            <p className="text-red-500">Required*</p>
          )}
        </div>
        <Select
          size="large"
          className="w-full h-[50px] border-[1px] !border-[#838383] rounded-[8px]"
          // value={config.providerTimezone.value}
          value={config.providerTimezone.value}
          onChange={(value) => {
            setConfig((prev) => ({
              ...prev,
              providerTimezone: { label: value, value },
            }));
          }}
          options={timezones?.map((tz: string) => ({ label: tz, value: tz }))}
          suffixIcon={
            <Icon
              className="text-[1.5rem] text-gray-600"
              icon="iconamoon:arrow-down-2"
            />
          }
          placeholder="Search and select timezone"
          showSearch={true}
          allowClear
        ></Select>
      </div>

      {/* <div className="mb-4">
        <div className="font-semibold mb-1 flex justify-between items-center">
          <p>
            Your Timezone <RedStar />
          </p>
          {showError && !config?.providerTimezone && (
            <p className="text-red-500">Required*</p>
          )}
        </div>
        <input
          type="text"
          className={`${toggleErrorBorderColor(
            config.providerTimezone,
            "providerTime"
          )}`}
          name="providerTime"
          placeholder="Enter your time zone"
          value={config.providerTimezone}
          onChange={(e) =>
            setConfig({ ...config, providerTimezone: e.target.value })
          }
        />
      </div> */}

      {/* -------- Slot Duration -------- */}
      <div className="mb-4">
        <div className="font-semibold mb-1 flex justify-between items-center">
          <p>
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
          )}`}
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
          <p>
            Working Hours <RedStar />
          </p>
          {showError && !config.workingHours.length && (
            <p className="text-red-500">Working hour is required*</p>
          )}
        </div>

        {config.workingHours.map((wh, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <select
              className="border p-1 rounded"
              value={wh.day}
              onChange={(e) =>
                handleWorkingHourChange(idx, "day", e.target.value)
              }
            >
              {weekdays.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <input
              type="time"
              className="border p-1 rounded"
              value={wh.start}
              onChange={(e) =>
                handleWorkingHourChange(idx, "start", e.target.value)
              }
            />

            <span>-</span>

            <input
              type="time"
              className="border p-1 rounded"
              value={wh.end}
              onChange={(e) =>
                handleWorkingHourChange(idx, "end", e.target.value)
              }
            />

            <button
              className="text-red-500 ml-2"
              onClick={() => handleRemoveWorkingHour(idx)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Add Working Hour */}
        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 duration-300 text-white rounded"
          onClick={handleAddWorkingHour}
        >
          Add Working Hour
        </button>
      </div>

      {/* -------- Breaks -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Breaks</h3>

        {config.breaks.map((b, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <select
              className="border p-1 rounded"
              value={b.day}
              onChange={(e) => handleBreakChange(idx, "day", e.target.value)}
            >
              {weekdays.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <input
              type="time"
              className="border p-1 rounded"
              value={b.start}
              onChange={(e) => handleBreakChange(idx, "start", e.target.value)}
            />
            <span>-</span>
            <input
              type="time"
              className="border p-1 rounded"
              value={b.end}
              onChange={(e) => handleBreakChange(idx, "end", e.target.value)}
            />

            <button
              className="text-red-500"
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
        ))}

        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 duration-300 text-white rounded"
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              breaks: [...prev.breaks, { day: "Monday", start: "", end: "" }],
            }))
          }
        >
          Add Break
        </button>
      </div>

      {/* -------- Disabled Dates -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Disabled Dates</h3>

        {config.disabledDates.map((d, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="date"
              className="border p-1 rounded"
              value={d}
              onChange={(e) => {
                const newDates = [...config.disabledDates];
                newDates[idx] = e.target.value;
                setConfig({ ...config, disabledDates: newDates });
              }}
            />

            <button
              className="text-red-500"
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  disabledDates: prev.disabledDates.filter((_, i) => i !== idx),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 duration-300 text-white rounded"
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              disabledDates: [
                ...prev.disabledDates,
                new Date().toISOString().slice(0, 10),
              ],
            }))
          }
        >
          Add Disabled Date
        </button>
      </div>

      {/* -------- Disabled Time Ranges -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Disabled Time Ranges</h3>

        {config.disabledTimeRanges.map((r, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="date"
              className="border p-1 rounded"
              value={r.date}
              onChange={(e) =>
                handleDisabledTimeRangeChange(idx, "date", e.target.value)
              }
            />

            <input
              type="time"
              className="border p-1 rounded"
              value={r.start}
              onChange={(e) =>
                handleDisabledTimeRangeChange(idx, "start", e.target.value)
              }
            />

            <span>-</span>

            <input
              type="time"
              className="border p-1 rounded"
              value={r.end}
              onChange={(e) =>
                handleDisabledTimeRangeChange(idx, "end", e.target.value)
              }
            />

            <button
              className="text-red-500"
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  disabledTimeRanges: prev.disabledTimeRanges.filter(
                    (_, i) => i !== idx
                  ),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-900 duration-300 text-white rounded"
          onClick={() =>
            setConfig((prev) => ({
              ...prev,
              disabledTimeRanges: [
                ...prev.disabledTimeRanges,
                {
                  date: new Date().toISOString().slice(0, 10),
                  start: "",
                  end: "",
                },
              ],
            }))
          }
        >
          Add Disabled Range
        </button>
      </div>

      {/* -------- Save Button -------- */}
      <button
        className={`px-4 py-2 text-white rounded md:min-w-[300px] min-w-full ${
          updatingScheduleConfig ? "bg-gray-300" : "bg-green-500"
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
