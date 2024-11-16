import { useState, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeSpacesFromKey } from "../utils/removeSpaceFromKey";
import { updateField } from "../redux/features/BgtSlice/BgtSlice";
import { BudgetState, Field, SubCategory } from "../redux/features/BgtSlice/BgtTypes";

// Define a type for the dynamic input items
type DynamicInputItem = {
  id: number;
  label: string;
  value: string;
};

const useBudgetDynamicInput = ({
  dynamicFieldTitleRef,
  categoryActive
}: {
  dynamicFieldTitleRef: MutableRefObject<HTMLInputElement | null>;
  categoryActive?:string;
}) => {
  const dispatch = useDispatch();
  const [newInput, setNewInput] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });
  const [dynamicInputs, setDynamicInputs] = useState<DynamicInputItem[]>([]);
  const [showNewInputField, setShowNewInputField] = useState(false);
  const [showSubInputs, setShowSubInputs] = useState(categoryActive == "SalaryWages" ? true : false);

  const handleSaveInput = ({category, subCategory}:{category:keyof BudgetState;subCategory?:keyof SubCategory}) => {
    if (newInput.label) {
      if (!isNaN(Number(newInput.label))) {
        if (dynamicFieldTitleRef.current) {
          dynamicFieldTitleRef.current.style.border = "1px solid red";
        }
        return toast.warning("Field name number is not allowed.", {
          position: "top-center",
        });
      }

      dispatch(
        updateField({
          category: category as keyof BudgetState,
          subCategory: subCategory as keyof SubCategory,
          field: removeSpacesFromKey(newInput.label) as keyof Field,
          value: Number(newInput.value),
        })
      );

      setDynamicInputs((prev) => [
        ...prev,
        { id: Date.now(), label: newInput.label, value: newInput.value },
      ]);
      setNewInput({ label: "", value: "" });
      setShowNewInputField(false);
    } else {
      if (dynamicFieldTitleRef.current) {
        dynamicFieldTitleRef.current.style.border = "1px solid red";
      }
      toast.warning("Field name is mandatory.", { position: "top-center" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "label") {
      if (!!value && isNaN(Number(value))) {
        if (dynamicFieldTitleRef.current) {
          dynamicFieldTitleRef.current.style.border = "1px solid gray";
        }
      } else {
        if (dynamicFieldTitleRef.current) {
          dynamicFieldTitleRef.current.style.border = "1px solid red";
        }
      }
    }

    setNewInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    category:keyof BudgetState,
    subCategory?:keyof SubCategory
  ) => {
    const { value, name } = e.target;
    dispatch(
      updateField({
        category: category as keyof BudgetState,
        subCategory: subCategory as keyof SubCategory,
        field: removeSpacesFromKey(name) as keyof Field,
        value: Number(value),
      })
    );
    setDynamicInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const handleAddNewInput = () => {
    setShowNewInputField(true);
  };

  // Remove unsaved new input field
  const handleRemoveNewInput = () => {
    setNewInput({ label: "", value: "" });
    setShowNewInputField(false);
  };

  return {
    newInput,
    dynamicInputs,
    handleSaveInput,
    handleInputChange,
    handleDynamicInputChange,
    setDynamicInputs,
    handleRemoveNewInput,
    showNewInputField,
    setShowNewInputField,
    showSubInputs,
    setShowSubInputs,
    handleAddNewInput,
  };
};

export default useBudgetDynamicInput;
