import { FieldValues, SubmitHandler } from "react-hook-form";
import DFForm from "../components/Form/DFForm";
import DFInputWithWatch from "../components/Form/DFInputWithWatch";
import { useAppSelector } from "../redux/hooks";
import { setTitle } from "../redux/features/other/researchSlice";
import DynamicFields from "./DynamicFields";

export default function Research() {
  const {title, brand, price} = useAppSelector(state => state.research)
  const handleSubmit: SubmitHandler<FieldValues> = () => {};
  console.log("Changed value==> ", title, price, brand);

  return (
    <div className="m-[5rem]">
      <DFForm onSubmit={handleSubmit} defaultValues={{title:'abc', brand:'def', price:700}}>
       <div className="space-y-[1rem]">
       <DFInputWithWatch
          setValue={setTitle}
          name="title"
          type="text"
          label="Title"
        />
        <DynamicFields/>
       </div>
        <button type="submit">Submit Now</button>
      </DFForm>
    </div>
  );
}
