import ShiftCalendar from "../components/shifts/ShiftCalendar";
import { useQuery } from "@tanstack/react-query";
import { getShifts } from "../api/shifts";

const Shifts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shifts"],
    queryFn: getShifts,
  });

  if (isLoading) return <progress className="progress w-56"></progress>;

  if (isError)
    return <div className="alert alert-error">Failed to load shifts.</div>;
  /* const [shifts, setShifts] = useState<typeof mockShifts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await getMockShifts();
        setShifts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }*/

  return (
    <div>
      <ShiftCalendar shifts={data} />
    </div>
  );
};

export default Shifts;
