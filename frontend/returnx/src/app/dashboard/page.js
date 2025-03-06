import { ReturnStats } from "@/components/ReturnStats";
import { ReturnsChart } from "@/components/ReturnsChart";
import { TopReturnedProducts } from "@/components/TopReturnedProducts";
import { GenerateActionsButton } from "@/components/GenerateActionsButton";

export default async function DashboardPage() {
  const [data, setData] = useState(null);

  const res = await fetch("/api/dashboardData");
  const result = await res.json();
  setData(result);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-500">Return Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReturnsChart chartData={data.chartData} />
        </div>
        <div className="lg:col-span-1">
          <TopReturnedProducts products={data.topReturnedProducts} />
        </div>
      </div>
      
      <ReturnStats stats={data.stats} />
      
      <div className="flex justify-center mt-8">
        <GenerateActionsButton />
      </div>
    </div>
  );
}