import React, { Suspense } from 'react';
import { SidebarDesktop } from '@/components/sidebar-desktop';
import styles from './chat-layout.module.css';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ChatLayoutProps) => (
  <div className={styles.container}>
    <SidebarDesktop />
    <div className={styles.content}>{children}</div>
  </div>
);

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>{children}</Layout>
    </Suspense>
  );
}


.container {
  @apply relative flex h-[calc(100vh-theme(spacing.16))] overflow-hidden;
}

.content {
  @apply group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px];
}
