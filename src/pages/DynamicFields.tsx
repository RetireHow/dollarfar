import { useFieldArray, useForm } from "react-hook-form";

export default function DynamicFields() {
  const { control, register } = useForm();
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "test",
    }
  );

  return (
    <div className="pb-[2rem] pt-5">
      <div className="flex flex-wrap gap-5">
        {fields.map((field, index) => {
          return (
            <div>
              <div className="flex justify-between items-center mb-1 gap-2">
                <input
                  key={field.id} // important to include key with field's id
                  {...register(`test.${index}.value`)}
                  className="outline-none border-[1px] border-gray-500 p-1 rounded-[8px] flex-1 h-[25px]"
                />

                <button>Save</button>
                <button
                  onClick={() => {
                    remove(index);
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <input
                key={field.id} // important to include key with field's id
                {...register(`test.${index}.value`)}
                className="outline-none border-[1px] border-gray-500 px-2 py-1 rounded-[8px] w-full"
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          append({ test: "test" });
        }}
      >
        +Add
      </button>
    </div>
  );
}
