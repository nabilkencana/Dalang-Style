"use client";

import type { Work } from "@/components/ui/formation-utils/formation-poses";
import Formation from "@/components/ui/formation";

const rootUrl =
  "https://d24l2zb4cwkekfpl.public.blob.vercel-storage.com/formation";

const works: Work[] = [
  {
    image: `${rootUrl}/vista.jpg`,
    title: "Vantage",
  },
  {
    image: `${rootUrl}/mirror.jpg`,
    title: "Mirror",
  },
  {
    image: `${rootUrl}/cosmos.jpg`,
    title: "Cosmos",
  },
  {
    image: `${rootUrl}/current.jpg`,
    title: "Current",
  },
  {
    image: `${rootUrl}/portal.jpg`,
    title: "Threshold",
  },
  {
    image: `${rootUrl}/valley.jpg`,
    title: "Hollow",
  },
  {
    image: `${rootUrl}/ascent.jpg`,
    title: "Ascent",
  },
  {
    image: `${rootUrl}/array.jpg`,
    title: "Array",
  },
  {
    image: `${rootUrl}/giza.jpg`,
    title: "Meridian",
  },
  {
    image: `${rootUrl}/rift.jpg`,
    title: "Rift",
  },
  {
    image: `${rootUrl}/overlook.jpg`,
    title: "Overlook",
  },
  {
    image: `${rootUrl}/horizon.jpg`,
    title: "Event Horizon",
  },
  {
    image: `${rootUrl}/archipelago.jpg`,
    title: "Archipelago",
  },
  {
    image: `${rootUrl}/crest.jpg`,
    title: "Crest",
  },
  {
    image: `${rootUrl}/ridge.jpg`,
    title: "Ridge",
  },
  {
    image: `${rootUrl}/fathom.jpg`,
    title: "Fathom",
  },
];

export default function FormationDemo() {
  return (
    <div className="h-screen w-full">
      <Formation works={works} />
    </div>
  );
}
