// Client relationship, location, and scope supplied by the client team.
// Only confirmed projects with a defined scope belong in this list.
// Public website features are described in the page content; no results claimed.
export const skyTravelProject = {
  name: "Sky Travel J&M",
  city: "Miami",
  neighborhood: "Brickell",
  industry: "Catholic pilgrimage travel agency",
  whatWeDid: "Our team designed and built its website.",
  url: "https://www.skytraveljm.com",
} as const

export const clientProjects = [skyTravelProject] as const
