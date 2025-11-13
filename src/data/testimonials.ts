import comentario1 from "@/assets/comentarios/comentario1.webp";
import comentario2 from "@/assets/comentarios/comentario2.webp";
import comentario3 from "@/assets/comentarios/comentario3.webp";
import comentario4 from "@/assets/comentarios/comentario4.webp";
import comentario5 from "@/assets/comentarios/comentario5.webp";

export interface Testimonial {
  id: number;
  name: string;
  department: string;
  rating: number;
  comment: string;
  image?: string;
  productImage?: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    department: "Lima",
    rating: 5,
    comment:
      "Muy práctico. Ya no tengo que cargar varios cables y puedo conectar mis tres equipos al mismo tiempo. Compacto y útil para el día a día.",
    productImage: comentario1,
    date: "Hace 2 días",
  },
  {
    id: 2,
    name: "Carlos Ramírez",
    department: "Arequipa",
    rating: 5,
    productImage: comentario2,
    comment:
      "Buena calidad y carga rápida. Lo uso diario con mi iPhone y AirPods, el diseño se ve moderno. Recomendado.",
    date: "Hace 5 días",
  },
  {
    id: 3,
    name: "Ana Sofía Torres",
    department: "Lima",
    rating: 4.5,
    productImage: comentario5,
    comment:
      "Es muy cómodo para viajes y la batería dura bastante. Un poco caro, pero al final vale lo que cuesta.",
    date: "Hace 1 semana",
  },
  {
    id: 4,
    name: "Diego Martínez",
    department: "Piura",
    rating: 5,
    productImage: comentario3,
    comment:
      "Funciona bien con mi iPhone y ya no necesito cables en el trabajo. Estoy satisfecho con la compra.",
    date: "Hace 1 semana",
  },
  {
    id: 5,
    name: "Laura Pérez",
    department: "Lima",
    rating: 4,
    comment:
      "Cumple con lo que promete. Me gusta que puedo cargar el reloj y el celular al mismo tiempo.",
    date: "Hace 2 semanas",
  },
  {
    id: 6,
    name: "Andrés López",
    department: "Lambayeque",
    rating: 5,
    productImage: comentario4,
    comment: "Muy buen producto, cumple con mis expectativas.",
    date: "Hace 2 semanas",
  },
  {
    id: 7,
    name: "Valentina Ruiz",
    department: "Junín",
    rating: 4.5,
    comment: "El color gris se ve elegante.",
    date: "Hace 3 semanas",
  },
  {
    id: 8,
    name: "Juan Pablo Castro",
    department: "Ancash",
    rating: 5,
    comment:
      "Carga rápido y es liviano. Ideal para llevar en el bolsillo. El imán sujeta bien el celular.",
    date: "Hace 3 semanas",
  },
];

// Calcular calificación promedio
export const averageRating = (
  testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length
).toFixed(1);

// Total de reseñas
export const totalReviews = testimonials.length;
