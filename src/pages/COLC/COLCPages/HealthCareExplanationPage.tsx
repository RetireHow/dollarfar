import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HealthCareExplanationPage() {
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="m-5">
      <div className="mb-[1rem] dark:text-darkModeHeadingTextColor">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>
      <h3 className="text-[1.5rem] font-semibold mb-3 dark:text-darkModeHeadingTextColor">
        About Health Care Indexes
      </h3>
      <div className="space-y-[0.5rem] dark:text-darkModeNormalTextColor">
        <p>
          The data in this section is derived from surveys conducted by visitors
          to our website. Questions in these surveys are designed to be similar
          to many scientific and government surveys.
        </p>
        <p>
          Each entry in the survey is assigned a number within the range of -2
          to +2, where -2 represents a strongly negative perception and +2
          represents a strongly positive perception.
        </p>
        <p>
          To ensure data accuracy, we have implemented filtering measures to
          identify and exclude potential spam from our calculations. Our
          algorithms identify users who exhibit spam-like behavior and their
          inputs are not considered in the calculations. This helps maintain the
          integrity of the data and provide reliable results.
        </p>
        <p>
          To make survey results easier to interpret for our users, we present
          them on a scale ranging from 0 to 100. This scale allows for a clear
          and straightforward understanding of the data, enhancing user
          experience and facilitating meaningful comparisons.
        </p>
        <p>
          Our current index, which is continuously updated, is generated using
          data up to 36 months old. We carefully select cities for inclusion in
          the index based on a minimum number of contributors to ensure
          statistical significance. Additionally, our semiannual index is
          calculated twice a year by incorporating the latest data into the
          historical view.
        </p>
        <p>
          <span className="font-semibold">Health Care Index</span> is an
          estimation that evaluates the overall quality of the healthcare
          system, including factors such as healthcare professionals, equipment,
          staff, doctors, and costs. It provides an assessment of the healthcare
          infrastructure, services, and resources available in a specific
          location.
        </p>
        <p>
          <span className="font-semibold">Health Care Exp Index</span> is
          designed to reflect the quality of a healthcare system by emphasizing
          the positive aspects more significantly through an exponential
          increase while also emphasizing the native aspects more significantly.
        </p>
        <p>
          It's important to note that the Health Care Index provided by Numbeo
          is based on user-contributed data and perceptions, which may vary.
          While it could be biased, the index is a comparative tool to evaluate
          and compare healthcare systems across different cities or countries,
          assisting in understanding the healthcare landscape.
        </p>
        <p>
          Actual formulas to calculate indices are subject to change. At this
          moment, quite complex empirical formulas are used. Those formulas, as
          written in the Java programming language, are as follows:
        </p>
        <p>
          //assumes all input values are in the range [-2 , 2], where -2 means
          very low and 2 means very high @Override
        </p>
      </div>
      <div className="overflow-x-auto dark:text-darkModeNormalTextColor">
        <pre>
          <code>
            {`protected void calculateIndex() {
    index = new HealthCareIndex();
    double overall = 0.0;
    overall += getIndexPartPreCalc(skill_and_competency);
    overall += getIndexPartPreCalc(speed);
    overall += getIndexPartPreCalc(modern_equipment);
    overall += getIndexPartPreCalc(accuracy_and_completeness);
    overall += getIndexPartPreCalc(friendliness_and_courtesy);
    overall += getIndexPartPreCalc(responsiveness_waitings);
    overall += getIndexPartPreCalc(location);
    overall += 2 * getIndexPartPreCalc(cost);
    index.main = overall / 9;


    double expScale = 0.0;
    expScale += getIndexPartPreCalcExpScaleStandard(skill_and_competency);
    expScale += getIndexPartPreCalcExpScaleStandard(speed);
    expScale += getIndexPartPreCalcExpScaleStandard(modern_equipment);
    expScale += getIndexPartPreCalcExpScaleStandard(accuracy_and_completeness);
    expScale += getIndexPartPreCalcExpScaleStandard(friendliness_and_courtesy);
    expScale += getIndexPartPreCalcExpScaleStandard(responsiveness_waitings);
    expScale += getIndexPartPreCalcExpScaleStandard(location);
    expScale += 2 * getIndexPartPreCalcExpScaleStandard(cost);
    index.exp = calcScaleStandardIndexFromSum(expScale, 9);
  }

  protected double getIndexPartPreCalc(double internalValue) {
    return (internalValue + 2) * 25;
  }

  protected double getIndexPartPreCalcExpScaleStandard(double internalValue) {
    return getIndexPartPreCalcExpScale(internalValue, Math.E);
  }

  protected double getIndexPartPreCalcExpScale(double internalValue, double exp) {
    return Math.pow((internalValue + 2) * 25, exp);
  }

  protected double calcScaleStandardIndexFromSum(double scaleSum, int elems) {
    return Math.pow(scaleSum / elems, 1 / (Math.E * 8.8 / 10));
  }`}
          </code>
        </pre>
      </div>
    </main>
  );
}
