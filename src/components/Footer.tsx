
import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="man-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-white" />
              <span className="font-bold text-xl">I<span className="text-accent">MOVAN</span></span>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              Conectamos empresas e fornecedores de serviços automobilísticos em todo o Brasil. 
              Intermediando serviços com qualidade e eficiência.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/como-funciona/fornecedores" className="text-gray-300 hover:text-white transition-colors">
                  Para Fornecedores
                </Link>
              </li>
              <li>
                <Link to="/como-funciona/frotistas" className="text-gray-300 hover:text-white transition-colors">
                  Para Frotistas
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-gray-300 hover:text-white transition-colors">
                  Quem Somos
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicos/eletrica" className="text-gray-300 hover:text-white transition-colors">
                  Elétrica
                </Link>
              </li>
              <li>
                <Link to="/servicos/mecanica" className="text-gray-300 hover:text-white transition-colors">
                  Mecânica
                </Link>
              </li>
              <li>
                <Link to="/servicos/reboque" className="text-gray-300 hover:text-white transition-colors">
                  Reboque
                </Link>
              </li>
              <li>
                <Link to="/servicos/pecas" className="text-gray-300 hover:text-white transition-colors">
                  Peças
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-accent shrink-0" />
                <span className="text-gray-300">
                  Av. Brasil, 123, São Paulo, SP, Brasil
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-accent shrink-0" />
                <span className="text-gray-300">(11) 9999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-accent shrink-0" />
                <span className="text-gray-300">contato@imovan.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} IMOVAN. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
