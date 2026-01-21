import { AuthProvider } from "./AuthContext";
import { DocumentProvider } from "./DocumentContext";
import { TaskProvider } from "./TaskContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <DocumentProvider>
      <TaskProvider>{children}</TaskProvider>
    </DocumentProvider>
  </AuthProvider>
);
