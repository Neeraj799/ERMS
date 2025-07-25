import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useEngineerContext } from "../context/EngineerContext";

const EngineerProfile = () => {
  const { currentUser, fetchUser } = useUserContext();
  const { updateEngineerProfile } = useEngineerContext();
  const [formData, setFormData] = useState<{
    name: string;
    skills: string;
    seniority: "junior" | "mid" | "senior" | "";
    department: string;
    maxCapacity: number;
  }>({
    name: "",
    skills: "",
    seniority: "",
    department: "",
    maxCapacity: 100,
  });

  useEffect(() => {
    if (currentUser?.role === "engineer") {
      setFormData({
        name: currentUser.name || "",
        skills: currentUser.skills?.join(", ") || "",
        seniority: currentUser?.seniority || "",
        department: currentUser?.department || "",
        maxCapacity: currentUser?.maxCapacity || 100,
      });
    }
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxCapacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !currentUser._id) {
      toast.error("User ID is missing");
      return;
    }

    try {
      await updateEngineerProfile(currentUser?._id, {
        ...formData,

        skills: formData.skills.split(",").map((s) => s.trim()),
      });
      toast.success("Profile updated");
      fetchUser();
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (currentUser?.role !== "engineer") {
    return <p className="text-muted-foreground">Not authorized</p>;
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Update Engineer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Skills (comma separated)
          </label>
          <Input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Seniority</label>
          <select
            name="seniority"
            value={formData.seniority}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Department</label>
          <Input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Max Capacity (%)</label>
          <select
            name="maxCapacity"
            value={formData.maxCapacity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={100}>100</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default EngineerProfile;
