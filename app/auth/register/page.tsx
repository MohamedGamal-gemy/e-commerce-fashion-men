import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  return (
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
  );
}
