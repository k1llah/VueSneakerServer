import Router, { query } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
const sneakData = [
  {
    id: 1,
    title: "Мужские Кроссовки Nike Blazer Mid Suede 1",
    price: 12999,
    imageUrl: "/sneakers/sneakers-1.jpg",
  },

  {
    id: 2,
    title: "Мужские Кроссовки Nike Air Max 270 1",
    price: 15600,
    imageUrl: "/sneakers/sneakers-2.jpg",
  },
  {
    id: 3,
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    imageUrl: "/sneakers/sneakers-3.jpg",
  },
  {
    id: 4,
    title: "Кроссовки Puma X Aka Boku Future Rider2",
    price: 7800,
    imageUrl: "/sneakers/sneakers-4.jpg",
  },
  {
    id: 5,
    title: "Кроссовки Future Rider3",
    price: 9550,
    imageUrl: "/sneakers/sneakers-5.jpg",
  },
  {
    id: 6,
    title: "Кроссовки Black Edition4",
    price: 16999,
    imageUrl: "/sneakers/sneakers-6.jpg",
  },
  {
    id: 7,
    title: "Кроссовки Orange Boomb Edition5",
    price: 7499,
    imageUrl: "/sneakers/sneakers-7.jpg",
  },
  {
    id: 8,
    title: "Кроссовки Nike Air Max 2706",
    price: 15600,
    imageUrl: "/sneakers/sneakers-8.jpg",
  },
  {
    id: 9,
    title: "Кроссовки Nike Air Force 17",
    price: 5900,
    imageUrl: "/sneakers/sneakers-9.jpg",
  },
  {
    id: 10,
    title: "Кроссовки Adidas Ultraboost 8",
    price: 11500,
    imageUrl: "/sneakers/sneakers-10.jpg",
  },
  {
    id: 11,
    title: "Кроссовки Puma Clyde All-Pro9",
    price: 7600,
    imageUrl: "/sneakers/sneakers-11.jpg",
  },
  {
    id: 12,
    title: "Кроссовки Converse Chuck Taylor All-Star4",
    price: 13000,
    imageUrl: "/sneakers/sneakers-12.jpg",
  },
   ];
// router.get("/import", async function (req, res) {
// async function importData() {
//   try {
//     const sneakersData = sneakData

//       await prisma.sneakerData.createMany({
//         data: sneakersData.map(sneaker => ({
//           title: sneaker.title as string,
//           imageUrl: sneaker.imageUrl as string,
//           price: sneaker.price as number,
//         })),
//       });
//       console.log('Data imported successfully');
//     } catch (error) {
//       console.error('Error importing data:', error);
//     }
//   }

//  importData()
// res.send({})
// })
router.get("/", async function (req, res) {
  let sneakData = [] as any;
  const sortBy = req.query.sortBy;
  const title = req.query.title;
  const sortObj = {} as any;
  if (sortBy == "name") {
    sortObj.orderBy = { title: "asc" };
  } else if (sortBy == "sortByPrice") {
    sortObj.orderBy = { price: "asc" };
  } else {
    sortObj.orderBy = { price: "desc" };
  }
  const search = {} as any;
  if (title) {
    search.where = { title: { contains: title, mode: 'insensitive' }};
  }
  sneakData = await prisma.sneakerData.findMany({ ...sortObj, ...search });
  res.send(sneakData);
});



router.post('/createUser', async function (req,res) {
  const userData = req.body
  let isError = {status:false, message:''}
  try {
     const user = await prisma.user.create({
      
      data: {
        first_name: userData.name,
        email: userData.email,
        hash: userData.password,
        created_at: new Date(),
      },
     })
     res.json(user)
  } catch(error){
    isError.status = true
    isError.message = error as string
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
})
export default router;
