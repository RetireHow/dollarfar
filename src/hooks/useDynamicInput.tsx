import { useState, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  updateAsset,
  updateLiabilities,
} from "../redux/features/NWSlice/NWSlice";
import { removeSpacesFromKey } from "../utils/removeSpaceFromKey";
import {
  Assets,
  Liabilities,
  LiabilityCategoryKeys,
} from "../redux/features/NWSlice/NWTypes";

// Define a type for the dynamic input items
type DynamicInputItem = {
  id: number;
  label: string;
  value: string;
};

const useDynamicInput = ({
  category,
  type,
  dynamicFieldTitleRef,
}: {
  category: keyof Assets | keyof Liabilities;
  type?: string;
  dynamicFieldTitleRef: MutableRefObject<HTMLInputElement | null>;
}) => {
  const dispatch = useDispatch();
  const [newInput, setNewInput] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });
  const [dynamicInputs, setDynamicInputs] = useState<DynamicInputItem[]>([]);
  const [showNewInputField, setShowNewInputField] = useState(false);
  const [showSubInputs, setShowSubInputs] = useState(
    category == "property" ? true : false
  );

  const handleSaveInput = () => {
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
        type
          ? updateLiabilities({
              category: category as keyof Liabilities,
              key: removeSpacesFromKey(
                newInput.label
              ) as keyof LiabilityCategoryKeys,
              value: Number(newInput.value),
            })
          : updateAsset({
              category: category as keyof Assets,
              key: removeSpacesFromKey(newInput.label),
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
    id: number
  ) => {
    const { value, name } = e.target;
    dispatch(
      type
        ? updateLiabilities({
            category: category as keyof Liabilities,
            key: name as keyof LiabilityCategoryKeys,
            value: Number(value),
          })
        : updateAsset({
            category: category as keyof Assets,
            key: name,
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

export default useDynamicInput;
