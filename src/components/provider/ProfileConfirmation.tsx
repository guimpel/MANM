
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Phone, Mail, MapPin, Check, Clock } from "lucide-react";
import { toast } from "sonner";

interface ProfileConfirmationProps {
  onSubmit: () => void;
}

const ProfileConfirmation = ({ onSubmit }: ProfileConfirmationProps) => {
  const [companyName, setCompanyName] = useState("Auto Serviços LTDA");
  const [cnpj, setCnpj] = useState("11.222.333/0001-44");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [whatsappVerified, setWhatsappVerified] = useState(false);
  
  const [verificationCode, setVerificationCode] = useState("");
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showWhatsappVerification, setShowWhatsappVerification] = useState(false);
  
  // Mock verification functions
  const sendPhoneVerification = () => {
    toast.success("Código enviado para o telefone", {
      description: "Um código de verificação foi enviado para o número informado."
    });
    setShowPhoneVerification(true);
  };
  
  const sendEmailVerification = () => {
    toast.success("Código enviado para o email", {
      description: "Um código de verificação foi enviado para o email informado."
    });
    setShowEmailVerification(true);
  };
  
  const sendWhatsappVerification = () => {
    toast.success("Código enviado via WhatsApp", {
      description: "Um código de verificação foi enviado para o WhatsApp informado."
    });
    setShowWhatsappVerification(true);
  };
  
  const verifyCode = (type: 'phone' | 'email' | 'whatsapp') => {
    // TESTE: Usando código fixo 1234 para todas as verificações
    if (verificationCode === "1234") {
      if (type === 'phone') {
        setPhoneVerified(true);
        setShowPhoneVerification(false);
        localStorage.setItem("providerPhoneVerified", "true");
        toast.success("Telefone verificado com sucesso!");
      } else if (type === 'email') {
        setEmailVerified(true);
        setShowEmailVerification(false);
        localStorage.setItem("providerEmailVerified", "true");
        toast.success("Email verificado com sucesso!");
      } else {
        setWhatsappVerified(true);
        setShowWhatsappVerification(false);
        toast.success("WhatsApp verificado com sucesso!");
      }
      
      setVerificationCode("");
    } else {
      toast.error("Código inválido", {
        description: "Por favor, use o código de teste 1234."
      });
    }
  };
  
  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);
  };
  
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setZipCode(formatted);
  };
  
  const formatPhone = (value: string) => {
    return value.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15);
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };
  
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setWhatsapp(formatted);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneVerified || !emailVerified) {
      toast.error("Verificação necessária", {
        description: "Telefone e email precisam ser verificados para continuar."
      });
      return;
    }
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company-name">Razão Social</Label>
        <div className="flex">
          <Input
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-gray-50"
            readOnly
          />
          <div className="ml-2 flex items-center text-gray-500">
            <Building2 className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <div className="flex">
          <Input
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="bg-gray-50"
            readOnly
          />
          <div className="ml-2 flex items-center text-gray-500">
            <Building2 className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            placeholder="Rua, número e complemento"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zip-code">CEP</Label>
          <Input
            id="zip-code"
            placeholder="00000-000"
            value={zipCode}
            onChange={handleZipCodeChange}
            maxLength={9}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            placeholder="Sua cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            placeholder="UF"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            maxLength={2}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <div className="flex">
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={15}
            required
          />
          {!phoneVerified ? (
            <Button
              type="button"
              variant="outline"
              onClick={sendPhoneVerification}
              className="ml-2"
              disabled={!phone || phone.length < 14}
            >
              Verificar
            </Button>
          ) : (
            <div className="ml-2 flex items-center text-green-500">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
        
        {showPhoneVerification && (
          <div className="mt-2 flex items-center gap-2">
            <Input
              placeholder="Código de verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
            <Button
              type="button"
              onClick={() => verifyCode('phone')}
              size="sm"
            >
              Confirmar
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <div className="flex">
          <Input
            id="whatsapp"
            placeholder="(00) 00000-0000"
            value={whatsapp}
            onChange={handleWhatsappChange}
            maxLength={15}
          />
          {whatsapp && whatsapp !== phone && !whatsappVerified ? (
            <Button
              type="button"
              variant="outline"
              onClick={sendWhatsappVerification}
              className="ml-2"
              disabled={!whatsapp || whatsapp.length < 14}
            >
              Verificar
            </Button>
          ) : whatsappVerified ? (
            <div className="ml-2 flex items-center text-green-500">
              <Check className="h-5 w-5" />
            </div>
          ) : null}
        </div>
        
        {showWhatsappVerification && (
          <div className="mt-2 flex items-center gap-2">
            <Input
              placeholder="Código de verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
            <Button
              type="button"
              onClick={() => verifyCode('whatsapp')}
              size="sm"
            >
              Confirmar
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex">
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!emailVerified ? (
            <Button
              type="button"
              variant="outline"
              onClick={sendEmailVerification}
              className="ml-2"
              disabled={!email}
            >
              Verificar
            </Button>
          ) : (
            <div className="ml-2 flex items-center text-green-500">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
        
        {showEmailVerification && (
          <div className="mt-2 flex items-center gap-2">
            <Input
              placeholder="Código de verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
            <Button
              type="button"
              onClick={() => verifyCode('email')}
              size="sm"
            >
              Confirmar
            </Button>
          </div>
        )}
      </div>
      
      <Button type="submit" className="w-full">
        Continuar
      </Button>
    </form>
  );
};

export default ProfileConfirmation;

