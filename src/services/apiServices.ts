import {
  CategoryType,
  ExtraServiceType,
  GuestInfo,
  StaffType,
} from "@/data/types";
import { supabase } from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Categories could not be loaded.");
    throw new Error("Categories could not be loaded.");
  }

  return data;
}

type GetService = {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  categoryID: number;
  isActive: boolean;
};
export async function getServices(categoryID: number): Promise<GetService[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("categoryID", categoryID)
    .order("order", { ascending: true });

  if (error) {
    console.error("Services could not be loaded.");
    throw new Error("Services could not be loaded.");
  }

  return data;
}

export async function getExtraServices(categoryID: number) {
  const { data, error } = await supabase
    .from("extraservices")
    .select("*")
    .eq("categoryID", categoryID);

  if (error) {
    console.error("Extra services could not be loaded.");
    throw new Error("Extra services could not be loaded.");
  }

  return data;
}

type Schedule = {
  [date: string]: string[];
};
type ApiStaffType = {
  id: number;
  name: string;
  role: string;
  image: string;
  schedule: Schedule;
};

export async function getStaffForCategory(
  categoryID: number
): Promise<StaffType[]> {
  const { data, error } = await supabase
    .from("staff_categories")
    .select(` staff ( id, name, role, image, schedule ) `)
    .eq("category_id", categoryID);
  if (error) {
    console.error("Error fetching staff for category:", error);
    throw new Error(error.message); // Handle and throw Supabase error
  } // Check if data is valid
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data structure returned from Supabase:", data);
    throw new Error("Invalid data structure received from Supabase");
  }
  const staffData = data.flatMap(
    (item: { staff: ApiStaffType[] }) => item.staff
  );
  return staffData.map((item: ApiStaffType) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    image: item.image,
    schedule: item.schedule,
  }));
}

type ApiBookingType = {
  category: CategoryType | null;
  service: {
    id: number;
    title: string;
    description: string | undefined;
    duration: number;
    price: number;
    categoryID: number | undefined;
  } | null;
  extraServices: ExtraServiceType[];
  staff_id: number | undefined;
  selectedDate: string | Date;
  selectedTime: string;
  guestInfo: GuestInfo;
};

export async function makeGuestReservation(booking: ApiBookingType) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...booking }])
    .select();

  if (error) {
    console.error("Bokningen kunde inte genomföras");
    throw new Error("Bokningen kunde inte genomföras");
  }

  return data;
}
