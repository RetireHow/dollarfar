// components/ConsultationScheduleForm.tsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetScheduleConfigQuery } from "../../../redux/features/APIEndpoints/ScheduleConfigApi/ShceduleConfigApi";

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
  providerTimezone: string;
  slotDurationMinutes: number;
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
  const [config, setConfig] = useState<ConsultationScheduleConfig>({
    _id: "",
    providerTimezone: "America/Toronto",
    slotDurationMinutes: 30,
    workingHours: weekdays.map((day) => ({
      day,
      start: "09:00",
      end: "17:00",
    })),
    breaks: [],
    disabledDates: [],
    disabledTimeRanges: [],
  });

  const { data: fetchedConfigData, isLoading } =
    useGetScheduleConfigQuery(undefined);

  // ❗ FIX: Deep clone RTK returned frozen data
  useEffect(() => {
    if (!isLoading && fetchedConfigData?.data) {
      const unfrozen = JSON.parse(JSON.stringify(fetchedConfigData.data));
      setConfig(unfrozen);
    }
  }, [isLoading, fetchedConfigData]);

  // -------------------------------
  // Working Hours Update
  // -------------------------------

  const handleWorkingHourChange = (
    day: DayName,
    field: "start" | "end",
    value: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      workingHours: prev.workingHours.map((wh) =>
        wh.day === day ? { ...wh, [field]: value } : wh
      ),
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

  const handleSubmit = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/v1/consultation-schedule-config/${config._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        }
      );

      toast.success("Configuration updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update configuration");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow rounded mb-[2.5rem]">
      <h2 className="text-xl font-bold mb-4">
        Consultation Schedule Configuration
      </h2>

      {/* -------- Provider Timezone -------- */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Provider Timezone</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={config.providerTimezone}
          onChange={(e) =>
            setConfig({ ...config, providerTimezone: e.target.value })
          }
        />
      </div>

      {/* -------- Slot Duration -------- */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">
          Slot Duration (minutes)
        </label>
        <input
          type="number"
          className="border p-2 w-full rounded"
          value={config.slotDurationMinutes}
          onChange={(e) =>
            setConfig({
              ...config,
              slotDurationMinutes: Number(e.target.value),
            })
          }
          onWheel={(e) => (e.target as HTMLFormElement).blur()}
        />
      </div>

      {/* -------- Working Hours -------- */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Working Hours</h3>
        {config.workingHours.map((w, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <span className="w-24">{w.day}</span>
            <input
              type="time"
              className="border p-1 rounded"
              value={w.start}
              onChange={(e) =>
                handleWorkingHourChange(w.day, "start", e.target.value)
              }
            />
            <span>-</span>
            <input
              type="time"
              className="border p-1 rounded"
              value={w.end}
              onChange={(e) =>
                handleWorkingHourChange(w.day, "end", e.target.value)
              }
            />
          </div>
        ))}
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
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
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
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
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
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
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
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSubmit}
      >
        Save Configuration
      </button>
    </div>
  );
};

export default ConsultationScheduleForm;
