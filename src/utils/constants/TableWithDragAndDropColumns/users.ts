import type { User } from "../../../types/types";

export const USERSWITHCHILDREN: User[] = [
  { 
    id: 1, 
    name: 'Alice Dupont', 
    age: 28, 
    city: 'Paris',
    children: [
      {
        id: 6, 
        name: 'Téléphones', 
        age: 20,
        city: 'Moscow',
        children: [
          { id: 7, name: 'Bob', age: 22, city: 'Brazza' },
          { id: 8, name: 'Martin', age: 23, city: 'Pointe-Noir'},
        ]
      },
    ] 
  },
  { 
    id: 2, 
    name: 'Bob Martin', 
    age: 34, 
    city: 'Lyon',
    children: [
      { id: 9, name: 'Boby', age: 22, city: 'Brazza' },
    ] 
  },
  { 
    id: 3, 
    name: 'Clara Leroy', 
    age: 22, 
    city: 'Marseille',
    children: [
      { id: 10, name: 'Martin', age: 23, city: 'Pointe-Noir'},
    ] 
  },
  { 
    id: 4, 
    name: 'David Bernard', 
    age: 41, 
    city: 'Paris',
    children: [
      {
        id: 12, 
        name: 'Téléphones', 
        age: 20,
        city: 'Moscow',
        children: [
          { id: 13, name: 'Bob', age: 22, city: 'Brazza' },
          { id: 14, name: 'Martin', age: 23, city: 'Pointe-Noir'},
        ]
      },
    ] 
  },
  { 
    id: 5, 
    name: 'Emma Petit', 
    age: 19, 
    city: 'Bordeaux',
    children: [
      { id: 11, name: 'Martin', age: 23, city: 'Pointe-Noir'},
    ] 
  },
]