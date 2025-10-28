import AuthLayout from "../layout";
import AuthForm from "../components/AuthForm";
import AuthCard from "../components/AuthCard";

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign In"
      subtitle="Welcome back! Please enter your credentials."
      asideLink={{
        href: "/auth/register",
        label: "Don't have an account? Register",
      }}
    >
      <AuthForm mode="login" />
    </AuthCard>
  );
}
