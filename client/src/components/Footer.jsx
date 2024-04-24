import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="">
                <Link 
                    to="/" 
                    className='self-center whitespace-nowrap 
                    text-lg sm:text-xl 
                    font-semibold dark:text-white'
                >
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
                     text-white">MERN</span>
                    <span>Blog</span>
                </Link> 
                </div>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-3
                sm:gap-6'>
                    <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='#'
                                rel='noopener noreferrer'
                            >
                                About Us
                            </Footer.Link>
                            <Footer.Link 
                                href='#'
                                rel='noopener noreferrer'
                            >
                                Some Cool website
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow Me!' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='https://www.instagram.com/just_alm_tmr/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Instagram
                            </Footer.Link>
                            <Footer.Link 
                                href='https://www.facebook.com/temir.alimov.12/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Facebook
                            </Footer.Link>
                            <Footer.Link 
                                href='https://www.threads.net/@just_alm_tmr'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Threads
                            </Footer.Link>
                            <Footer.Link 
                                href='https://github.com/temal07'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My GitHub
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Terms &amp; Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright 
                    href="#" 
                    by='MERN Blog' 
                    year={new Date().getFullYear()} 
                />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='https://www.facebook.com/temir.alimov.12/' icon={BsFacebook} />
                    <Footer.Icon href='https://www.instagram.com/just_alm_tmr/' icon={BsInstagram} />
                    <Footer.Icon href='#' icon={BsTwitter} />
                    <Footer.Icon href='https://github.com/temal07' icon={BsGithub} />
                </div>
            </div>
        </div>
    </Footer>
  )
}
