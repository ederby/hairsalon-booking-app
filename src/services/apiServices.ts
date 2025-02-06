import {
  CategoryType,
  ExtraServiceType,
  GuestInfo,
  StaffType,
} from "@/data/types";
import { format } from "date-fns";
import { supabase } from "./supabase";

type GetService = {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  categoryID: number;
  isActive: boolean;
};

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
  startTime: string;
  endTime: string;
  duration: number;
  guestInfo: GuestInfo;
};

export async function getCategories() {
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .order("order", { ascending: true });

  if (categoriesError) {
    console.error("Categories could not be loaded.");
    throw new Error("Categories could not be loaded.");
  }

  const { data: servicesData, error: servicesError } = await supabase
    .from("services")
    .select("*");

  if (servicesError) {
    console.error("Categories could not be loaded.");
    throw new Error("Categories could not be loaded.");
  }

  const serviceCategoryID = servicesData.map((service) => service.categoryID);
  const filteredCategories = categoriesData.filter((category) =>
    serviceCategoryID.includes(category.id)
  );

  return filteredCategories;
}

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
    .neq("isActive", false);

  if (error) {
    console.error("Extra services could not be loaded.");
    throw new Error("Extra services could not be loaded.");
  }

  const filteredData = data?.filter((row) =>
    row.categoryIDs.includes(categoryID)
  );

  return filteredData;
}

export async function getStaffForCategory(
  categoryID: number
): Promise<StaffType[]> {
  const { data, error } = await supabase
    .from("staff_categories")
    .select(` staff ( id, name, role, image, isActive ) `)
    .eq("category_id", categoryID);

  if (error) {
    console.error("Error fetching staff for category:", error);
    throw new Error(error.message); // Handle and throw Supabase error
  }

  // Check if data is valid
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data structure returned from Supabase:", data);
    throw new Error("Invalid data structure received from Supabase");
  }

  const staffData = data.flatMap((item: { staff: StaffType[] }) => item.staff);

  return staffData.map((item: StaffType) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    image: item.image,
    isActive: item.isActive,
  }));
}

export async function makeGuestReservation(booking: ApiBookingType) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        ...booking,
        selectedDate: format(booking.selectedDate, "yyyy-MM-dd"),
        canceled: false,
        break: false,
      },
    ])
    .select();

  if (error) {
    console.error("Bokningen kunde inte genomföras");
    throw new Error("Bokningen kunde inte genomföras");
  }

  return data;
}

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error("Bokningar kunde inte hämtas");
    throw new Error("Bokningar kunde inte hämtas");
  }

  return data;
}

export async function getWorkdays() {
  const { data, error } = await supabase.from("workdays").select("*");

  if (error) {
    console.error("Arbetsdagar kunde inte hämtas.");
    throw new Error("Arbetsdagar kunde inte hämtas.");
  }

  return data;
}
