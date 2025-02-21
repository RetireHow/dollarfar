import CustomCollapese from "../../components/UI/CustomCollapese";

export default function CostTable() {
  return (
    <section className="mt-5">
      <h3 className="md:text-[1.5rem] text-[18px] font-bold md:mb-2 mb-3">
        Cost Difference
      </h3>

      <div className="overflow-x-auto shadow-lg">
        <div className="min-w-[800px]">
          <CustomCollapese />
        </div>
      </div>
    </section>
  );
}
