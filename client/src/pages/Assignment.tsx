import { useState } from "react";
import AssignmentModal from "../components/Modal/AssignmentModal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useAssignmentContext } from "../context/AssignmentContext";
import { format } from "date-fns";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";

interface Assignment {
  _id: string;
  engineerId: { name: string } | string;
  projectId: { name: string } | string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
}

type EditFormData = {
  _id: string;
  engineerId: string;
  projectId: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
};

const Assignment = () => {
  const { assignments, updateAssignment, deleteAssignment } =
    useAssignmentContext();

  const [editData, setEditData] = useState<EditFormData | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteAssignment(id);
      toast.success("Assignment deleted");
    } catch {
      toast.error("Failed to delete assignment");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">Assignments</h1>

          <p className="text-muted-foreground mb-6">
            Overview of all current engineer assignments
          </p>
        </div>

        <AssignmentModal triggerLabel="+ New Assignment" />
      </div>

      <Separator className="mb-6" />

      {assignments.length === 0 ? (
        <p className="text-muted-foreground">No assignments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment._id}>
              <CardHeader>
                <CardTitle>
                  {/* ✅ Display engineer and project name */}
                  {typeof assignment.engineerId === "object" &&
                  "name" in assignment.engineerId
                    ? assignment.engineerId.name
                    : "Unknown Engineer"}{" "}
                  -{" "}
                  {typeof assignment.projectId === "object" &&
                  "name" in assignment.projectId
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

                <Button
                  className="mt-2 mr-6"
                  variant="outline"
                  onClick={() => {
                    setEditData({
                      _id: assignment._id, // ✅ ADD THIS
                      engineerId:
                        typeof assignment.engineerId === "object"
                          ? assignment.engineerId._id
                          : assignment.engineerId,
                      projectId:
                        typeof assignment.projectId === "object"
                          ? assignment.projectId._id
                          : assignment.projectId,
                      allocationPercentage: assignment.allocationPercentage,
                      startDate: assignment.startDate.slice(0, 10),
                      endDate: assignment.endDate.slice(0, 10),
                      role: assignment.role,
                    });

                    setEditModalOpen(true);
                  }}
                >
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={() => handleDelete(assignment._id)}
                      >
                        Yes, delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {editData && editModalOpen && (
        <AssignmentModal
          initialData={editData}
          triggerLabel=""
          onSubmit={async (data) => {
            if (!editData?._id) return;
            await updateAssignment(editData._id, data);
            setEditModalOpen(false);
            setEditData(null);
          }}
        />
      )}
      {/* ✅ Assignment Timeline Section (Improved) */}
      <Separator className="my-10" />
      <h2 className="text-2xl font-semibold mb-4">Assignment Timeline</h2>
      <div className="overflow-x-auto whitespace-nowrap flex gap-4 py-4 scroll-smooth">
        {assignments.map((assignment) => {
          const engineerName =
            typeof assignment.engineerId === "object" &&
            "name" in assignment.engineerId
              ? assignment.engineerId.name
              : "Engineer";

          const projectName =
            typeof assignment.projectId === "object" &&
            "name" in assignment.projectId
              ? assignment.projectId.name
              : "Project";

          return (
            <div
              key={assignment._id}
              className="inline-flex flex-col bg-white shadow-md border rounded-xl px-4 py-3 min-w-[200px] hover:shadow-lg transition-all duration-200"
            >
              <span className="text-sm text-muted-foreground font-medium mb-1">
                👨‍💻 {engineerName}
              </span>
              <span className="text-sm font-semibold mb-2 text-primary">
                📁 {projectName}
              </span>
              <div className="text-xs text-muted-foreground mb-1">
                📅 {format(new Date(assignment.startDate), "dd MMM")} —{" "}
                {format(new Date(assignment.endDate), "dd MMM")}
              </div>
              <div className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full w-fit">
                {assignment.role}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Assignment;
