import { WGProvider } from './WGProvider';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WGProvider>
      <Navbar />
      <main>
        {children}
      </main>
    </WGProvider>
  )
}