import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export async function GET() {
  const count = 500;

  const users = Array.from({ length: count }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = `${firstName} ${lastName}`;

    const randomNum = faker.number.int({ min: 100, max: 999 });
    const domains = ["gmail.com", "yahoo.com", "hotmail.com"];
    const domain = faker.helpers.arrayElement(domains);

    const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNum}@${domain}`;

    // phone number prefixes (always 11 digits)
    const phonePrefixes = ["07", "08", "09"];
    const prefix = faker.helpers.arrayElement(phonePrefixes);
    const phone = `${prefix}${faker.number.int({ min: 100000000, max: 999999999 })}`.slice(0, 11);

    const dateJoined = faker.date
      .between({
        from: new Date("2020-01-01"),
        to: new Date("2025-09-09T15:48:00"),
      })
      .toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    const status = faker.helpers.arrayElement(["active", "inactive", "pending"]);

    return {
      organization: "Lendsqr",
      username,
      email,
      phone,
      date_joined: dateJoined,
      status,
    };
  });

  return NextResponse.json(users);
}
