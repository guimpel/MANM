
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Car, 
  LogIn, 
  User,
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { publicRoutes, howItWorksRoutes, serviceRoutes, aboutRoutes } from "@/lib/routes";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="man-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={publicRoutes.home.path} className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">I<span className="text-accent">MOVAN</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-man-gray hover:text-primary transition-colors">
                Como Funciona <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to={howItWorksRoutes.forProviders.path}>Para Fornecedores</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={howItWorksRoutes.forFleets.path}>Para Frotistas</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-man-gray hover:text-primary transition-colors">
                Serviços <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to={serviceRoutes.electrical.path}>Elétrica</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={serviceRoutes.mechanical.path}>Mecânica</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={serviceRoutes.towing.path}>Reboque</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={serviceRoutes.parts.path}>Peças</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={serviceRoutes.bodywork.path}>Lanternagem</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={serviceRoutes.painting.path}>Pintura</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to={aboutRoutes.aboutUs.path} className="text-man-gray hover:text-primary transition-colors">
              Quem Somos
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                <Link to={publicRoutes.login.path}>
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar
                </Link>
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-white flex items-center gap-1" size="sm" asChild>
                <Link to={publicRoutes.register.path}>
                  <User className="h-4 w-4 mr-1" />
                  Cadastrar
                </Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-man-gray rounded-md"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="man-container py-3 space-y-1">
            <div className="px-3 py-2">
              <p className="font-medium mb-1">Como Funciona</p>
              <Link
                to={howItWorksRoutes.forProviders.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Para Fornecedores
              </Link>
              <Link
                to={howItWorksRoutes.forFleets.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Para Frotistas
              </Link>
            </div>
            
            <div className="px-3 py-2">
              <p className="font-medium mb-1">Serviços</p>
              <Link
                to={serviceRoutes.electrical.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Elétrica
              </Link>
              <Link
                to={serviceRoutes.mechanical.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Mecânica
              </Link>
              <Link
                to={serviceRoutes.towing.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Reboque
              </Link>
              <Link
                to={serviceRoutes.parts.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Peças
              </Link>
              <Link
                to={serviceRoutes.bodywork.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Lanternagem
              </Link>
              <Link
                to={serviceRoutes.painting.path}
                className="block pl-3 py-1 text-sm text-man-gray hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Pintura
              </Link>
            </div>
            
            <Link
              to={aboutRoutes.aboutUs.path}
              className="block px-3 py-2 text-man-gray hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </Link>
            
            <div className="pt-2 space-y-2 px-3">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link to={publicRoutes.login.path} onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="h-4 w-4 mr-1" />
                  Entrar
                </Link>
              </Button>
              <Button className="w-full justify-center bg-accent hover:bg-accent/90 text-white" asChild>
                <Link to={publicRoutes.register.path} onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4 mr-1" />
                  Cadastrar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
