import { FieldValues, SubmitHandler } from "react-hook-form";
import DFForm from "../components/Form/DFForm";
import DFInputWithWatch from "../components/Form/DFInputWithWatch";
import { useAppSelector } from "../redux/hooks";
import { setBrand, setPrice, setTitle } from "../redux/features/other/researchSlice";

export default function Research() {
    const {title, brand, price} = useAppSelector(state => state.research)
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Form Data==========> ", data);
  };
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
        <DFInputWithWatch
          setValue={setPrice}
          name="price"
          type="number"
          label="Price"
        />
        <DFInputWithWatch
          setValue={setBrand}
          name="brand"
          type="text"
          label="Brand"
        />
       </div>
        <button type="submit">Submit Now</button>
      </DFForm>
    </div>
  );
}
