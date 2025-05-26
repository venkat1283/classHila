export const popularCourses = [
  {
    id: '1',
    title: 'UI/UX Design for Beginners',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    instructor: 'Robert Fox',
    category: 'Design',
    price: 75.99,
    rating: 4.8,
    lessons: 24,
    isBestseller: true,
    duration: '6 weeks',
    level: 'Beginner',
    description: 'Master UI/UX fundamentals and create stunning interfaces that users will love. This course covers everything from wireframing to prototyping.',
  },
  {
    id: '2',
    title: 'Complete Flutter Development Bootcamp',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    instructor: 'Leslie Alexander',
    category: 'Development',
    price: 89.99,
    rating: 4.9,
    lessons: 42,
    isBestseller: false,
    duration: '10 weeks',
    level: 'Intermediate',
    description: 'Learn Flutter from scratch and build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    image: 'https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg',
    instructor: 'Jenny Wilson',
    category: 'Marketing',
    price: 59.99,
    rating: 4.7,
    lessons: 18,
    isBestseller: true,
    duration: '4 weeks',
    level: 'All Levels',
    description: 'Learn the most effective digital marketing strategies to grow your business online, including SEO, social media, and email marketing.',
  },
];

export const categories = [
  'All',
  'Design',
  'Development',
  'Marketing',
  'Business',
  'Photography',
  'Music'
];

export const courseContent = [
  {
    title: 'Introduction to UI/UX',
    lessons: [
      { title: 'What is UI/UX Design?', duration: '10:30', isLocked: false },
      { title: 'The Design Process', duration: '14:20', isLocked: false },
      { title: 'User Research Fundamentals', duration: '18:45', isLocked: true },
    ]
  },
  {
    title: 'Wireframing Basics',
    lessons: [
      { title: 'Tools and Software', duration: '12:10', isLocked: true },
      { title: 'Creating Your First Wireframe', duration: '20:30', isLocked: true },
      { title: 'Mobile vs Desktop Wireframing', duration: '15:40', isLocked: true },
    ]
  },
  {
    title: 'Visual Design Principles',
    lessons: [
      { title: 'Color Theory for Designers', duration: '16:50', isLocked: true },
      { title: 'Typography Fundamentals', duration: '13:25', isLocked: true },
      { title: 'Layout and Composition', duration: '22:15', isLocked: true },
    ]
  },
];

export const reviews = [
  {
    id: '1',
    name: 'Jane Cooper',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 5,
    date: '2 weeks ago',
    comment: 'This course exceeded my expectations! The instructor explains complex concepts in a simple way. Highly recommended for beginners.'
  },
  {
    id: '2',
    name: 'Wade Warren',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4,
    date: '1 month ago',
    comment: 'Great content and well-structured. I would have liked more practical exercises, but overall it was worth it.'
  },
  {
    id: '3',
    name: 'Esther Howard',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The instructor is very knowledgeable and the course is very comprehensive. I learned a lot!'
  }
];