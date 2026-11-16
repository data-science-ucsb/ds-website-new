// Workshop materials. To add or update a link, edit this list —
// the /workshops page and the Resources menu pick it up automatically.
export interface WorkshopLink {
  title: string;
  description: string;
  href: string;
}

const workshops: WorkshopLink[] = [
  {
    title: "Workshop Materials",
    description:
      "Slides, notebooks, and datasets from our workshops, all in one Google Drive folder.",
    href: "https://drive.google.com/drive/folders/1m9q6s6vGGkDr5FU82-b0A8fwL2UIJYyd",
  },
];

export default workshops;
