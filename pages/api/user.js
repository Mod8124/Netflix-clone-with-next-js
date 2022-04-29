// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import cookie from 'cookie'

export default async function handler(req, res) {
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
    
    res.status(200).json(users)

  }
  