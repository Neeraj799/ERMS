import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useAssignmentContext } from "../context/AssignmentContext";
import { useUserContext } from "../context/UserContext";
import { format } from "date-fns";

const Engineer = () => {
  const { currentUser } = useUserContext();
  const { assignments } = useAssignmentContext();

  if (!currentUser) return <p>Loading...</p>;

  if (currentUser.role !== "engineer") {
    return <p>Access denied. Only engineers can view this page.</p>;
  }

  const myAssignments = assignments.filter((a) => {
    return typeof a.engineerId === "object"
      ? a.engineerId._id === currentUser._id
      : a.engineerId === currentUser._id;
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
      <p className="text-muted-foreground mb-6">
        View your current and upcoming projects
      </p>

      <Separator className="mb-6" />

      {myAssignments.length === 0 ? (
        <p className="text-muted-foreground">No assignments found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {myAssignments.map((assignment) => (
            <Card key={assignment._id}>
              <CardHeader>
                <CardTitle>
                  {typeof assignment.projectId === "object"
                    ? assignment.projectId.name
                    : "Unknown Project"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <strong>Role:</strong> {assignment.role}
                </p>
                <p>
                  <strong>Allocation:</strong> {assignment.allocationPercentage}
                  %
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {format(new Date(assignment.startDate), "dd MMM yyyy")}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {format(new Date(assignment.endDate), "dd MMM yyyy")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Engineer;
