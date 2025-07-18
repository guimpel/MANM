
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RegistrationForm } from "@/components/auth/RegistrationForm";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <RegistrationForm />
            
            <div className="pt-4 border-t border-gray-200 mt-6 text-center">
              <p className="text-sm text-gray-500">
                Já tem uma conta?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
