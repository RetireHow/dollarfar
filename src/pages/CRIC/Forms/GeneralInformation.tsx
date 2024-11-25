import { useState } from "react";
import CustomTooltip from "../../../components/UI/CustomTooltip";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";

type TOptions = {
  label: string;
  value: string;
};

const customStyles: StylesConfig<TOptions, boolean> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
    borderRadius: "5px",
    padding: "1px",
  }),
  control: (provided) => ({
    ...provided,
    border: "0px solid #D9D9D9",
    boxShadow: "none",
    "&:hover": {
      border: "0px solid #D9D9D9",
    },
    padding: "0px 0",
    borderRadius: "0",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#000" : provided.backgroundColor,
    color: state.isSelected ? "#fff" : provided.color,
    "&:hover": {
      backgroundColor: state.isSelected ? "#000" : provided.backgroundColor,
    },
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#000", // Change this to the color you want for the arrow
    "&:hover": {
      color: "#000", // Optional: change color on hover if desired
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#858585", // Set the placeholder color
    fontWeight: "normal",
  }),
};

const yearOptions = [
  { label: "1952", value: "1952" },
  { label: "1953", value: "1953" },
  { label: "1954", value: "1954" },
  { label: "1955", value: "1955" },
  { label: "1956", value: "1956" },
  { label: "1957", value: "1957" },
  { label: "1958", value: "1958" },
  { label: "1959", value: "1959" },
  { label: "1960", value: "1960" },
  { label: "1961", value: "1961" },
  { label: "1962", value: "1962" },
  { label: "1963", value: "1963" },
  { label: "1964", value: "1964" },
  { label: "1965", value: "1965" },
  { label: "1966", value: "1966" },
  { label: "1967", value: "1967" },
  { label: "1968", value: "1968" },
  { label: "1969", value: "1969" },
  { label: "1970", value: "1970" },
  { label: "1971", value: "1971" },
  { label: "1972", value: "1972" },
  { label: "1973", value: "1973" },
  { label: "1974", value: "1974" },
  { label: "1975", value: "1975" },
  { label: "1976", value: "1976" },
  { label: "1977", value: "1977" },
  { label: "1978", value: "1978" },
  { label: "1979", value: "1979" },
  { label: "1980", value: "1980" },
  { label: "1981", value: "1981" },
  { label: "1982", value: "1982" },
  { label: "1983", value: "1983" },
  { label: "1984", value: "1984" },
  { label: "1985", value: "1985" },
  { label: "1986", value: "1986" },
  { label: "1987", value: "1987" },
  { label: "1988", value: "1988" },
  { label: "1989", value: "1989" },
  { label: "1990", value: "1990" },
  { label: "1991", value: "1991" },
  { label: "1992", value: "1992" },
  { label: "1993", value: "1993" },
  { label: "1994", value: "1994" },
  { label: "1995", value: "1995" },
  { label: "1996", value: "1996" },
  { label: "1997", value: "1997" },
  { label: "1998", value: "1998" },
  { label: "1999", value: "1999" },
  { label: "2000", value: "2000" },
  { label: "2001", value: "2001" },
  { label: "2002", value: "2002" },
  { label: "2003", value: "2003" },
  { label: "2004", value: "2004" },
  { label: "2005", value: "2005" },
  { label: "2006", value: "2006" },
];

const monthOptions = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const annualIncomeOptions = [
  { label: "1000", value: "1000" },
  { label: "2000", value: "2000" },
  { label: "3000", value: "3000" },
  { label: "4000", value: "4000" },
  { label: "5000", value: "5000" },
  { label: "6000", value: "6000" },
  { label: "7000", value: "7000" },
  { label: "8000", value: "8000" },
  { label: "9000", value: "9000" },
  { label: "10000", value: "10000" },
  { label: "11000", value: "11000" },
  { label: "12000", value: "12000" },
  { label: "13000", value: "13000" },
  { label: "14000", value: "14000" },
  { label: "15000", value: "15000" },
  { label: "16000", value: "16000" },
  { label: "17000", value: "17000" },
  { label: "18000", value: "18000" },
  { label: "19000", value: "19000" },
  { label: "20000", value: "20000" },
  { label: "21000", value: "21000" },
  { label: "22000", value: "22000" },
  { label: "23000", value: "23000" },
  { label: "24000", value: "24000" },
  { label: "25000", value: "25000" },
  { label: "26000", value: "26000" },
  { label: "27000", value: "27000" },
  { label: "28000", value: "28000" },
  { label: "29000", value: "29000" },
  { label: "30000", value: "30000" },
  { label: "31000", value: "31000" },
  { label: "32000", value: "32000" },
  { label: "33000", value: "33000" },
  { label: "34000", value: "34000" },
  { label: "35000", value: "35000" },
  { label: "36000", value: "36000" },
  { label: "37000", value: "37000" },
  { label: "38000", value: "38000" },
  { label: "39000", value: "39000" },
  { label: "40000", value: "40000" },
  { label: "41000", value: "41000" },
  { label: "42000", value: "42000" },
  { label: "43000", value: "43000" },
  { label: "44000", value: "44000" },
  { label: "45000", value: "45000" },
  { label: "46000", value: "46000" },
  { label: "47000", value: "47000" },
  { label: "48000", value: "48000" },
  { label: "49000", value: "49000" },
  { label: "50000", value: "50000" },
  { label: "51000", value: "51000" },
  { label: "52000", value: "52000" },
  { label: "53000", value: "53000" },
  { label: "54000", value: "54000" },
  { label: "55000", value: "55000" },
  { label: "56000", value: "56000" },
  { label: "57000", value: "57000" },
  { label: "58000", value: "58000" },
  { label: "59000", value: "59000" },
  { label: "60000", value: "60000" },
  { label: "61000", value: "61000" },
  { label: "62000", value: "62000" },
  { label: "63000", value: "63000" },
  { label: "64000", value: "64000" },
  { label: "65000", value: "65000" },
  { label: "66000", value: "66000" },
  { label: "67000", value: "67000" },
  { label: "68000", value: "68000" },
  { label: "69000", value: "69000" },
  { label: "70000", value: "70000" },
  { label: "71000", value: "71000" },
  { label: "72000", value: "72000" },
  { label: "73000", value: "73000" },
  { label: "74000", value: "74000" },
  { label: "75000", value: "75000" },
  { label: "76000", value: "76000" },
  { label: "77000", value: "77000" },
  { label: "78000", value: "78000" },
  { label: "79000", value: "79000" },
  { label: "80000", value: "80000" },
  { label: "81000", value: "81000" },
  { label: "82000", value: "82000" },
  { label: "83000", value: "83000" },
  { label: "84000", value: "84000" },
  { label: "85000", value: "85000" },
  { label: "86000", value: "86000" },
  { label: "87000", value: "87000" },
  { label: "88000", value: "88000" },
  { label: "89000", value: "89000" },
  { label: "90000", value: "90000" },
  { label: "91000", value: "91000" },
  { label: "92000", value: "92000" },
  { label: "93000", value: "93000" },
  { label: "94000", value: "94000" },
  { label: "95000", value: "95000" },
  { label: "96000", value: "96000" },
  { label: "97000", value: "97000" },
  { label: "98000", value: "98000" },
  { label: "99000", value: "99000" },
  { label: "100000", value: "100000" },
  { label: "101000", value: "101000" },
  { label: "102000", value: "102000" },
  { label: "103000", value: "103000" },
  { label: "104000", value: "104000" },
  { label: "105000", value: "105000" },
  { label: "106000", value: "106000" },
  { label: "107000", value: "107000" },
  { label: "108000", value: "108000" },
  { label: "109000", value: "109000" },
  { label: "110000", value: "110000" },
  { label: "111000", value: "111000" },
  { label: "112000", value: "112000" },
  { label: "113000", value: "113000" },
  { label: "114000", value: "114000" },
  { label: "115000", value: "115000" },
  { label: "116000", value: "116000" },
  { label: "117000", value: "117000" },
  { label: "118000", value: "118000" },
  { label: "119000", value: "119000" },
  { label: "120000", value: "120000" },
  { label: "121000", value: "121000" },
  { label: "122000", value: "122000" },
  { label: "123000", value: "123000" },
  { label: "124000", value: "124000" },
  { label: "125000", value: "125000" },
  { label: "126000", value: "126000" },
  { label: "127000", value: "127000" },
  { label: "128000", value: "128000" },
  { label: "129000", value: "129000" },
  { label: "130000", value: "130000" },
  { label: "131000", value: "131000" },
  { label: "132000", value: "132000" },
  { label: "133000", value: "133000" },
  { label: "134000", value: "134000" },
  { label: "135000", value: "135000" },
  { label: "136000", value: "136000" },
  { label: "137000", value: "137000" },
  { label: "138000", value: "138000" },
  { label: "139000", value: "139000" },
  { label: "140000", value: "140000" },
  { label: "141000", value: "141000" },
  { label: "142000", value: "142000" },
  { label: "143000", value: "143000" },
  { label: "144000", value: "144000" },
  { label: "145000", value: "145000" },
  { label: "146000", value: "146000" },
  { label: "147000", value: "147000" },
  { label: "148000", value: "148000" },
  { label: "149000", value: "149000" },
  { label: "150000", value: "150000" },
  { label: "151000", value: "151000" },
  { label: "152000", value: "152000" },
  { label: "153000", value: "153000" },
  { label: "154000", value: "154000" },
  { label: "155000", value: "155000" },
  { label: "156000", value: "156000" },
  { label: "157000", value: "157000" },
  { label: "158000", value: "158000" },
  { label: "159000", value: "159000" },
  { label: "160000", value: "160000" },
  { label: "161000", value: "161000" },
  { label: "162000", value: "162000" },
  { label: "163000", value: "163000" },
  { label: "164000", value: "164000" },
  { label: "165000", value: "165000" },
  { label: "166000", value: "166000" },
  { label: "167000", value: "167000" },
  { label: "168000", value: "168000" },
  { label: "169000", value: "169000" },
  { label: "170000", value: "170000" },
  { label: "171000", value: "171000" },
  { label: "172000", value: "172000" },
  { label: "173000", value: "173000" },
  { label: "174000", value: "174000" },
  { label: "175000", value: "175000" },
  { label: "176000", value: "176000" },
  { label: "177000", value: "177000" },
  { label: "178000", value: "178000" },
  { label: "179000", value: "179000" },
  { label: "180000", value: "180000" },
  { label: "181000", value: "181000" },
  { label: "182000", value: "182000" },
  { label: "183000", value: "183000" },
  { label: "184000", value: "184000" },
  { label: "185000", value: "185000" },
  { label: "186000", value: "186000" },
  { label: "187000", value: "187000" },
  { label: "188000", value: "188000" },
  { label: "189000", value: "189000" },
  { label: "190000", value: "190000" },
  { label: "191000", value: "191000" },
  { label: "192000", value: "192000" },
  { label: "193000", value: "193000" },
  { label: "194000", value: "194000" },
  { label: "195000", value: "195000" },
  { label: "196000", value: "196000" },
  { label: "197000", value: "197000" },
  { label: "198000", value: "198000" },
  { label: "199000", value: "199000" },
  { label: "200000", value: "200000" },
];

const annualRetirementIncomeOptions = [
  { label: "1000", value: "1000" },
  { label: "2000", value: "2000" },
  { label: "3000", value: "3000" },
  { label: "4000", value: "4000" },
  { label: "5000", value: "5000" },
  { label: "6000", value: "6000" },
  { label: "7000", value: "7000" },
  { label: "8000", value: "8000" },
  { label: "9000", value: "9000" },
  { label: "10000", value: "10000" },
  { label: "11000", value: "11000" },
  { label: "12000", value: "12000" },
  { label: "13000", value: "13000" },
  { label: "14000", value: "14000" },
  { label: "15000", value: "15000" },
  { label: "16000", value: "16000" },
  { label: "17000", value: "17000" },
  { label: "18000", value: "18000" },
  { label: "19000", value: "19000" },
  { label: "20000", value: "20000" },
  { label: "21000", value: "21000" },
  { label: "22000", value: "22000" },
  { label: "23000", value: "23000" },
  { label: "24000", value: "24000" },
  { label: "25000", value: "25000" },
  { label: "26000", value: "26000" },
  { label: "27000", value: "27000" },
  { label: "28000", value: "28000" },
  { label: "29000", value: "29000" },
  { label: "30000", value: "30000" },
  { label: "31000", value: "31000" },
  { label: "32000", value: "32000" },
  { label: "33000", value: "33000" },
  { label: "34000", value: "34000" },
  { label: "35000", value: "35000" },
  { label: "36000", value: "36000" },
  { label: "37000", value: "37000" },
  { label: "38000", value: "38000" },
  { label: "39000", value: "39000" },
  { label: "40000", value: "40000" },
  { label: "41000", value: "41000" },
  { label: "42000", value: "42000" },
  { label: "43000", value: "43000" },
  { label: "44000", value: "44000" },
  { label: "45000", value: "45000" },
  { label: "46000", value: "46000" },
  { label: "47000", value: "47000" },
  { label: "48000", value: "48000" },
  { label: "49000", value: "49000" },
  { label: "50000", value: "50000" },
  { label: "51000", value: "51000" },
  { label: "52000", value: "52000" },
  { label: "53000", value: "53000" },
  { label: "54000", value: "54000" },
  { label: "55000", value: "55000" },
  { label: "56000", value: "56000" },
  { label: "57000", value: "57000" },
  { label: "58000", value: "58000" },
  { label: "59000", value: "59000" },
  { label: "60000", value: "60000" },
  { label: "61000", value: "61000" },
  { label: "62000", value: "62000" },
  { label: "63000", value: "63000" },
  { label: "64000", value: "64000" },
  { label: "65000", value: "65000" },
  { label: "66000", value: "66000" },
  { label: "67000", value: "67000" },
  { label: "68000", value: "68000" },
  { label: "69000", value: "69000" },
  { label: "70000", value: "70000" },
  { label: "71000", value: "71000" },
  { label: "72000", value: "72000" },
  { label: "73000", value: "73000" },
  { label: "74000", value: "74000" },
  { label: "75000", value: "75000" },
  { label: "76000", value: "76000" },
  { label: "77000", value: "77000" },
  { label: "78000", value: "78000" },
  { label: "79000", value: "79000" },
  { label: "80000", value: "80000" },
  { label: "81000", value: "81000" },
  { label: "82000", value: "82000" },
  { label: "83000", value: "83000" },
  { label: "84000", value: "84000" },
  { label: "85000", value: "85000" },
  { label: "86000", value: "86000" },
  { label: "87000", value: "87000" },
  { label: "88000", value: "88000" },
  { label: "89000", value: "89000" },
  { label: "90000", value: "90000" },
  { label: "91000", value: "91000" },
  { label: "92000", value: "92000" },
  { label: "93000", value: "93000" },
  { label: "94000", value: "94000" },
  { label: "95000", value: "95000" },
  { label: "96000", value: "96000" },
  { label: "97000", value: "97000" },
  { label: "98000", value: "98000" },
  { label: "99000", value: "99000" },
  { label: "100000", value: "100000" },
  { label: "101000", value: "101000" },
  { label: "102000", value: "102000" },
  { label: "103000", value: "103000" },
  { label: "104000", value: "104000" },
  { label: "105000", value: "105000" },
  { label: "106000", value: "106000" },
  { label: "107000", value: "107000" },
  { label: "108000", value: "108000" },
  { label: "109000", value: "109000" },
  { label: "110000", value: "110000" },
  { label: "111000", value: "111000" },
  { label: "112000", value: "112000" },
  { label: "113000", value: "113000" },
  { label: "114000", value: "114000" },
  { label: "115000", value: "115000" },
  { label: "116000", value: "116000" },
  { label: "117000", value: "117000" },
  { label: "118000", value: "118000" },
  { label: "119000", value: "119000" },
  { label: "120000", value: "120000" },
  { label: "121000", value: "121000" },
  { label: "122000", value: "122000" },
  { label: "123000", value: "123000" },
  { label: "124000", value: "124000" },
  { label: "125000", value: "125000" },
  { label: "126000", value: "126000" },
  { label: "127000", value: "127000" },
  { label: "128000", value: "128000" },
  { label: "129000", value: "129000" },
  { label: "130000", value: "130000" },
  { label: "131000", value: "131000" },
  { label: "132000", value: "132000" },
  { label: "133000", value: "133000" },
  { label: "134000", value: "134000" },
  { label: "135000", value: "135000" },
  { label: "136000", value: "136000" },
  { label: "137000", value: "137000" },
  { label: "138000", value: "138000" },
  { label: "139000", value: "139000" },
  { label: "140000", value: "140000" },
  { label: "141000", value: "141000" },
  { label: "142000", value: "142000" },
  { label: "143000", value: "143000" },
  { label: "144000", value: "144000" },
  { label: "145000", value: "145000" },
  { label: "146000", value: "146000" },
  { label: "147000", value: "147000" },
  { label: "148000", value: "148000" },
  { label: "149000", value: "149000" },
  { label: "150000", value: "150000" },
  { label: "151000", value: "151000" },
  { label: "152000", value: "152000" },
  { label: "153000", value: "153000" },
  { label: "154000", value: "154000" },
  { label: "155000", value: "155000" },
  { label: "156000", value: "156000" },
  { label: "157000", value: "157000" },
  { label: "158000", value: "158000" },
  { label: "159000", value: "159000" },
  { label: "160000", value: "160000" },
  { label: "161000", value: "161000" },
  { label: "162000", value: "162000" },
  { label: "163000", value: "163000" },
  { label: "164000", value: "164000" },
  { label: "165000", value: "165000" },
  { label: "166000", value: "166000" },
  { label: "167000", value: "167000" },
  { label: "168000", value: "168000" },
  { label: "169000", value: "169000" },
  { label: "170000", value: "170000" },
  { label: "171000", value: "171000" },
  { label: "172000", value: "172000" },
  { label: "173000", value: "173000" },
  { label: "174000", value: "174000" },
  { label: "175000", value: "175000" },
  { label: "176000", value: "176000" },
  { label: "177000", value: "177000" },
  { label: "178000", value: "178000" },
  { label: "179000", value: "179000" },
  { label: "180000", value: "180000" },
  { label: "181000", value: "181000" },
  { label: "182000", value: "182000" },
  { label: "183000", value: "183000" },
  { label: "184000", value: "184000" },
  { label: "185000", value: "185000" },
  { label: "186000", value: "186000" },
  { label: "187000", value: "187000" },
  { label: "188000", value: "188000" },
  { label: "189000", value: "189000" },
  { label: "190000", value: "190000" },
  { label: "191000", value: "191000" },
  { label: "192000", value: "192000" },
  { label: "193000", value: "193000" },
  { label: "194000", value: "194000" },
  { label: "195000", value: "195000" },
  { label: "196000", value: "196000" },
  { label: "197000", value: "197000" },
  { label: "198000", value: "198000" },
  { label: "199000", value: "199000" },
  { label: "200000", value: "200000" },
];

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

export default function GeneralInformation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [useLifeExpectancy, setUseLifeExpectancy] = useState<
    string | undefined
  >("");

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/canada-pension-plan");
  };

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">General Information</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>DOB</p>
            <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
          </div>
          <Select
            onChange={(value) => value}
            options={monthOptions}
            styles={customStyles}
            isMulti={false}
            placeholder="Month"
            className="rounded-md border-[1px] duration-300 border-[#838383] z-[70]"
          ></Select>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p className="opacity-0">For Nothing</p>
          </div>
          <Select
            onChange={(value) => value}
            options={yearOptions}
            styles={customStyles}
            isMulti={false}
            placeholder="Year"
            className="rounded-md border-[1px] duration-300 border-[#838383] z-[65]"
          ></Select>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Gender</p>
          <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
        </div>
        <Select
          onChange={(value) => value}
          options={genderOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[50]"
        ></Select>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>Current Annual Income of all Sources (Before Tax)</p>
          <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
        </div>
        <Select
          onChange={(value) => value}
          options={annualIncomeOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select Current Annual Income"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[40]"
        ></Select>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            What would you like to set as your annual retirement income goal
            (Net of tax, in today’s dollars)?
          </p>
          <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
        </div>
        <Select
          onChange={(value) => value}
          options={annualRetirementIncomeOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select Annual Retirement Income"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[30]"
        ></Select>
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Based on your current age and sex assigned at birth, your life
            expectancy is age 86. Would you like to use 86 as your estimate?
          </p>
          <CustomTooltip title="Choose how often you want to withdraw from your RRIF: Monthly, Yearly, or Weekly." />
        </div>
        <Select
          onChange={(option) => setUseLifeExpectancy(option?.value)}
          options={yesNoOptions}
          styles={customStyles}
          isMulti={false}
          placeholder="Select One"
          className="rounded-md border-[1px] duration-300 border-[#838383] z-[20]"
        ></Select>
      </div>

      {useLifeExpectancy == "No" && (
        <div>
          <div className="font-semibold mb-2">
            <p>
              Please enter the age you would like your retirement income to
              stop.
            </p>
          </div>
          <input
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
            type="number"
            placeholder="Enter age"
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="text-white p-[0.8rem] rounded-[10px] w-[200px] bg-black"
        >
          Next
        </button>
      </div>
    </section>
  );
}
