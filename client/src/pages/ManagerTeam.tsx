import { useEngineerContext } from "../context/EngineerContext";
import { Separator } from "../components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

const ManagerTeam = () => {
  const { engineers } = useEngineerContext();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Team Overview</h1>
      <p className="text-muted-foreground mb-6">
        Track engineer workload and capacity
      </p>

      <Separator className="mb-6" />

      {engineers.length === 0 ? (
        <p className="text-muted-foreground">No engineers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engineers.map((engineer) => {
            const allocated = engineer.totalAllocated ?? 0;
            const available =
              engineer.availableCapacity ?? engineer.maxCapacity - allocated;

            return (
              <Card key={engineer._id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {engineer.name}
                    <Badge variant="secondary" className="capitalize text-xs">
                      {engineer.seniority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-700">
                    <strong>Skills:</strong>{" "}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {engineer.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-100 text-blue-700 capitalize"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    <strong>Department:</strong> {engineer.department}
                  </p>

                  <div>
                    <p className="text-sm mb-1">
                      <strong>Allocation:</strong> {allocated}% allocated,{" "}
                      {available}% available
                    </p>
                    <Progress value={allocated} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManagerTeam;
