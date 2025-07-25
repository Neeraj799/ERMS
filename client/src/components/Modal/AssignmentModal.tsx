import React, { useEffect, useState } from "react";
import { useAssignmentContext } from "../../context/AssignmentContext";
import { useEngineerContext } from "../../context/EngineerContext";
import { useProjectContext } from "../../context/ProjectContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface AssignmentFormData {
  engineerId: string;
  projectId: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
}

interface AssignmentModalProps {
  initialData?: AssignmentFormData;
  onSubmit?: (data: AssignmentFormData) => Promise<void>;
  triggerLabel?: string;
}
const AssignmentModal = ({
  initialData,
  onSubmit,
  triggerLabel = "+ New Assignment",
}: AssignmentModalProps) => {
  const { createAssignment } = useAssignmentContext();
  const { engineers } = useEngineerContext();
  const { projects } = useProjectContext();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<AssignmentFormData>({
    engineerId: "",
    projectId: "",
    allocationPercentage: 0,
    startDate: "",
    endDate: "",
    role: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setOpen(true); // ✅ Open modal when editing
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be before start date.");
      return;
    }
    if (onSubmit) {
      await onSubmit(formData);
    } else {
      await createAssignment(formData);
    }

    setFormData({
      engineerId: "",
      projectId: "",
      allocationPercentage: 0,
      startDate: "",
      endDate: "",
      role: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button className="mb-4">{triggerLabel}</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogTitle>
          {initialData ? "Update Assignment" : "Create Assignment"}{" "}
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Engineer</Label>
            <Select
              value={formData.engineerId}
              onValueChange={(val) =>
                setFormData({ ...formData, engineerId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Engineer" />
              </SelectTrigger>
              <SelectContent>
                {engineers.map((eng) => (
                  <SelectItem key={eng._id} value={eng._id}>
                    {eng.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Project</Label>
            <Select
              value={formData.projectId}
              onValueChange={(val) =>
                setFormData({ ...formData, projectId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj) => (
                  <SelectItem key={proj._id} value={proj._id}>
                    {proj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Role</Label>
            <Input
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Allocation %</Label>
            <Input
              type="number"
              min={1}
              max={100}
              value={formData.allocationPercentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allocationPercentage: Number(e.target.value),
                })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">{initialData ? "Update" : "Assign"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentModal;
