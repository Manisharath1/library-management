import { useEffect, useState } from "react";
import DashboardCard from "./dashboardcard";
import { DashboardDetails } from "@/model/DashboardDetails";
import { getDashboardDetails } from "../services/dashboardservice";

const Dashboard = () => {
  const [details, setDetails] = useState<DashboardDetails>({});

  useEffect(() => {
    try {
      getDashboardDetails().then((response) => setDetails(response.data));
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <>
      <section className="flex justify-between items-center gap-10 p-5">
        {Object.keys(details).map((detail) => (
          <DashboardCard
            heading={detail.replace(/([A-Z])/g, " $1")}
            value={details[detail]}
          />
        ))}
      </section>
    </>
  );
};

export default Dashboard;
