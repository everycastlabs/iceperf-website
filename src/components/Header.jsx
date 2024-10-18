import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '../components/Button';
import { HamburgerButton } from '../components/HamburgerButton';
import { NavMenuItem } from './NavMenuItem';
import { NavMenu } from './NavMenu';
import { NavItem } from './NavItem';

import UserIcon from '../icons/User';

import { providers, projects } from '../constants';
import { IcePerfLogo } from './IcePerfLogo';

import { UserContext } from '../contexts/userContext';

export function Header() {
  const { user, isLoading, signIn, signUp } = useContext(UserContext);
  const location = useLocation();

  return (
    <header className='flex flex-wrap sm:justify-start sm:flex-col z-50 w-full bg-white border-b border-gray-200 text-sm pb-2 sm:pb-0 dark:bg-neutral-800 dark:border-neutral-700'>


      <nav className='relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8' aria-label='Global'>
        <div className='flex items-center justify-between'>
          <Link className='flex-none pt-3 max-w-40 md:max-w-56 lg:max-w-md text-xl font-semibold dark:text-white' to='/' aria-label='IcePerf'>
            <IcePerfLogo kind='side' />
          </Link>
          <div className='flex items-center justify-between'>
            <div className='sm:hidden'>
              <HamburgerButton />
            </div>
            {!!user && (
              <div className='ml-4 sm:hidden'>
                <Link
                  className='size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700'
                  to='/settings'
                >
                  <UserIcon />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div id='navbar-collapse-with-animation' className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block'>
          <div className='flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7'>
            <NavItem label='About' to='/about' />
            <NavItem label='Results' to='/results' />

            <NavMenu label='Providers'>
              {providers.map((provider, i) => (
                <NavMenuItem key={i} label={provider} to={`/providers/${provider.toLowerCase()}`}/>
              ))}
            </NavMenu>
            <NavMenu label='Projects'>
              {projects.map((project, i) => (
                <NavMenuItem key={i} label={project} to={`/projects/${project.toLowerCase()}`}/>
              ))}
            </NavMenu>

            {!user && (
              <>
                <Button
                  onClick={() => signIn({ context: location.search, state: { returnTo: location.pathname } })}
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Button
                  onClick={() => signUp()}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
        {!!user && (
          <div className='ml-4 hidden sm:block'>
            <Link
              className='size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700'
              to='/settings'
            >
              <UserIcon />
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
