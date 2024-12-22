export type CategoryType = {
  title: string;
  image: string;
  description: string;
  id: number;
};

export type ServicesType = {
  id: number;
  services: ServiceType[];
};

export type ServiceType = {
  description: string;
  duration: number;
  price: number;
  categoryID: number;
} & TitleIDType;

export type ExtraServicesType = {
  id: number;
  services: ExtraServiceType[];
};

export type ExtraServiceType = {
  duration: number;
  price: number;
  title: string;
  id: number;
};

export type TitleIDType = {
  title: string;
  id: number;
};

export type StaffType = {
  name: string;
  role: string;
  id: number;
  image: string;
  schedule: Schedule;
};

export type Schedule = {
  [date: string]: string[];
};

export type GuestInfo = {
  name: string;
  phone: string;
  email: string;
  observations: string | undefined;
} | null;
