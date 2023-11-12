interface DashboardCardProps {
  heading: string;
  value: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({ heading, value }) => {
  return (
    <div className="bg-white rounded-lg p-10 shadow-lg w-full flex flex-col items-center justify-center gap-3">
      <h2 className="text-xl capitalize">{heading}</h2>
      <p className="text-lg">{value}</p>
    </div>
  );
};

export default DashboardCard;
