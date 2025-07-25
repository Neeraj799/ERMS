import ProjectModal from "../components/Modal/ProjectModal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useProjectContext } from "../context/ProjectContext";

const Manager = () => {
  const { projects } = useProjectContext();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between">
        <div className="text-3xl font-bold">Manager Dashboard</div>
        <div className="">
          <ProjectModal />
        </div>
      </div>
      <p className="text-muted-foreground mb-2">
        Overview of all your projects
      </p>

      <Separator className="mb-6" />

      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project._id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-gray-700">{project.description}</p>
                <p>
                  <strong>Skills:</strong> {project.requiredSkills.join(", ")}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Team Size:</strong> {project.teamSize}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manager;
