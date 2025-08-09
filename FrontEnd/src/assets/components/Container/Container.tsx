import { type PropsWithChildren } from 'react';
import './Container.css';

export default function Container({ children }: PropsWithChildren<{}>) {
  return <main className='container'>{children}</main>;
}
