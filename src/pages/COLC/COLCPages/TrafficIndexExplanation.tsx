import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TrafficIndexExplanation() {
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
      <h3 className="text-[1.5rem] font-semibold mb-[0.5rem] dark:text-darkModeHeadingTextColor">
        About Traffic Indexes
      </h3>
      <p className="mb-[1rem] dark:text-darkModeNormalTextColor">
        Please note that the indices provided in this section are based on
        user-contributed data. We aim to provide a platform for individuals to
        share their experiences and perceptions regarding traffic conditions in
        their respective cities. It is important to understand that these
        indices rely on subjective opinions and may not reflect official or
        comprehensive traffic statistics. However, they can still offer valuable
        insights into the overall traffic situation and commuting experiences in
        different locations. We encourage you to use these indices as a general
        reference and complement them with other reliable sources, if available,
        for a comprehensive understanding of traffic conditions.
      </p>

      <div className="space-y-[1rem] dark:text-darkModeNormalTextColor">
        <p>
          <span className="font-semibold">Traffic Index</span> is a composite
          measure that that considers factors such as commute time,
          dissatisfaction with time spent in traffic, CO2 emissions, and overall
          traffic system inefficiencies. It provides insights into the overall
          traffic conditions in a city.
        </p>
        <p>
          <span className="font-semibold">Time Index</span> represents the
          average one-way daily commute time required in minutes. It provides an
          indication of the time it takes to travel from one place to another
          within a city.
        </p>
        <p>
          <span className="font-semibold">Time Exp. Index</span> is an
          estimation of dissatisfaction due to long commute times that assumes
          that dissatisfaction with commute times increases exponentially with
          each minute after a one-way commute time is longer than 25 minutes.
        </p>
        <p>
          <span className="font-semibold">Inefficiency Index</span> estimates
          inefficiencies within a city's traffic system. High inefficiency
          typically indicates a preference for private car use over public
          transportation or excessively long commutes. It can be used as a
          traffic component measurement in economic analyses.
        </p>
        <p>
          <span className="font-semibold">CO2 Emission Index</span> estimates
          CO2 emissions attributable to daily commute by passenger. The
          measurement unit is grams for the return trip. To calculate an average
          CO2 emission in grams for one-way commute, divide this value by 2.
        </p>
        <p>
          Actual formulas to calculate indices are subject to change. At this
          moment, quite complex empirical formulas are used. Those formulas, as
          written in the Java programming language, are as follows:
        </p>
      </div>

      <div className="overflow-x-auto dark:text-darkModeNormalTextColor">
        <pre className="mt-5">
          <code>
            {`protected void calculateIndex() {
    index = new TrafficIndex();
    index.time = overall.getTimeOverall();
    double tooMuchTime = 0.0;
    if (index.time > 25.0) {
        tooMuchTime = index.time - 25;
    }
    index.timeExp = index.time + Math.pow(tooMuchTime, Math.E);
    double co2 = 0.0;
    co2 += overall.time_bus * 20.0; // bus produces 20g of CO2 per minute (for each passenger)
    co2 += overall.time_driving * 133.0; // car produces 133g of CO2 per minute (assumes only driver)
    co2 += overall.time_train * 10.0; // train produces 10g of CO2 per minute (for each passenger)
    co2 += overall.time_tram * 15.0; // tram produces 15g of CO2 per minute (for each passenger)
    co2 += overall.time_other * 10.0; // other produces 10g of CO2 per minute
    co2 += overall.time_motorbike * 80.0; // motorbike produces 80g of CO2 per minute
    index.co2 = 2 * co2; 

    index.main = index.time + Math.sqrt(index.timeExp) + Math.sqrt(index.co2) + Math.sqrt(index.inefficiency);
}`}
          </code>
        </pre>
      </div>
      <div className="space-y-[1rem] mt-5 dark:text-darkModeNormalTextColor">
        <p>
          To estimate number of trees to cover CO2 consumption, we assume 240
          days of commuting during the year and we are using the cite "A single
          tree can absorb CO2 at a rate of 48 lb. per year." - Arbor
          Enviromental Alliance. As java formula formula:
        </p>

        <p>double co2CommuteConsumptionYearly = 240 * index.co2;</p>
        <p>
          double treesNeededForCommute = (co2CommuteConsumptionYearly / 1000) /
          21.77; //each tree absorbs about 21.77kg of CO2
        </p>
      </div>
    </main>
  );
}
