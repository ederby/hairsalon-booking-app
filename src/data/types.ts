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
  isActive: boolean;
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
  categoryIDs: number[];
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
  isActive: boolean;
};

export type GuestInfo = {
  name: string;
  phone: string;
  email: string;
  observations: string | undefined;
} | null;

export type BookingType = {
  id: number;
  created_at: string;
  category: CategoryType;
  service: ServiceType;
  extraServices: ExtraServiceType[] | [];
  staff_id: number;
  selectedDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  guestInfo: GuestInfo;
  canceled: boolean;
  break: boolean;
};

export type WorkdaysType = {
  id: number;
  staffID: number;
  date: string;
  startTime: string;
  endTime: string;
};
