import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PollutionIndicesExplanation() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="m-5">
      <div className="mb-[1rem]">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>
      <h3 className="font-semibold text-[1.5rem] mb-[1rem]">
        About Pollution Indices
      </h3>
      <div className="space-y-[0.5rem]">
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
          Most of our data are based on perceptions (opinions) from visitors of
          this website. For the pollution section, we include relevant data from
          World Health Organization and other institutions if we find it
          helpful. Please consult our Terms of use for details.
        </p>

        <p>
          <span className="font-semibold">Pollution Index</span> provides an
          estimation of overall pollution levels in cities worldwide. It
          considers factors such as air and water pollution, garbage disposal,
          cleanliness, noise and light pollution, green spaces, and comfort in
          relation to pollution. Numbeo assigns the highest weight to air
          pollution, followed by water pollution and accessibility, which are
          considered the two primary pollution factors. Other types of pollution
          receive a smaller weight in the index.
        </p>

        <p>
          <span className="font-semibold">Pollution Exp Scale</span> uses an
          exponential function to show very high numbers for very polluted
          cities and very low numbers for unpolluted cities.
        </p>

        <p>
          Actual formulas to calculate indices are subject to change. At this
          moment, quite complex empirical formulas are used. Those formulas, as
          written in the Java programming language, are as follows:
        </p>

        <div className="overflow-x-auto">
          <pre>
            <code>
              {`public void calculateIndex() {
     //assumes air_quality and other entries from user are in the range [-2, 2], where -2 means perceived as very low, and +2 means very high
     //PollutionDbEntry.IS_POLLUTION_AIR_QUALITY and similar are constant variables which are either -1 and 1; i.e. IS_POLLUTION_AIR_QUALITY = -1.0
     //These constant variables in PollutionDbEntry class are 1 for values which represent pollutions and -1 for values which represent opposite (purity, cleanliness)
     index = new PollutionIndex();
     double overall = 0.0;
     overall += 7 * getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_AIR_QUALITY * air_quality);
     overall += 2 * getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_DRINKING_WATER_QUALITY_ACCESSIBILITY * drinking_water_quality_accessibility);
     overall += 2 * getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_WATER_POLLUTION * water_pollution);
     overall += getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_GARBAGE_DISPOSAL_SATISFACTION * garbage_disposal_satisfaction);
     overall += getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_CLEAN_AND_TIDY * clean_and_tidy);
     overall += getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_NOISE_AND_LIGHT_POLLUTION * noise_and_light_pollution);
     overall += getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_GREEN_AND_PARKS_QUALITY * green_and_parks_quality);
     overall += 2 * getIndexPartPreCalc(PollutionDbEntry.IS_POLLUTION_COMFORTABLE_TO_SPEND_TIME * comfortable_to_spend_time);

     double overallExpScale = 0.0;
     overallExpScale += 7 * getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_AIR_QUALITY * air_quality);
     overallExpScale += 2 * getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_DRINKING_WATER_QUALITY_ACCESSIBILITY * drinking_water_quality_accessibility);
     overallExpScale += 2 * getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_WATER_POLLUTION * water_pollution);
     overallExpScale += getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_GARBAGE_DISPOSAL_SATISFACTION * garbage_disposal_satisfaction);
     overallExpScale += getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_CLEAN_AND_TIDY * clean_and_tidy);
     overallExpScale += getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_NOISE_AND_LIGHT_POLLUTION * noise_and_light_pollution);
     overallExpScale += getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_GREEN_AND_PARKS_QUALITY * green_and_parks_quality);
     overallExpScale += 2 * getIndexPartPreCalcExpScaleStandard(PollutionDbEntry.IS_POLLUTION_COMFORTABLE_TO_SPEND_TIME * comfortable_to_spend_time);

     index.main = overall / 14.5; //max 17
     index.expScale = calcScaleStandardIndexFromSum(overallExpScale, 12);
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
      </div>
    </main>
  );
}
