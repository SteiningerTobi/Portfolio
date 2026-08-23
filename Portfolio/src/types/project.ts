export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectLink {
  href: string
  text: string
  icon?: string
}

export interface Project {
  id: string | number
  category?: string
  title: string
  description: string
  links: ProjectLink[]
  tags: string[]
  images: ProjectImage[]
}
