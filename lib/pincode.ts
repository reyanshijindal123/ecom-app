export async function getAddressFromPincode(pincode: string) {
  const res = await fetch(
    `https://api.postalpincode.in/pincode/${pincode}`
  );

  const data = await res.json();

  if (
    data[0].Status === 'Success' &&
    data[0].PostOffice?.length
  ) {
    return {
      city: data[0].PostOffice[0].District,
      state: data[0].PostOffice[0].State,
    };
  }

  return null;
}