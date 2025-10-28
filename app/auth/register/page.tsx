import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../layout";

export default function RegisterPage() {
  return (
    // <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Join our community in seconds!"
        asideLink={{
          href: "/auth/login",
          label: "Already have an account? Sign in",
        }}
      >
        <AuthForm mode="register" />
      </AuthCard>
    // </AuthLayout>
  );
}
