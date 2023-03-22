export const eventCategory = (category: string) => {
  switch (category) {
    case "fullstack":
      return "Full Stack";
    case "frontend":
      return "Front-end";
    case "backend":
      return "Back-end";
    case "miscellaneous":
      return "Miscellaneous";
    default:
      return "";
  }
};
