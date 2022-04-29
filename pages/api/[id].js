// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie'
export default function handler(req, res) {
  const img = [
    '/user1.jpg',
    '/user2.jpg',
    '/user3.jpg',
    '/user4.jpg',
    '/user5.jpg',
    '/user6.jpg',
    '/user7.jpg',
    '/user8.jpg',
    '/user9.jpg',
    '/user10.jpg'
]

const users = [
  {
    name:'Dad',
    img:img[2],
    id:1
  }, {
    name:'Mother',
    img:img[1],
    id:2
  },
  {
    name:'MyEx',
    img:img[6],
    id:3
  },{
    name:'Kids',
    img:img[5],
    id:4
  },{
    name:'You',
    img:img[9],
    id:5
  }
]

const maxAge = 3 * 24 * 60 * 60;

const id = req.query.id;

    if(id && req.method === "GET") {
      
      const user = users.filter((user, i) => {
        return user.name === id
      })
      res.status(200).json({user, img})

    } 

    if(id && req.method === "POST") {
      const {id, name, img} = req.body;
      
      users[id] = {
        name:name,
        img:img
      }
    
   
      // res.setHeader('Set-Cookie', cookie.serialize('cookieUsers', JSON.stringify(users), {
      //   httpOnly:true,
      //   maxAge:maxAge * 1000,
      //   sameSite: "strict",
      //   path:"/"
      // }))

    
      res.status(200).json({user:"update"})
    } 
    
  }
  