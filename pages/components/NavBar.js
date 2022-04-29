import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
const NavBar = ({main, show, handleShow, handleMenuPoints, showMenuPoints, handleMenuHambu, menuHambu, user, handleButtonActive, buttonActive, active, changeValue}) => {
 const [search, setSearch] = useState(active)
 const router = useRouter()

    return (
     
       <nav className="nav" >
          

        <div className="logoNav" id={search ? 'hiddenNav':""}>
        {main && <div className="menu" >
                <div className="menuMobile" onClick={(e) => {
                    if(e.target.classList.contains('hambu') || e.target.classList.contains('menuMobile') || e.target.classList.contains('menuMobileContainer')) {
                        handleMenuHambu()
                    } 
                }}>
                    <div className="hambu"></div>
                    {menuHambu && 
                          <div className="menuMobileContainer">
                            <div id="menuMobileContainer">
                                    <div className="menuMobileUser">
                                        <div className="menuMobileUserImg"><img src={user[0].img} alt="" /></div>
                                        <div><p>{user[0].name}</p></div>
                                        <div className="menuMobileUserChange">
                                            <Link href={'/'}>
                                            <img src="/arrow_change.svg" alt="" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="menuScroll">
                                            <div className="notications">
                                                <p>Notifications</p>
                                                <img src="/arrow_right.svg" alt="" />
                                            </div>
                                            <div className="download">
                                                <img src="/download.svg" alt="" />
                                                <p>Download</p>
                                            </div>

                                            <div className="category">
                                                <button onClick={handleButtonActive} className={buttonActive === "" ? 'buttonActive' : ""} data-key="">Home</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "16" ? 'buttonActive' : ""} data-key="16">Animation</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "28" ? 'buttonActive' : ""} data-key="28">Action</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "35" ? 'buttonActive' : ""} data-key="35">Comedy</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "18" ? 'buttonActive' : ""} data-key="18">Drama</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "80" ? 'buttonActive' : ""} data-key="80">Crime</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "10751" ? 'buttonActive' : ""} data-key="10751">Family</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "14" ? 'buttonActive' : ""} data-key="14">Fantasy</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "27" ? 'buttonActive' : ""} data-key="27">Horror</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "10749" ? 'buttonActive' : ""} data-key="10749">Romance</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "10402" ? 'buttonActive' : ""} data-key="10402">Music</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "878" ? 'buttonActive' : ""} data-key="878">Science Fiction</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "99" ? 'buttonActive' : ""} data-key="99">Documentary</button>
                                                <button onClick={handleButtonActive} className={buttonActive === "10752" ? 'buttonActive' : ""} data-key="10752">War</button>
                                            </div>
                                    </div>
                            </div>
                          </div>
                    }
                </div>
            </div>}
            <div id="logoNav">
                <img src="/n.svg" alt="" />
            </div>
        </div>
        
        {!main && <div className="admin" >
            <div id="admin" onClick={handleShow}>
                <span className="adminImg">
                      <img src={show ? "/edit.svg" : "/close.svg"} alt="" /> 
                </span>
                <span>
                    <p>{show ? "Admin":"Ready"}</p>
                </span>
            </div>
        </div>}

        {main && <div className="search">
                <div id="search">
                    <div className="imgSearchNav">
                    <img src="/search.svg" alt="search-icons" id={search ? 'hiddenNav':""} onClick={()=> setSearch(true)} />
                    {search && 
                    <div className='activeSearch'>

                      <div id="activeSearch">
                          <div className="backHiddenSearch">
                             <img src="/back.svg" alt="arrow_back_icon" onClick={()=> {
                                if(router.pathname.includes('/search/')) {
                                    router.back()
                                } else {
                                    setSearch(false)
                                }
                             }}/>
                          </div>
                          <div className="hiddenSearchIcon">
                             <img src="/search.svg" alt="" />
                             <input type="text"placeholder='Search' autoFocus onChange={(e) => {
                                if(e.target.value !== '' && router.pathname.includes('/users/')) {
                                    router.push('/search/'+e.target.value)
                                } else if(router.pathname.includes('/search/') && e.target.value !== '') {
                                    changeValue(e)
                                }
                             }}/>
                          </div>
                      </div>

                        </div>}
                    </div>
                    <div className="menu_points" id={showMenuPoints ? "menu_pointsActive" : ""|| search ? 'hiddenNav':""}>
                    <img src="/menu_points.svg" alt="menu-icons" onClick={handleMenuPoints} />
                        {showMenuPoints &&  <div id="menu_points">
                          <div>
                              <p>Configure</p>
                              <p>Close Seccion</p>
                          </div>
                    </div>}
                    </div>
                </div>
        </div>}
    </nav>
    )
}

export default NavBar;