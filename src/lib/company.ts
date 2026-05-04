/** Brand & contact — single source of truth for NULIEN TRANSPORTATION LLC */

export const COMPANY = {
  legalName: "NULIEN TRANSPORTATION LLC",
  displayName: "Nulien Transportation",
  tagline: "Trusted freight from coast to coast.",
  mission:
    "A carrier customers can trust to take, safely, their cargo from point A to point B.",
  coverage:
    "We serve the continental United States—helping goods reach every corner of the country.",
  phoneDisplay: "(808) 319-6236",
  phoneTel: "+18083196236",
  email: "nulientransportationllc@gmail.com",
  addressLine1: "130 Wading Bird Circle SW",
  addressLine2: "Palm Bay, Florida 32908",
  websiteDisplay: "nulientransportation.com",
} as const;

/** Single-line address for map links and sharing */
export function getFullAddress(): string {
  return `${COMPANY.addressLine1}, ${COMPANY.addressLine2}`;
}

/** Opens in Google Maps (web or app) */
export function getGoogleMapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getFullAddress())}`;
}

/** Opens Apple Maps in the browser; on Apple devices it can hand off to the Maps app */
export function getAppleMapsUrl(): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(getFullAddress())}`;
}

export const FLEET_STORY = {
  lead: "NULIEN TRANSPORTATION LLC is a veteran-owned transportation company based in Palm Bay, Florida.",
  body: "As a veteran, Natanael Ulien continues serving the people of the United States by making it easier for goods to reach every corner of the country—with modern semi-trucks, 53-foot dry van trailers, and the discipline you expect from someone who wore the uniform.",
} as const;
