
interface RequestStatusIndicatorProps {
  status: string;
}

const RequestStatusIndicator = ({ status }: RequestStatusIndicatorProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500";
      case "in-progress":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return <div className={`h-3 w-3 rounded-full ${getStatusColor(status)}`}></div>;
};

export default RequestStatusIndicator;
