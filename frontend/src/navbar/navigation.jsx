import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Switch} from "@heroui/react";
import {setTheme} from "../store/features/themeSlice";
import { useDispatch, useSelector } from 'react-redux';
import {
  Moon,
  Sun,
} from "@gravity-ui/icons";


function navigation() {

  const dispatch = useDispatch()
  const redux_theme = useSelector((state) => state.theme)
  const isLight = redux_theme.theme === true;

  const [themestate, setThemeState] = useState(
        localStorage.getItem('theme') === 'true'
    )

  const icons = {
        darkMode: {
            off: Moon,
            on: Sun,
            selectedControlClass: "",
        }
  }


        useEffect(() => {
        localStorage.setItem('theme', themestate)
        console.log(`After : `,redux_theme)
        }, [themestate,redux_theme])

  return (
    <>

        <div className={`navbar_main_cont fixed top-0 z-50 w-full flex flex-row justify-center items-center py-4`}>


            <div className={`navbar_inner_cont flex flex-row justify-between items-center w-11/12 max-w-6xl px-6 py-3 rounded-full border transition-all duration-300 ${isLight ? 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50 text-slate-800' : 'bg-slate-900/60 border-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.1)] text-slate-100'}`}>

                <div className="navbar_logo_cont flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <Link to="/">
                      <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer">ApiFlow</h1>
                    </Link>
                </div>

                <div className="navbar_links_cont hidden md:flex flex-row justify-center items-center flex-1">

                    <ul className='flex flex-row list-none gap-8 text-[15px] font-medium'>
                        <li><Link to="/" className={`transition-colors ${isLight ? 'text-slate-600 hover:text-blue-600' : 'text-slate-300 hover:text-blue-400'}`}>Home</Link></li>
                        <li><Link to="/api" className={`transition-colors ${isLight ? 'text-slate-600 hover:text-blue-600' : 'text-slate-300 hover:text-blue-400'}`}>API</Link></li>
                    </ul>

                </div>


                <div className="navbar_button_cont flex flex-row justify-end items-center gap-5">

                    <div className="switch_cont flex flex-row justify-center items-center scale-90">


                        <div className="flex gap-3">
                            {Object.entries(icons).map(([key, value]) => (
                                <Switch
                                    key={key}
                                    size="lg"
                                    color="primary"
                                    isSelected={themestate}
                                    onChange={(checked) => {
                                        setThemeState(checked)
                                        dispatch(setTheme(checked))
                                    }}
                                    >
                                    {({ isSelected }) => (
                                        <Switch.Control>
                                        <Switch.Thumb>
                                            <Switch.Icon>
                                            {isSelected ? (
                                                <Sun className="size-3 text-amber-500" />
                                            ) : (
                                                <Moon className="size-3 text-indigo-500" />
                                            )}
                                            </Switch.Icon>
                                        </Switch.Thumb>
                                        </Switch.Control>
                                    )}
                                    </Switch>
                            ))}
                        </div>

                    </div>

                    <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5">Start Your Journey</button>

                </div>

            </div>

        </div>

    </>
  )
}

export default navigation