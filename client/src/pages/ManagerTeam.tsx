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
import { Input } from "../components/ui/input";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "../components/ui/chart";

const ManagerTeam = () => {
  const { engineers } = useEngineerContext();

  const [skillQuery, setSkillQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");

  //Filter engineers based on skill and department
  const filteredEngineers = useMemo(() => {
    return engineers.filter((eng) => {
      const skillMatch = eng.skills.some((skill) =>
        skill.toLowerCase().includes(skillQuery.toLowerCase())
      );

      const departmentMatch = eng.department
        ?.toLowerCase()
        .includes(departmentQuery.toLowerCase());

      return skillMatch && departmentMatch;
    });
  }, [engineers, skillQuery, departmentQuery]);

  // ✅ Add this above return
  const chartData = filteredEngineers.map((engineer) => {
    const allocated = engineer.totalAllocated ?? 0;
    const available =
      engineer.availableCapacity ?? engineer.maxCapacity - allocated;

    return {
      name: engineer.name,
      allocated,
      available,
    };
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Team Overview</h1>
      <p className="text-muted-foreground mb-6">
        Track engineer workload and capacity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/*Skill Search */}
        <Input
          placeholder="Search by skill..."
          value={skillQuery}
          onChange={(e) => setSkillQuery(e.target.value)}
        />

        {/*Department Search */}
        <Input
          placeholder="Search by department..."
          value={departmentQuery}
          onChange={(e) => setDepartmentQuery(e.target.value)}
        />
      </div>

      <Separator className="mb-6" />

      {filteredEngineers.length === 0 ? (
        <p className="text-muted-foreground">No engineers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEngineers.map((engineer) => {
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
      {/* ✅ Utilization Chart */}
      {filteredEngineers.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Team Utilization</h2>
          <div className="bg-white p-4 border rounded shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip />
                <Bar dataKey="allocated" fill="#3b82f6" name="Allocated %" />
                <Bar dataKey="available" fill="#10b981" name="Available %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTeam;
