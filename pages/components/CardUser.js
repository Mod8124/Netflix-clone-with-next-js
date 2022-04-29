import Link from 'next/link'

const CardUser = ({user, show}) => {
        return (
            <div className="cardUser">
          {user && <Link href={'/users/'+user.name}>
            <img src={user.img} alt="" />
            </Link>}
            {user &&  <p>{user.name}</p>}
             {!show && user &&
             <div className="editCardUser">
             <Link href={'/edit/'+user.name}>
                     <div></div>
             </Link>
             </div>}
         </div>
        )
   
}

export default CardUser;