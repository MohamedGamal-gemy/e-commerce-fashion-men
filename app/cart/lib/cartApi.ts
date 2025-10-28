// "use server";
// import { cookies } from "next/headers";

// export async function getCart() {
//   try {
//     const res = await fetch(`http://localhost:9000/api/cart`, {
//       method: "GET",
//       headers: {
//         Cookie: (await cookies()).toString(),
//       },
//       // cache: "no-store", // Uncomment if you want to bypass Next.js data cache for this fetch
//     });

//     if (!res.ok) {
//       const errorText = await res.json();
//       // console.log(errorText.message);

//       console.error(`Failed to fetch cart: ${res.status} - ${errorText}`);
//       // throw new Error("Failed to fetch cart data.");
//       throw new Error(errorText.message);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Error in getCart server function:", error);
//     throw error;
//   }
// }
