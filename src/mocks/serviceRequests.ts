
import { ServiceRequest } from "@/types/serviceRequest";

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: "REQ-001",
    client_id: "client-001",
    provider_id: "provider-001",
    clientName: "Empresa ABC LTDA",
    clientCnpj: "12.345.678/0001-90",
    vehiclePlate: "ABC1234",
    vehicleModel: "Toyota Corolla",
    request_date: "2025-04-15T14:30:00Z",
    requestDate: "2025-04-15T14:30:00Z",
    service_type: "Manutenção preventiva",
    status: "pending",
    approved: false,
    services: [
      { name: "Troca de óleo" },
      { name: "Revisão de freios" },
    ]
  },
  {
    id: "REQ-002",
    client_id: "client-002",
    provider_id: "provider-001",
    clientName: "XYZ Transporte S.A.",
    clientCnpj: "98.765.432/0001-21",
    vehiclePlate: "XYZ5678",
    vehicleModel: "Ford Ranger",
    request_date: "2025-04-14T10:15:00Z",
    requestDate: "2025-04-14T10:15:00Z",
    service_type: "Alinhamento e balanceamento",
    status: "in-progress",
    startDate: "2025-04-14T13:45:00Z",
    approved: true,
    services: [
      { name: "Alinhamento" },
      { name: "Balanceamento" },
      { name: "Troca de pneus" },
    ]
  },
  {
    id: "REQ-003",
    client_id: "client-003",
    provider_id: "provider-001",
    clientName: "Logística Rápida EIRELI",
    clientCnpj: "11.222.333/0001-44",
    vehiclePlate: "LRE9876",
    vehicleModel: "Fiat Strada",
    request_date: "2025-04-13T09:00:00Z",
    requestDate: "2025-04-13T09:00:00Z",
    service_type: "Elétrica",
    status: "completed",
    startDate: "2025-04-13T11:20:00Z",
    endDate: "2025-04-13T16:45:00Z",
    approved: true,
    services: [
      { name: "Troca de bateria", price: 450 },
      { name: "Revisão elétrica", price: 280 },
    ]
  },
  {
    id: "REQ-004",
    client_id: "client-004",
    provider_id: "provider-001",
    clientName: "Construtora Delta Ltda",
    clientCnpj: "44.333.222/0001-55",
    vehiclePlate: "DEL5544",
    vehicleModel: "Chevrolet S10",
    request_date: "2025-04-12T15:30:00Z",
    requestDate: "2025-04-12T15:30:00Z",
    service_type: "Suspensão",
    status: "rejected",
    approved: false,
    services: [
      { name: "Reparo na suspensão" },
      { name: "Troca de amortecedores" },
    ]
  },
  {
    id: "REQ-005",
    client_id: "client-005",
    provider_id: "provider-001",
    clientName: "Tech Solutions S.A.",
    clientCnpj: "33.444.555/0001-66",
    vehiclePlate: "TEC9090",
    vehicleModel: "Volkswagen Golf",
    request_date: "2025-04-11T08:45:00Z",
    requestDate: "2025-04-11T08:45:00Z",
    service_type: "Diagnóstico",
    status: "pending",
    approved: false,
    services: [
      { name: "Diagnóstico eletrônico" },
      { name: "Reparo no sistema de ar condicionado" },
    ]
  },
];
