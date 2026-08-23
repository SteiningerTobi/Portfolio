export interface BulletListLink {
  href: string
  label?: string
}

export interface BulletListItem {
  title: string
  summary?: string
  description: string
  link?: BulletListLink
}
