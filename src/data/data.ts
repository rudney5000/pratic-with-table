import type { User } from "../types/types"

export function generateUsers(count: number): User[] {
  const firstNames = ['Alice', 'Bob', 'Clara', 'David', 'Emma', 'Fares', 'Giulia', 'Hugo', 'Inès', 'Julien']
  const lastNames = ['Dupont', 'Martin', 'Leroy', 'Bernard', 'Petit', 'Moreau', 'Simon', 'Laurent', 'Michel', 'Garcia']
  const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Strasbourg', 'Lille', 'Rennes', 'Nice']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    age: 18 + (i % 50),
    city: cities[i % cities.length],
  }))
}

export const USERS = generateUsers(30_000)