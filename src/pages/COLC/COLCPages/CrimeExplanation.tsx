import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CrimeExplanation() {
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
      <h3 className="font-semibold text-[1.5rem] mb-[0.5rem]">
        About Crime Indexes
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
          <span className="font-semibold">Crime Index</span> is an estimation of
          the overall level of crime in a given city or country. We consider
          crime levels lower than 20 as very low, crime levels between 20 and 40
          as low, crime levels between 40 and 60 as moderate, crime levels
          between 60 and 80 as high, and crime levels higher than 80 as very
          high.
        </p>

        <p>
          <span className="font-semibold">Safety index</span> is, on the other
          way, quite the opposite of the crime index. If the city has a high
          safety index, it is considered very safe.
        </p>

        <p>The Crime Index takes into account survey responses about:</p>

        <ul className="list-decimal ml-8">
          <li>General perception of crime levels</li>
          <li>
            Perceived safety: Survey responses from residents and visitors
            regarding their feelings of safety while walking during daylight and
            at night.
          </li>
          <li>
            {" "}
            Concerns about specific crimes: Survey questions about worries
            regarding mugging, robbery, car theft, physical attacks by
            strangers, harassment in public places, and discrimination based on
            factors like skin color, ethnicity, gender, or religion.
          </li>

          <li>
            Property crimes: Assessment of the extent of property-related
            crimes, such as burglary, theft, vandalism, etc.
          </li>

          <li>
            Violent crimes: Evaluation of the perception of violent crimes,
            including assault, homicide, sexual offenses, etc.
          </li>
        </ul>
        <p>
          It's important to note that the Crime Index provided by Numbeo is
          based on user-contributed data and perceptions, which may differ from
          official government statistics. The index serves as a comparative tool
          to assess the relative safety of different cities or countries,
          helping individuals make informed decisions and understand the crime
          landscape in specific locations.
        </p>

        <p>Is this much less accurate than governmental statistics?</p>

        <p>
          In some countries, governments have detailed statistics based on the
          number of reported crimes per capita. While these surveys are usually
          particularly good for comparing crime between two cities within the
          same country, they may not be as suitable for cross-country
          comparisons due to the following reasons:
        </p>

        <ul className="list-disc ml-8">
          <li>
            People in some countries are more likely to report a crime than in
            other countries.
          </li>
          <li>Data could be forged by governmental institutions.</li>
          <li>Data might not available in many parts of the world.</li>
        </ul>

        <p>
          {" "}
          Actual formulas to calculate indices are subject to change. At this
          moment, quite complex empirical formulas are used. Those formulas, as
          written in the Java programming language, are as follows:
        </p>

        <p>
          //assumes all input values are in the range [-2 , 2], where -2 means
          very low and 2 means very high
        </p>
        <div className="overflow-x-auto">
          <pre>
            <code>
              {`   protected void calculateIndex() {
    index = new CrimeIndex();
    double overall = 0.0;

    overall += 3 * getIndexPartPreCalc(level_of_crime);
    overall += getIndexPartPreCalc(crime_increasing);
    overall += getIndexPartPreCalc(-safe_alone_daylight);
    overall += getIndexPartPreCalc(-safe_alone_night);
    overall += getIndexPartPreCalc(worried_home_broken);
    overall += getIndexPartPreCalc(worried_mugged_robbed);
    overall += getIndexPartPreCalc(worried_car_stolen);
    overall += getIndexPartPreCalc(worried_things_car_stolen);
    overall += getIndexPartPreCalc(worried_attacked);
    overall += getIndexPartPreCalc(worried_insulted);
    overall += getIndexPartPreCalc(worried_skin_ethnic_religion);
    overall += getIndexPartPreCalc(problem_drugs);
    overall += getIndexPartPreCalc(problem_property_crimes);
    overall += getIndexPartPreCalc(problem_violent_crimes);
    overall += getIndexPartPreCalc(problem_corruption_bribery);

    index.main = overall / 17;
    index.exp = index.main / 2 + ((index.main > 20) ? Math.pow(index.main - 20, 1.65) : 0.0);

    double safety = 0.0;
    safety += 3 * getIndexPartPreCalc(-level_of_crime);
    safety += getIndexPartPreCalc(-crime_increasing);
    safety += getIndexPartPreCalc(safe_alone_daylight);
    safety += getIndexPartPreCalc(safe_alone_night);
    safety += getIndexPartPreCalc(-worried_home_broken);
    safety += getIndexPartPreCalc(-worried_mugged_robbed);
    safety += getIndexPartPreCalc(-worried_car_stolen);
    safety += getIndexPartPreCalc(-worried_things_car_stolen);
    safety += getIndexPartPreCalc(-worried_attacked);
    safety += getIndexPartPreCalc(-worried_insulted);
    safety += getIndexPartPreCalc(-worried_skin_ethnic_religion);
    safety += getIndexPartPreCalc(-problem_drugs);
    safety += getIndexPartPreCalc(-problem_property_crimes);
    safety += getIndexPartPreCalc(-problem_violent_crimes);
    safety += getIndexPartPreCalc(-problem_corruption_bribery);

    index.safety = safety / 17;
  }

  protected double getIndexPartPreCalc(double internalValue) {
    return (internalValue + 2) * 25;
  }`}
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
