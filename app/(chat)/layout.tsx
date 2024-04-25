import React, { Suspense } from 'react';
import { SidebarDesktop } from '@/components/sidebar-desktop';
import styles from './chat-layout.module.css';

// Define an interface for the ChatLayoutProps
interface ChatLayoutProps {
  children: React.ReactNode;
}

// Define the Layout component
const Layout = ({ children }: ChatLayoutProps) => (
  <div className={styles.container}>
    <SidebarDesktop />
    <div className={styles.content}>{children}</div>
  </div>
);

// Export the ChatLayout component
export default function ChatLayout({ children }: ChatLayoutProps) {
  // Use Suspense to handle any asynchronously rendered children
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>{children}</Layout>
    </Suspense>
  );
}

/* CSS module styles for the .container class
.container {
  @apply relative flex h-[calc(100vh-theme(spacing.16))] overflow-hidden;
}
*/

/* CSS module styles for the .content class
.content {
  @apply group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px];
}
*/
